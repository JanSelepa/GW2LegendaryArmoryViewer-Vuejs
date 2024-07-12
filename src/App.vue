<script setup>
import { useDark } from '@vueuse/core';

import { storedState } from '@/utils/StoredState';
import { apiState } from '@/api/Api';

import LegendaryOverview from '@/components/LegendaryOverview.vue';
import LegendaryDetail from '@/components/LegendaryDetail.vue';
import Info from '@/components/Info.vue';
import Settings from '@/components/Settings.vue';

const isDark = useDark();
</script>

<template>
  <div class="app">
    <div class="header">
      <img class="header_logo" src="/app_icon.ico">
      <div class="header_title">
        <img class="header_gw2logo" src="/src/assets/gw2_logo.png">
        <div class="header_name">{{ $t("main.app_name") }}</div>
      </div>
      <div class="header_actions">
        <div class="header_action" @click="isDark = !isDark" :title="$t('main.dark_mode')">
          <i class="fa fa-sun-o"></i>
        </div>
        <div class="header_action" @click="storedState.showSettings = true" :title="$t('settings.title')">
          <i class="fa fa-cog"></i>
        </div>
        <div class="header_action" @click="storedState.showInfo = true" :title="$t('info.title')">
          <i class="fa fa-info"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <LegendaryOverview class="content_overview" v-if="apiState.data" :categories="apiState.data.lavCategories" @type-selected="(type) => storedState.detailType = type" />
      <LegendaryDetail class="content_detail" v-if="apiState.data" :type="storedState.detailType"/>
      <div class="content_info" v-if="apiState.isLoading || apiState.error">
        <div v-if="apiState.isLoading">{{ $t("main.loading") }}</div>
        <div v-if="apiState.error">{{ apiState.error }}</div>
      </div>
    </div>
    <Settings v-if="storedState.showSettings" :title="$t('settings.title')" @close="storedState.showSettings = false"/>
    <Info v-if="storedState.showInfo" :title="$t('info.title')" @close="storedState.showInfo = false"/>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  min-height: 52rem;
  display: flex;
  flex-direction: column;
}
.header {
  height: 5rem;
  background-image: url("assets/app_header.png");
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: row;
  display: flex;
}
.header_logo {
  width: 4rem;
  margin: 0.5rem 1rem;
  align-self: center;
  display: block;
}
.header_title {
  flex: 1;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: -0.2rem;
}
.header_gw2logo {
  align-self: flex-start;
  object-fit: contain;
  height: 1.2rem;
}
.header_name {
  font-size: 1.8rem;
  color: white;
}
.header_actions {
  display: flex;
  flex-direction: row;
}
.header_action {
  color: white;
  font-size: 1.5rem;
  width: 3rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header_action:hover {
  background-color: #88888844;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: auto;
}
.content_overview {
  flex: 1;
}
.content_detail {
  flex: 0 0 20rem;
}
.content_info {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}
</style>
