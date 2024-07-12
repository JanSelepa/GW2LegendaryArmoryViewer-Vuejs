export default class LavItemClass {

    static Type = {
        Unknown: -1,
        LightHelm: 0, LightShoulders: 1, LightGloves: 2, LightCoat: 3, LightLeggings: 4, LightBoots: 5,
        MediumHelm: 6, MediumShoulders: 7, MediumGloves: 8, MediumCoat: 9, MediumLeggings: 10, MediumBoots: 11,
        HeavyHelm: 12, HeavyShoulders: 13, HeavyGloves: 14, HeavyCoat: 15, HeavyLeggings: 16, HeavyBoots: 17,
        Rune: 18, Sigil: 19,
		Relic: 20, Back: 21, Accessory: 22, Amulet: 23, Ring: 24,
		Axe: 25, Dagger: 26, Mace: 27, Pistol: 28, Sword: 29,
		Scepter: 30,
		Focus: 31, Shield: 32, Torch: 33, Warhorn: 34,
		Greatsword: 35, Hammer: 36, LongBow: 37, Rifle: 38, ShortBow: 39, Staff: 40,
		Harpoon: 41, Speargun: 42, Trident: 43,
    }

    static Category = {
        Unknown: -1,
        LightArmor: 0, MediumArmor: 1, HeavyArmor: 2,
        Upgrade: 3, Trinket: 4,
        WeaponEachHand: 5, WeaponSingleHand: 6, WeaponTwoHand: 7, WeaponAquatic: 8,
    }

    static getType(jsonItem) {
        let itemType = LavItemClass.Type.Unknown;
        switch (jsonItem.type) {
            // Armor
            case "Armor":
                switch (jsonItem.details.weight_class) {
                    case "Light":
                        switch (jsonItem.details.type) {
                            case "Helm": itemType = LavItemClass.Type.LightHelm; break;
                            case "Shoulders": itemType = LavItemClass.Type.LightShoulders; break;
                            case "Gloves": itemType = LavItemClass.Type.LightGloves; break;
                            case "Coat": itemType = LavItemClass.Type.LightCoat; break;
                            case "Leggings": itemType = LavItemClass.Type.LightLeggings; break;
                            case "Boots": itemType = LavItemClass.Type.LightBoots; break;
                        }
                        break;
                    case "Medium":
                        switch (jsonItem.details.type) {
                            case "Helm": itemType = LavItemClass.Type.MediumHelm; break;
                            case "Shoulders": itemType = LavItemClass.Type.MediumShoulders; break;
                            case "Gloves": itemType = LavItemClass.Type.MediumGloves; break;
                            case "Coat": itemType = LavItemClass.Type.MediumCoat; break;
                            case "Leggings": itemType = LavItemClass.Type.MediumLeggings; break;
                            case "Boots": itemType = LavItemClass.Type.MediumBoots; break;
                        }
                        break;
                    case "Heavy":
                        switch (jsonItem.details.type) {
                            case "Helm": itemType = LavItemClass.Type.HeavyHelm; break;
                            case "Shoulders": itemType = LavItemClass.Type.HeavyShoulders; break;
                            case "Gloves": itemType = LavItemClass.Type.HeavyGloves; break;
                            case "Coat": itemType = LavItemClass.Type.HeavyCoat; break;
                            case "Leggings": itemType = LavItemClass.Type.HeavyLeggings; break;
                            case "Boots": itemType = LavItemClass.Type.HeavyBoots; break;
                        }
                        break;
                }
                break;
            // Back item
            case "Back":
                itemType = LavItemClass.Type.Back;
                break;
            // Trinkets
            case "Trinket":
                switch (jsonItem.details.type) {
                    case "Amulet": itemType = LavItemClass.Type.Amulet; break;
                    case "Accessory": itemType = LavItemClass.Type.Accessory; break;
                    case "Ring": itemType = LavItemClass.Type.Ring; break;
                }
                break;
            // Relic
            case "Relic":
                itemType = LavItemClass.Type.Relic;
                break;
            // Runes & Sigils
            case "UpgradeComponent":
                switch (jsonItem.details.type) {
                    case "Rune": itemType = LavItemClass.Type.Rune; break;
                    case "Sigil": itemType = LavItemClass.Type.Sigil; break;
                }
                break;
            // Weapons
            case "Weapon":
                switch (jsonItem.details.type) {
                    case "Axe": itemType = LavItemClass.Type.Axe; break;
                    case "Dagger": itemType = LavItemClass.Type.Dagger; break;
                    case "Mace": itemType = LavItemClass.Type.Mace; break;
                    case "Pistol": itemType = LavItemClass.Type.Pistol; break;
                    case "Sword": itemType = LavItemClass.Type.Sword; break;
                    case "Scepter": itemType = LavItemClass.Type.Scepter; break;
                    case "Focus": itemType = LavItemClass.Type.Focus; break;
                    case "Shield": itemType = LavItemClass.Type.Shield; break;
                    case "Torch": itemType = LavItemClass.Type.Torch; break;
                    case "Warhorn": itemType = LavItemClass.Type.Warhorn; break;
                    case "Greatsword": itemType = LavItemClass.Type.Greatsword; break;
                    case "Hammer": itemType = LavItemClass.Type.Hammer; break;
                    case "LongBow": itemType = LavItemClass.Type.LongBow; break;
                    case "Rifle": itemType = LavItemClass.Type.Rifle; break;
                    case "ShortBow": itemType = LavItemClass.Type.ShortBow; break;
                    case "Staff": itemType = LavItemClass.Type.Staff; break;
                    case "Harpoon": itemType = LavItemClass.Type.Harpoon; break;
                    case "Speargun": itemType = LavItemClass.Type.Speargun; break;
                    case "Trident": itemType = LavItemClass.Type.Trident; break;
                }
                break;
        }
        return itemType;
    }

    static getIsTerrestrial(jsonItem) {
        if (!jsonItem || !jsonItem.details)
            return true;
        // Aquatic Helm
        if (jsonItem.type === "Armor" && jsonItem.details.type === "HelmAquatic")
            return false;
        // Aquatic Weapons
        if (jsonItem.type === "Weapon" && (jsonItem.details.type === "Harpoon" || jsonItem.details.type === "Speargun" || jsonItem.details.type === "Trident"))
            return false;

        return true;
    }

    static getIsAmphibian(type) {
        return type == LavItemClass.Type.Rune || type == LavItemClass.Type.Sigil;
    }

    static getIsLegendary(jsonItem) {
        return jsonItem.rarity === "Legendary";
    }

    static getCategory(type) {
        for (const cat of Object.values(LavItemClass.Category)) {
            if (LavItemClass.getTypes(cat).includes(type))
                return cat;
        }
        return LavItemClass.Category.Unknown;
    }

    static getTypes(category) {
        switch (category) {
            case LavItemClass.Category.LightArmor:
                return [
                    LavItemClass.Type.LightHelm,
                    LavItemClass.Type.LightShoulders,
                    LavItemClass.Type.LightGloves,
                    LavItemClass.Type.LightCoat,
                    LavItemClass.Type.LightLeggings,
                    LavItemClass.Type.LightBoots,
                ];
            case LavItemClass.Category.MediumArmor:
                return [
                    LavItemClass.Type.MediumHelm,
                    LavItemClass.Type.MediumShoulders,
                    LavItemClass.Type.MediumGloves,
                    LavItemClass.Type.MediumCoat,
                    LavItemClass.Type.MediumLeggings,
                    LavItemClass.Type.MediumBoots,
                ];
            case LavItemClass.Category.HeavyArmor:
                return [
                    LavItemClass.Type.HeavyHelm,
                    LavItemClass.Type.HeavyShoulders,
                    LavItemClass.Type.HeavyGloves,
                    LavItemClass.Type.HeavyCoat,
                    LavItemClass.Type.HeavyLeggings,
                    LavItemClass.Type.HeavyBoots,
                ];
            case LavItemClass.Category.Upgrade:
                return [
                    LavItemClass.Type.Rune,
                    LavItemClass.Type.Sigil,
                ];
            case LavItemClass.Category.Trinket:
                return [
                    LavItemClass.Type.Relic,
                    LavItemClass.Type.Back,
                    LavItemClass.Type.Accessory,
                    LavItemClass.Type.Amulet,
                    LavItemClass.Type.Ring,
                ];
            case LavItemClass.Category.WeaponEachHand:
                return [
                    LavItemClass.Type.Axe,
                    LavItemClass.Type.Dagger,
                    LavItemClass.Type.Mace,
                    LavItemClass.Type.Pistol,
                    LavItemClass.Type.Sword,
                ];
            case LavItemClass.Category.WeaponSingleHand:
                return [
                    LavItemClass.Type.Scepter,
                    LavItemClass.Type.Focus,
                    LavItemClass.Type.Shield,
                    LavItemClass.Type.Torch,
                    LavItemClass.Type.Warhorn,
                ];
            case LavItemClass.Category.WeaponTwoHand:
                return [
                    LavItemClass.Type.Greatsword,
                    LavItemClass.Type.Hammer,
                    LavItemClass.Type.LongBow,
                    LavItemClass.Type.Rifle,
                    LavItemClass.Type.ShortBow,
                    LavItemClass.Type.Staff,
                ];
            case LavItemClass.Category.WeaponAquatic:
                return [
                    LavItemClass.Type.Harpoon,
                    LavItemClass.Type.Speargun,
                    LavItemClass.Type.Trident,
                ];
            default:
                return [];
        }
    }

}