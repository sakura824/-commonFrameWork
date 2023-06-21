<script setup lang="ts">
import SideBar from './SideBar/index.vue';
import NavBar from './NavBar/index.vue';
import Main from './Main/index.vue';
import { store } from '@/store/index'

const settigStore = store.useSettingStore()
const expansionContraction = () => {
    settigStore.isCollapse = !settigStore.isCollapse
}
</script>

<template>
    <div class="app-container">
        <nav-bar :expansion-contraction="expansionContraction" :is-active="settigStore.isCollapse"></nav-bar>
        <side-bar></side-bar>
        <div class="main" :class="{ 'collapse1': settigStore.isCollapse }">
            <Main></Main>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .app-container {
        .main {
        position: absolute;
        width: calc(100% - $sideBarWidth);
        height: calc(100vh - $base-tabbar-height);
        left: $sideBarWidth;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        }
        .collapse1 {
            width: calc(100% - $change-width);
            left: $change-width;
        }
    }
</style>