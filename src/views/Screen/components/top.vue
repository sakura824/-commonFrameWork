<template>
    <div class="top">
        <div class="left">
            <span class="btn" @click="goHome">首页</span>
        </div>
        <div class="center">可视化大屏</div>
        <div class="right">
            <span class="btn">统计报告</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()
const goHome = () => {
    router.go(-1)
}
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    width: 100%;
    line-height: 40px;
    text-align: center;
    color: #fff;
    .left {
        flex: 1;
        background: url(@/assets/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .btn {
            width: 150px;
            float: right;
            background: url(@/assets/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            font-size: 20px;
            cursor: pointer;
            &:hover {
                color: rgb(53, 120, 207);
            }
        }
    }
    .center {
        flex: 1;
        background: url(@/assets/dataScreen-header-center-bg.png) no-repeat;
        background-size: cover;
        color: #29fcff;
        font-size: 25px;
    }
    .right {
        flex: 1;
        background: url(@/assets/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        .btn {
            width: 150px;
            float: left;
            background: url(@/assets/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            font-size: 20px;
        }
    }
}
</style>