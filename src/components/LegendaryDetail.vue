<script setup>
import { apiState } from '@/api/Api';
import LavType from '@/api/LavType';
import LegendaryCountInfo from '@/components/LegendaryCountInfo.vue';

const props = defineProps({
    type: LavType,
});

</script>

<template>
    <div class="detail">
        <div v-if="props.type" class="content">
            <div class="title">{{ $t(props.type.nameRes) }}</div>
            <div class="info" v-if="apiState.data.didLoadCounts">
                <LegendaryCountInfo v-for="countInfo in props.type.countInfos" :count-info="countInfo" />
            </div>
            <div v-else class="error">{{ $t("detail.error") }}</div>
        </div>
        <div v-else class="empty">{{ $t("detail.empty") }}</div>
    </div>
</template>

<style scoped>
    .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: solid;
        border-width: 0.1rem;
    }
    .error {
        margin: 0rem 1rem;
        text-align: justify;
    }
    .empty {
        font-size: 1.2rem;
        white-space: pre-line;
        text-align: center;
    }
    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
        overflow: hidden;
    }
    .title {
        margin: 1rem;
        text-align: center;
        font-size: 1.3rem;
        font-weight: bold;
    }
    .info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
    }
</style>