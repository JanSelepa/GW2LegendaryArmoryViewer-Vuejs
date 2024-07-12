<script setup>
import Dialog from '@/components/Dialog.vue';

</script>

<template>
    <Dialog>
        <div class="info">
            <div class="title">
                {{ $t("info.legal_title") }}
            </div>
            <div>
                {{ $t("info.legal_text") }}
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
.info {
    display: flex;
    flex-direction: column;
}
.title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
</style>
