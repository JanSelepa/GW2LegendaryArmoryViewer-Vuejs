<script setup>
import { storedState } from '@/utils/StoredState';
import LavItemClass from '@/api/LavItemClass';
import LegendaryCategory from '@/components/LegendaryCategory.vue';

const props = defineProps({
    categories: Array,
});

defineEmits(["typeSelected"]);

</script>

<template>
    <div class="overview">
        <div class="row">
            <LegendaryCategory :category="categories[LavItemClass.Category.LightArmor]" :columns="1" @type-selected="(type) => $emit('typeSelected', type)" />
            <LegendaryCategory :category="categories[LavItemClass.Category.MediumArmor]" :columns="1" @type-selected="(type) => $emit('typeSelected', type)" />
            <LegendaryCategory :category="categories[LavItemClass.Category.HeavyArmor]" :columns="1" @type-selected="(type) => $emit('typeSelected', type)" />
        </div>
        <div class="row">
            <LegendaryCategory :category="categories[LavItemClass.Category.Upgrade]" :columns="0" @type-selected="(type) => $emit('typeSelected', type)" />
            <LegendaryCategory :category="categories[LavItemClass.Category.Trinket]" :columns="0" @type-selected="(type) => $emit('typeSelected', type)" />
        </div>
        <div class="row">
            <LegendaryCategory :category="categories[LavItemClass.Category.WeaponEachHand]" :columns="2" @type-selected="(type) => $emit('typeSelected', type)" />
            <LegendaryCategory :category="categories[LavItemClass.Category.WeaponSingleHand]" :columns="2" @type-selected="(type) => $emit('typeSelected', type)" />
            <LegendaryCategory :category="categories[LavItemClass.Category.WeaponTwoHand]" :columns="2" @type-selected="(type) => $emit('typeSelected', type)" />
            <LegendaryCategory :category="categories[LavItemClass.Category.WeaponAquatic]" :columns="1" @type-selected="(type) => $emit('typeSelected', type)" v-if="storedState.showAquatic" />
        </div>
    </div>
</template>

<style scoped>
.overview {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 65rem;
}

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 3rem;
    width: 100%;
}
</style>
