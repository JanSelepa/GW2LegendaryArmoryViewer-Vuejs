<script setup>
import { ref, computed } from 'vue';
import Dialog from '@/components/Dialog.vue';
import LocalStorage from '@/utils/LocalStorage';
import { storedState } from '@/utils/StoredState';

const emit = defineEmits(["close"]);

const apiKeyPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{20}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;

const apiKey = ref(storedState.apiKey);
const showAquatic = ref(storedState.showAquatic);
const showInventory = ref(storedState.showInventory);

const isApiKeyValid = computed(() => {
    return !apiKey.value || apiKeyPattern.test(apiKey.value);
});
const isApplyEnabled = computed(() => {
    const changed = apiKey.value != storedState.apiKey || showAquatic.value != storedState.showAquatic || showInventory.value != storedState.showInventory;
    return changed && isApiKeyValid.value;
});

function saveSettings() {
    if (apiKey.value != storedState.apiKey) LocalStorage.setItem(LocalStorage.Item.ApiKey, apiKey.value);
    if (showAquatic.value != storedState.showAquatic) LocalStorage.setItem(LocalStorage.Item.ShowAquatic, showAquatic.value);
    if (showInventory.value != storedState.showInventory) LocalStorage.setItem(LocalStorage.Item.ShowInventory, showInventory.value);
    emit("close");
}

</script>

<template>
    <Dialog @close="$emit('close')">
        <div class="settings">
            <div class="title">{{ $t("settings.api_key.title") }}</div>
            <div class="row">
                <div class="apikey_detail">{{ $t("settings.api_key.permissions") }}</div>
                <a href="https://account.arena.net/applications" target="_blank">{{ $t("settings.api_key.get") }}</a>
            </div>
            <input type="text" v-model="apiKey" autocomplete="off" id="gw2lav_api_key" class="apikey">
            <div class="apikey_invalid" :style="{visibility: isApiKeyValid ? 'hidden' : 'visible'}">{{ $t("settings.api_key.pattern") }}</div>
            <div class="title">{{ $t("settings.other.title") }}</div>
            <div class="row">
                <input type="checkbox" v-model="showAquatic" id="gw2lav_other_aquatic">
                <label for="gw2lav_other_aquatic">{{ $t("settings.other.show_aquatic") }}</label>
            </div>
            <div class="row">
                <input type="checkbox" v-model="showInventory" id="gw2lav_other_inventory">
                <label for="gw2lav_other_inventory">{{ $t("settings.other.show_inventory") }}</label>
            </div>
            <br/>
            <div class="row actions">
                <button class="gw2lav_button" @click="saveSettings" :disabled="!isApplyEnabled">{{ $t("main.apply") }}</button>
                <button class="gw2lav_button" @click="$emit('close')">{{ $t("main.cancel") }}</button>
            </div>
        </div>
    </Dialog>
</template>

<style scoped>
.settings {
    display: flex;
    flex-direction: column;
    width: 40rem;
}
.title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
.row {
    display: flex;
    flex-direction: row;
}
.actions {
    align-self: end;
}
.apikey {
    text-align: center;
}
.apikey_detail {
    flex: 1;
}
.apikey_invalid {
    color: red;
}
</style>
