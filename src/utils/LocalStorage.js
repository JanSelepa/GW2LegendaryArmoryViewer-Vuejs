import { storedState } from '@/utils/StoredState';

export default class LocalStorage {

    static Item = {
        ApiKey: {
            name: "gw2lav_api_key",
            default: "",
        },
        ShowAquatic: {
            name: "gw2lav_show_aquatic",
            default: true,
        },
        ShowInventory: {
            name: "gw2lav_show_inventory",
            default: true,
        },
        IsCountExpanded: {
            name: "gw2lav_is_count_expanded",
            default: [ true, true, false, true ],
        }
    }

    static getItem(item) {
        let value = localStorage.getItem(item.name);
        return value ? JSON.parse(value) : item.default;
    }

    static setItem(item, value) {
        localStorage.setItem(item.name, JSON.stringify(value));
        LocalStorage.#updateStoredState(item, value);
    }

    static #updateStoredState(item, value) {
        switch (item) {
            case LocalStorage.Item.ApiKey: storedState.apiKey = value; break;
            case LocalStorage.Item.ShowAquatic: storedState.showAquatic = value; break;
            case LocalStorage.Item.ShowInventory: storedState.showInventory = value; break;
            case LocalStorage.Item.IsCountExpanded: storedState.isCountExpanded = value; break;
        }
    }

}