import LavItemClass from '@/api/LavItemClass';
import LavCountInfo from '@/api/LavCountInfo';

export default class LavType {

    constructor(type) {
        this.type = type;
        this.category = LavItemClass.getCategory(type);
        this.nameRes = this.#getNameRes(type);
        this.items = [];
        this.count = 0;

        const isAmphibian = LavItemClass.getIsAmphibian(type);

        this.countInfos = [];
        for (const countType of Object.values(LavCountInfo.Type))
            this.countInfos.push(new LavCountInfo(countType, isAmphibian));
    }

    addItem(legItem) {
        this.items.push(legItem);
        this.count += legItem.count;
    }

    countItem(item) {
        // inventory items
        if (!item.tabId) {
            if (item.isLegendary) return;
            this.countInfos[LavCountInfo.Type.Inventory].addItem(item);
            return;
        }
        // equipment tabs items
        if (item.isLegendary) {
            this.countInfos[LavCountInfo.Type.Used].addItem(item);
        } else {
            // get number of legendary items of this type used in the same template
            const used = this.countInfos[LavCountInfo.Type.Used].getCountFromTab(item.charName, item.tabId);
            const usable = this.countInfos[LavCountInfo.Type.Usable].getCountFromTab(item.charName, item.tabId);
            // add to usable or needed items
            if (used + usable < this.count)
                this.countInfos[LavCountInfo.Type.Usable].addItem(item);
            else
                this.countInfos[LavCountInfo.Type.Needed].addItem(item);
        }
    }

    #getNameRes(type) {
        switch (type) {
            // Armor
            case LavItemClass.Type.LightHelm: return "type.armor.light.helm";
            case LavItemClass.Type.MediumHelm: return "type.armor.medium.helm";
            case LavItemClass.Type.HeavyHelm: return "type.armor.heavy.helm";
            case LavItemClass.Type.LightShoulders: return "type.armor.light.shoulders";
            case LavItemClass.Type.MediumShoulders: return "type.armor.medium.shoulders";
            case LavItemClass.Type.HeavyShoulders: return "type.armor.heavy.shoulders";
            case LavItemClass.Type.LightGloves: return "type.armor.light.gloves";
            case LavItemClass.Type.MediumGloves: return "type.armor.medium.gloves";
            case LavItemClass.Type.HeavyGloves: return "type.armor.heavy.gloves";
            case LavItemClass.Type.LightCoat: return "type.armor.light.coat";
            case LavItemClass.Type.MediumCoat: return "type.armor.medium.coat";
            case LavItemClass.Type.HeavyCoat: return "type.armor.heavy.coat";
            case LavItemClass.Type.LightLeggings: return "type.armor.light.leggings";
            case LavItemClass.Type.MediumLeggings: return "type.armor.medium.leggings";
            case LavItemClass.Type.HeavyLeggings: return "type.armor.heavy.leggings";
            case LavItemClass.Type.LightBoots: return "type.armor.light.boots";
            case LavItemClass.Type.MediumBoots: return "type.armor.medium.boots";
            case LavItemClass.Type.HeavyBoots: return "type.armor.heavy.boots";
            // Runes & Sigils
            case LavItemClass.Type.Rune: return "type.upgrade.rune";
            case LavItemClass.Type.Sigil: return "type.upgrade.sigil";
            // Relic, Back, Trinkets
            case LavItemClass.Type.Relic: return "type.trinket.relic";
            case LavItemClass.Type.Back: return "type.trinket.back";
            case LavItemClass.Type.Accessory: return "type.trinket.accessory";
            case LavItemClass.Type.Amulet: return "type.trinket.amulet";
            case LavItemClass.Type.Ring: return "type.trinket.ring";
            // Weapons
            case LavItemClass.Type.Axe: return "type.weapon.axe";
            case LavItemClass.Type.Dagger: return "type.weapon.dagger";
            case LavItemClass.Type.Mace: return "type.weapon.mace";
            case LavItemClass.Type.Pistol: return "type.weapon.pistol";
            case LavItemClass.Type.Sword: return "type.weapon.sword";
            case LavItemClass.Type.Scepter: return "type.weapon.scepter";
            case LavItemClass.Type.Focus: return "type.weapon.focus";
            case LavItemClass.Type.Shield: return "type.weapon.shield";
            case LavItemClass.Type.Torch: return "type.weapon.torch";
            case LavItemClass.Type.Warhorn: return "type.weapon.warhorn";
            case LavItemClass.Type.Greatsword: return "type.weapon.greatsword";
            case LavItemClass.Type.Hammer: return "type.weapon.hammer";
            case LavItemClass.Type.LongBow: return "type.weapon.longbow";
            case LavItemClass.Type.Rifle: return "type.weapon.rifle";
            case LavItemClass.Type.ShortBow: return "type.weapon.shortbow";
            case LavItemClass.Type.Staff: return "type.weapon.staff";
            case LavItemClass.Type.Harpoon: return "type.weapon.harpoon";
            case LavItemClass.Type.Speargun: return "type.weapon.speargun";
            case LavItemClass.Type.Trident: return "type.weapon.trident";
            // Unknown
            default: return "type.unknown";
        }
    }


}