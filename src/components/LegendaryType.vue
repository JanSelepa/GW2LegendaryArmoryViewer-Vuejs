<script setup>
import { computed } from 'vue';

import { storedState } from '@/utils/StoredState';
import { apiState } from '@/api/Api';
import LavType from '@/api/LavType';
import LavCountInfo from '@/api/LavCountInfo';


defineEmits(["selected"]);

const props = defineProps({
    type: LavType,
});

const hasUsable = computed(() => {
	return apiState.data.didLoadCounts && (storedState.showAquatic ? props.type.countInfos[LavCountInfo.Type.Usable].countTotal > 0 : props.type.countInfos[LavCountInfo.Type.Usable].countTerrestrial > 0);
});
const hasNeeded = computed(() => {
	return apiState.data.didLoadCounts && (storedState.showAquatic ? props.type.countInfos[LavCountInfo.Type.Needed].countTotal > 0 : props.type.countInfos[LavCountInfo.Type.Needed].countTerrestrial > 0);
});
const hasInventory = computed(() => {
	return apiState.data.didLoadCounts && (storedState.showInventory && (storedState.showAquatic ? props.type.countInfos[LavCountInfo.Type.Inventory].countTotal > 0 : props.type.countInfos[LavCountInfo.Type.Inventory].countTerrestrial > 0));
});
const hasNone = computed(() => {
	return apiState.data.didLoadCounts && !hasUsable.value && !hasNeeded.value && !hasInventory.value;
});

</script>

<template>
    <div class="type" @click="$emit('selected', props.type)">
		<div class="info">
        	<div class="name">{{ $t(props.type.nameRes) }}</div>
			<img class="status" src="/src/assets/equipment_upgrade.png" v-if="hasUsable" />
			<img class="status" src="/src/assets/equipment_locked.png" v-if="hasNeeded" />
			<img class="status" src="/src/assets/inventory.png" v-if="hasInventory" />
			<img class="status" src="/src/assets/checkmark.png" v-if="hasNone" />
		</div>
        <div class="items">
			<div class="item" v-for="item in props.type.items">
            	<img :src="item.icon" :title="item.name" class="icon" :style="{ opacity: !apiState.data.didLoadOwned || item.count > 0 ? 1 : 0.4 }" />
				<div class="item_count" v-if="item.count > 1">{{ item.count }}</div>
			</div>
        </div>
    </div>
</template>

<style scoped>
.type {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0.2rem 0.4rem 0.4rem 0.4rem;
}
.type:hover {
    background-color: #88888844;
}
.info {
	display: flex;
	flex-direction: row;
	width: 100%;
}
.name {
	flex: 1;
    white-space: nowrap;
    font-size: 0.9rem;
	margin-right: 0.5rem;
}
.status {
	height: 1rem;
}
.items {
    display: flex;
    flex-direction: row;
}
.item {
	position: relative;
}
.icon {
	width: 2rem;	
	display: block;
}
.item_count {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	font-size: 1.5rem;
	text-shadow:
		0.1rem 0.1rem 0.2rem black,
		0.1rem -0.1rem 0.2rem black,
		-0.1rem 0.1rem 0.2rem black,
		-0.1rem -0.1rem 0.2rem black;
}
</style>
