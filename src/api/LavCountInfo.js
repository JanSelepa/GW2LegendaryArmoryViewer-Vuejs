export default class LavCountInfo {

    static Type = {
        Usable: 0, Needed: 1, Used: 2, Inventory: 3,
    }

    constructor(type, isAmphibian) {
        this.type = type;
        this.#initByType(type);

        this.isAmphibian = isAmphibian;
        this.charsTerrestrial = [];
        this.charsAquatic = [];
        this.countTotal = 0;
        this.countTerrestrial = 0;
        this.countAquatic = 0;
    }

    addItem(item) {
        // add count to character (create it if needed)
        const chars = item.isTerrestrial ? this.charsTerrestrial : this.charsAquatic;
        let char = chars.find((c) => c.name === item.charName);
        if (!char) {
            char = new Character(item.charName);
            chars.push(char);
        }
        char.count++;

        // add count to equipment tab (create it if needed)
        let tab = char.tabs.find((t) => t.id === item.tabId);
        if (!tab) {
            tab = new Tab(item.tabId, item.tabName);
            char.tabs.push(tab);
        }
        tab.count++;

        // count item
        item.isTerrestrial ? this.countTerrestrial++ : this.countAquatic++;
        this.countTotal++;
    }

    getCountFromTab(charName, tabId) {
        let count = 0;

        // count terrestrial items
        const charT = this.charsTerrestrial.find((c) => c.name === charName);
        if (charT) {
            const tab = charT.tabs.find((t) => t.id === tabId);
            if (tab)
                count += tab.count;
        }
        // count aquatic items
        const charA = this.charsAquatic.find((c) => c.name === charName);
        if (charA) {
            const tab = charA.tabs.find((t) => t.id === tabId);
            if (tab)
                count += tab.count;
        }

        return count;
    }

    #initByType(type) {
        switch (type) {
            case LavCountInfo.Type.Usable:
                this.nameRes = "detail.usable.title";
                this.descRes = "detail.usable.desc";
                this.icon = "/src/assets/equipment_upgrade.png";
                this.accentColor = "darkorange";
                break;
            case LavCountInfo.Type.Needed:
                this.nameRes = "detail.needed.title";
                this.descRes = "detail.needed.desc";
                this.icon = "/src/assets/equipment_locked.png";
                this.accentColor = "darkred";
                break;
            case LavCountInfo.Type.Used:
                this.nameRes = "detail.used.title";
                this.descRes = "detail.used.desc";
                this.icon = "/src/assets/equipment.png";
                this.accentColor = "darkgreen";
                break;
            case LavCountInfo.Type.Inventory:
                this.nameRes = "detail.inventory.title";
                this.descRes = "detail.inventory.desc";
                this.icon = "/src/assets/inventory.png";
                this.accentColor = "darkgray";
                break;
        }
    }

}

class Tab {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.count = 0;
    }
}

class Character {

    constructor(name) {
        this.name = name;
        this.count = 0;
        this.tabs = [];
    }

}
