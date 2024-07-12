import { reactive, watch } from 'vue'

import { storedState } from '@/utils/StoredState';

import LavItemClass from '@/api/LavItemClass';
import LavItem from '@/api/LavItem';
import LavType from '@/api/LavType';
import LavCategory from '@/api/LavCategory';



const ApiUrl = "https://api.guildwars2.com";
const ApiSchemaVersion = "2024-07-01T00:00:00Z";
const ApiCommand = {
    LegendaryArmory: "/v2/legendaryarmory",
    LegendaryArmoryCounts: "/v2/account/legendaryarmory",
	Characters: "/v2/characters",
	Items: "/v2/items",
};

const MAX_ID_COUNT = 200;



export const apiState = reactive({
    isLoading: false,
    data: null,
    error: null,
});

watch(() => storedState.apiKey, async (newApiKey, oldApiKey) => {
    await loadApiDataAsync();
})

loadApiDataAsync();



async function loadApiDataAsync() {
    apiState.data = null;
    apiState.error = null;
    apiState.isLoading = true;
    try {
        apiState.data = await getApiDataAsync();
    } catch(error) {
        apiState.error = error;
    }
    apiState.isLoading = false;
}

async function getApiDataAsync() {
    return new Promise(async (resolve, reject) => {

        // get common legendary items item info
        let response = await getLegendaryItemsAsync();
        if (response.error) {
            reject(response.error);
            return;
        }
        const legItems = response.result.sort((i1, i2) => { return i1.id - i2.id; });

        // get counts for owned legendary items
        let didLoadOwned = false;
        const legItemCounts = [];
        if (storedState.apiKey) {
            response = await getLegendaryItemCountsAsync();
            if (response.result) {
                legItemCounts.push(...response.result);
                didLoadOwned = true;
            }
        }

        // create dictionary of all legendary types
        const lavTypes = [];
        for (const type of Object.values(LavItemClass.Type)) {
            if (type === LavItemClass.Type.Unknown) continue;
            lavTypes[type] = new LavType(type);
        }

        // sort items into types
        for (const item of legItems) {
            const countItem = legItemCounts.find((i) => item.id == i.id);
            const legItem = new LavItem(item, countItem ? countItem.count : 0);
            if (legItem.type != LavItemClass.Type.Unknown) {
                lavTypes[legItem.type].addItem(legItem);
            }
        }

        // get info about items from characters
        let didLoadCounts = false;
        if (didLoadOwned) {
            response = await getCharactersAsync();
            if (response.result) {
                didLoadCounts = true;
                const chars = response.result;
                const itemsAll = [];

                // make list if all items on all characters
                for (const char of chars) {
                    // ignore non max level characters
                    if (char.level < 80) continue;

                    // look through equipment templates
                    for (const tab of char.equipment_tabs) {
                        for (const eqp of tab.equipment) {
                            itemsAll.push({
                                id: eqp.id,
                                upgrades: eqp.upgrades,
                                charName: char.name,
                                tabId: tab.tab,
                                tabName: tab.name,
                            });
                        }
                    }

                    // look through inventory
                    for (const bag of char.bags) {
                        for (const iSlot of bag.inventory) {
                            // ignore empty inventory slots and unbound items
                            if (!iSlot || !iSlot.binding) continue;
                            for (let i = 0; i < iSlot.count; i++) {
                                itemsAll.push({
                                    id: iSlot.id,
                                    upgrades: iSlot.upgrades,
                                    charName: char.name,
                                    tabId: 0,
                                    tabName: "",
                                });
                            }
                        }
                    }
                }

                // get info about items
                const uniqueItemIds = [...new Set(itemsAll.map((item) => item.id))];
                response = await getItemsAsync(uniqueItemIds);
                if (response.result) {
                    for (const itemUnique of response.result) {
                        const itemsSameId = itemsAll.filter((item) => item.id === itemUnique.id);
                        const type = LavItemClass.getType(itemUnique);
                        const isLegendary = LavItemClass.getIsLegendary(itemUnique);
                        const isTerrestrial = LavItemClass.getIsTerrestrial(itemUnique);
                        for (const itemSame of itemsSameId) {
                            itemSame.type = type;
                            itemSame.isLegendary = isLegendary;
                            itemSame.isTerrestrial = isTerrestrial;
                        }
                    }
                }

                // get a complete list of upgrades
                const upgradesAll = [];
                for (const item of itemsAll) {
                    if (!item.upgrades) continue;
                    for (const upgrade of item.upgrades) {
                        upgradesAll.push({
                            id: upgrade,
                            charName: item.charName,
                            tabId: item.tabId,
                            tabName: item.tabName,
                            isTerrestrial: item.isTerrestrial,
                        });
                    }
                }

                // get info about upgrades
                const uniqueUpgradeIds = [...new Set(upgradesAll.map((item) => item.id))];
                response = await getItemsAsync(uniqueUpgradeIds);
                if (response.result) {
                    for (const upgradeUnique of response.result) {
                        const upgradesSameId = upgradesAll.filter(upgrade => upgrade.id === upgradeUnique.id);
                        const type = LavItemClass.getType(upgradeUnique);
                        const isLegendary = LavItemClass.getIsLegendary(upgradeUnique);
                        for (const upgradeSame of upgradesSameId) {
                            upgradeSame.type = type;
                            upgradeSame.isLegendary = isLegendary;
                        }
                    }
                }

                // add upgrades to the rest of the items
                itemsAll.push(...upgradesAll);

                // sort list for proper counting
                itemsAll.sort((i1, i2) => {
                    const legendaryDiff = i2.isLegendary - i1.isLegendary;
                    return legendaryDiff ? legendaryDiff : i2.isTerrestrial - i1.isTerrestrial;
                });

                // count items
                for (const item of itemsAll) {
                    // skip unknown types
                    if (item.type === LavItemClass.Type.Unknown) continue;

                    lavTypes[item.type].countItem(item);
                }
                
            }
        }

        // create categories
        const lavCats = [];
        for (const cat of Object.values(LavItemClass.Category)) {
            if (cat == LavItemClass.Category.Unknown) continue;
            lavCats[cat] = new LavCategory(cat);
        }
        // sort types into categories
        for (const lavType of lavTypes) {
            lavCats[LavItemClass.getCategory(lavType.type)].types.push(lavType);
        }

        resolve({ lavCategories: lavCats, didLoadOwned: didLoadOwned, didLoadCounts: didLoadCounts });

    });
}

async function fetchApiDataAsync(command, params = {}) {
    const ret = { result: null, error: null };
    try {
        const queryParams = new URLSearchParams({ ...params, ...{
            access_token: storedState.apiKey,
            v: ApiSchemaVersion,
        }});
        const response = await fetch(ApiUrl + command + "?" + queryParams);
        if (response.ok) {
            ret.result = await response.json();
            console.log("API request: " + ApiUrl + command + "?" + queryParams + "\n" + JSON.stringify(ret.result) + "\n");
            return ret;
        } else {
            throw new Error("HTTP Error " + response.status + " " + response.statusText);
        }
    } catch (error) {
        ret.error = error.message;
        return ret;
    }
}

async function getItemsAsync(itemIds) {
    let result = [];
    // split ids to MAX_ID_COUNT sized chunks
    for (let i = 0; i < itemIds.length; i += MAX_ID_COUNT) {
        const idsChunk = itemIds.slice(i, i + MAX_ID_COUNT);

        let response = await fetchApiDataAsync(ApiCommand.Items, { ids: idsChunk.toString() });
        if (response.error) return response;

        result.push(...response.result);
    }
    return { result: result, error: null };
}

async function getLegendaryItemsAsync() {
    let response = await fetchApiDataAsync(ApiCommand.LegendaryArmory);
    if (response.error) return response;

    return await getItemsAsync(response.result);
}

async function getLegendaryItemCountsAsync() {
    return await fetchApiDataAsync(ApiCommand.LegendaryArmoryCounts);
}

async function getCharactersAsync() {
    return await fetchApiDataAsync(ApiCommand.Characters, { ids: "all" });
}
