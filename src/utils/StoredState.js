import { reactive } from 'vue';
import LocalStorage from '@/utils/LocalStorage';

export const storedState = reactive({
    apiKey: LocalStorage.getItem(LocalStorage.Item.ApiKey),
    showAquatic: LocalStorage.getItem(LocalStorage.Item.ShowAquatic),
    showInventory: LocalStorage.getItem(LocalStorage.Item.ShowInventory),
    detailType: null,
    showSettings: false,
    showInfo: false,
    isCountExpanded: LocalStorage.getItem(LocalStorage.Item.IsCountExpanded),
});
