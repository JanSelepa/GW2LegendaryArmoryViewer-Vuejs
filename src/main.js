import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import '@/assets/main.css';
import en from "@/locales/en.json"
import App from '@/App.vue';

const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: { en },
});

const app = createApp(App);
app.use(i18n);
app.mount('#app');
