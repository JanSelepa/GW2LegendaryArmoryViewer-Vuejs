<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import LavCategory from '@/api/LavCategory';
import LavItemClass from '@/api/LavItemClass';
import LegendaryType from '@/components/LegendaryType.vue';

const i18n = useI18n();

const props = defineProps({
    category: LavCategory,
    columns: Number,
});

defineEmits(["typeSelected"]);

const columnsTemplate = computed(() => {
    const columns = props.columns ? props.columns : 99;
    let result = "";
    for (let i = 0; i < columns; i++)
        result += " auto";
    return result;
});

const categoryName = computed(() => {
    switch (props.category.category) {
        case LavItemClass.Category.LightArmor: return i18n.t("type.armor.light.title");
        case LavItemClass.Category.MediumArmor: return i18n.t("type.armor.medium.title");
        case LavItemClass.Category.HeavyArmor: return i18n.t("type.armor.heavy.title");
        case LavItemClass.Category.Upgrade: return i18n.t("type.upgrade.title");
        case LavItemClass.Category.Trinket: return i18n.t("type.trinket.title");
        case LavItemClass.Category.WeaponEachHand: return i18n.t("type.weapon.title_eachhand");
        case LavItemClass.Category.WeaponSingleHand: return i18n.t("type.weapon.title_singlehand");
        case LavItemClass.Category.WeaponTwoHand: return i18n.t("type.weapon.title_twohand");
        case LavItemClass.Category.WeaponAquatic: return i18n.t("type.weapon.title_aquatic");
        default: return i18n.t("type.unknown");
    }
});

</script>

<template>
    <div class="category">
        <div class="title">{{ categoryName }}</div>
        <div class="content" :style="{ gridTemplateColumns: columnsTemplate }">
            <LegendaryType v-for="type in props.category.types" :type="type" @selected="(type) => $emit('typeSelected', type)" />
        </div>
    </div>
</template>

<style scoped>
.category {
    display: flex;
    flex-direction: column;
    flex: 0 1;
}
.title {
    align-self: center;
    font-size: 1.1rem;
    font-weight: bold;
    white-space: pre-line;
    text-align: center;
    margin: 0.5rem;
}
.content {
    display: grid;
}
</style>
