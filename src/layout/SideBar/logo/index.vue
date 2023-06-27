
<script setup lang="ts">
import { reactive } from 'vue'
const logo = reactive({
    title: '标题', //标题
    logoImg: './src/assets/topIcon.png', //图标
})
const props = defineProps({
    isCollapse: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div v-if="props.isCollapse" class="logo">
        <img class="change-img" :src="logo.logoImg" alt="">
    </div>
    <div v-else>
        <img style="width: 100%;" :src="logo.logoImg" alt="">
        <p style="text-align: center;">{{ logo.title }}</p>
    </div>
</template>

<style lang="scss" scoped>
 //图标按照实际设计情况修改样式，默认正方形图标
.change-img {
    width: $change-width;
    height: $change-width;
}
</style>