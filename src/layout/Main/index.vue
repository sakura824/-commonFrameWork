<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="refresh" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import { store } from '@/store';
let settingStore = store.useSettingStore();
//控制当前组件是否销毁重建
let refresh = ref(true);

//点击刷新按钮
watch(() => settingStore.refresh, () => {
    refresh.value = false;
    nextTick(() => {
        refresh.value = true;
    })
})
</script>

<style scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>