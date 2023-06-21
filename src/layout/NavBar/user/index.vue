<script setup lang="ts">
import { ref } from 'vue'
import { store } from '@/store/index'

const userStore = store.useUserStore()
const settingStore = store.useSettingStore()
//颜色
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
//el颜色主题切换
const setColor = () => {
    const html = document.documentElement;
    //示例 修改elementui的button颜色
    //具体需要修改哪个属性可以f12打开控制台自行查看修改，也可以查看el源码
    html.style.setProperty('--el-color-primary',color.value);
}
//暗黑主题
const dark = ref()
const changeDark = () => {
    const el = document.documentElement;
    dark.value ? el.className = 'dark' : el.className = ''
}
//退出登录
const logOut = () => {
    userStore.logOut()
}
//刷新
const refresh = () => {
    settingStore.refresh = !settingStore.refresh
}
//全屏
const fullScreen = () => {
    //全屏:true,不是全屏:false
    const win = document.fullscreenElement
    if (!win) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
}
</script>
<template>
<div class="user">
    <!-- 刷新和全屏 -->
    <el-button icon="Refresh" circle  @click="refresh"></el-button>
    <el-button icon="FullScreen" circle  @click="fullScreen"></el-button>

    <!-- 主题色 -->
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" inline-prompt
                    active-icon="MoonNight" inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <!-- 头像 -->
    <div>
        <el-dropdown>
            <div class="user-info">
                <img :src="userStore.routeInfo.avatar" alt="">
            <span>{{ userStore.routeInfo.name }}</span>
            <el-icon class="icon" size="20" color="#fff">
                <arrow-down />
            </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</div>
</template>
<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    justify-content: center;
    &-info {
        display: flex;
        align-items: center;
        margin-left: 20px;
        color: white;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid #fff;
        }
        span {
            margin: 0 10px;
        }
        
    }
}
</style>