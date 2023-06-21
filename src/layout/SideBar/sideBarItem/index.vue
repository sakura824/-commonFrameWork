<template>
  <template v-for="item in routes" :key="item.path">
    <!-- 多个子路由 -->
    <template v-if="item.children">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon><component :is="item.meta.icon"></component></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <side-bar-item :routes="item.children"></side-bar-item>
      </el-sub-menu>
    </template>
    <!-- 一个子路由 -->
    <template v-else-if="item.children && item.children.length === 1">
      <el-menu-item :index="item.children[0].path" @click="goRouter">
        <el-icon><component :is="item.children[0].meta.icon"></component></el-icon>
        <span>{{ item.children[0].meta.title }}</span>
    </el-menu-item>
    </template>
    <!-- 没有子路由 -->
    <template v-else>
      <el-menu-item :index="item.path" @click="goRouter">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{ item.meta.title }}</span>
    </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps(['routes'])

const router = useRouter()
const goRouter = (info: any) => {
  router.push(info.index)
}
</script>
<script lang="ts">
export default {
    name: 'SideBarItem'
}
</script>

<style lang="scss" scoped>

</style>