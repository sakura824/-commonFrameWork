<template>
    <div class="side-bar" :class="{ 'collapse': settigStore.isCollapse }">
        <logo :is-collapse="settigStore.isCollapse"></logo>
        <el-menu
        :collapse="settigStore.isCollapse"
        :default-active="route.path"
        background-color="background-menu" 
        text-color="white"
        @open="handleOpen"
        @close="handleClose"
        router
      >
      <SideBarItem :routes="routes"></SideBarItem>
      </el-menu>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, RouteRecordRaw } from 'vue-router';
import logo from './logo/index.vue'
import SideBarItem from './sideBarItem/index.vue'
import { store } from "@/store/index";

const route = useRoute()
const settigStore = store.useSettingStore()
const userStore = store.useUserStore()
let routes = reactive<RouteRecordRaw[]>([])
routes = userStore.routeInfo.routes
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
    .side-bar {
      background-color: $background-menu;
        transition: width 0.28s;
        width: $sideBarWidth !important;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        border-radius: 0px 10px 10px 0px;
    }
    .collapse {
        width: $change-width !important;
    }
</style>