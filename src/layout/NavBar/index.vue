<template>
    <div class="top" :class="{ 'collapse': props.isActive }">
        <el-icon class="icon" :class="{ 'is-active': props.isActive }" size="30" color="#fff" @click="props.expansionContraction">
            <Menu />
        </el-icon>
        <el-breadcrumb style="margin-left: 20px;" separator="/">
          <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <User style="margin-left: auto;"></User>
    </div>
</template>

<script setup lang="ts">
import User from './user/index.vue'
import { useRoute } from "vue-router";
const route = useRoute()

const props = defineProps({
    expansionContraction: {
        type: Function,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    }
})


</script>

<style lang="scss" scoped>
    .top {
        display: flex;
        height: $base-tabbar-height;
        // justify-content: space-between;
        align-items: center;
        background-color: $background-menu;
        margin-left: $sideBarWidth;
        padding: 15px;
        /* width: 100vh; */
        .icon {
            display: inline-block;
            cursor: pointer;
            transform: rotate(90deg);
            transition: 0.38s;
            transform-origin: 50% 50%;
        }
        .is-active {
            transform: rotate(0deg);
        }
    }
    .collapse {
       margin-left: $change-width;
    }

    ::v-deep .el-breadcrumb__inner {
        color: #fff !important;
    }
</style>