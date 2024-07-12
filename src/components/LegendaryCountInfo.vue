<script setup>
import LavCountInfo from '@/api/LavCountInfo';
import LocalStorage from '@/utils/LocalStorage';
import { storedState } from '@/utils/StoredState';

const props = defineProps({
    countInfo: LavCountInfo,
});

function onExpandClick() {
    storedState.isCountExpanded[props.countInfo.type] = !storedState.isCountExpanded[props.countInfo.type];
    LocalStorage.setItem(LocalStorage.Item.IsCountExpanded, storedState.isCountExpanded);
}

</script>

<template>
    <div class="countinfo" v-if="props.countInfo.type != LavCountInfo.Type.Inventory || storedState.showInventory" :style="{ borderLeftColor: props.countInfo.accentColor }">
        <div class="header" @click="onExpandClick">
            <i :class="[ 'fa fa-caret-right', 'header_caret', storedState.isCountExpanded[props.countInfo.type] ? 'rotated' : '' ]"></i>
            <img class="header_icon" :src="props.countInfo.icon" />
            <div class="header_title">{{ $t(props.countInfo.nameRes) }}</div>
            <div class="header_count" :title="$t(props.countInfo.descRes)">{{ storedState.showAquatic ? props.countInfo.countTotal : props.countInfo.countTerrestrial }}</div>
        </div>
        <div class="content" v-show="storedState.isCountExpanded[props.countInfo.type]">
            <div class="category" v-if="props.countInfo.countTerrestrial > 0">
                <div class="info" v-if="props.countInfo.isAmphibian || (props.countInfo.countAquatic > 0 && props.countInfo.countTerrestrial > 0)">
                    <div class="title">{{ $t("detail.terrestrial") }}</div>
                    <div class="count">{{ props.countInfo.countTerrestrial }}</div>
                </div>
                <div class="char" v-for="char in props.countInfo.charsTerrestrial">
                    <div class="info" v-if="char.count > 0">
                        <div class="title">{{ char.name }}</div>
                        <div class="count">{{ char.count }}</div>
                    </div>
                    <div class="tab" v-if="props.countInfo.type !== LavCountInfo.Type.Inventory" v-for="tab in char.tabs">
                        <div class="info" v-if="tab.count > 0">
                            <div class="id">({{ tab.id }})</div>
                            <div class="title">{{ tab.name }}</div>
                            <div class="count">{{ tab.count }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="category" v-if="storedState.showAquatic && props.countInfo.countAquatic > 0">
                <div class="info" v-if="props.countInfo.isAmphibian || (props.countInfo.countAquatic > 0 && props.countInfo.countTerrestrial > 0)">
                    <div class="title">{{ $t("detail.aquatic") }}</div>
                    <div class="count">{{ props.countInfo.countAquatic }}</div>
                </div>
                <div class="char" v-for="char in props.countInfo.charsAquatic">
                    <div class="info" v-if="char.count > 0">
                        <div class="title">{{ char.name }}</div>
                        <div class="count">{{ char.count }}</div>
                    </div>
                    <div class="tab" v-if="props.countInfo.type !== LavCountInfo.Type.Inventory" v-for="tab in char.tabs">
                        <div class="info" v-if="tab.count > 0">
                            <div class="id">({{ tab.id }})</div>
                            <div class="title">{{ tab.name }}</div>
                            <div class="count">{{ tab.count }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.countinfo {
    border-left-width: 0.4rem;
    border-left-style: solid;
}
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.1rem 1rem 0.2rem 0rem;
}
.header:hover {
    background-color: #88888844;
}
.header_caret {
    margin-left: 0.5rem;
    font-size: 1.5rem;
}
.rotated {
    transform: rotate(90deg);
}
.header_icon {
    height: 1.5rem;
    margin: 0rem 0.5rem;
}
.header_title {
    flex: 1;
    font-size: 1.2rem;
    white-space: pre-line;
}
.header_count {
    font-size: 1.3rem;
}
.info {
    display: flex;
    flex-direction: row;
}
.title {
    flex: 1;
}
.id {
    margin-right: 0.5rem;
}
.category {
    font-style: italic;
    font-size: 1.1rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
}
.char {
    font-style: normal;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.5rem 0rem 0rem 0rem;
}
.tab {
    font-weight: normal;
    margin-left: 1rem;
}
</style>
