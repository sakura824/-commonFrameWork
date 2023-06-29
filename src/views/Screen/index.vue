<template>
    <div class="container">
        <div class="screen">
            <Top></Top>
            <div class="bottom">
                <div class="left">
                    <peoplePie v-for="i in 2"></peoplePie>
                </div>
                <div class="center">
                    <Map></Map>
                </div>
                <div class="right">
                    <peoplePie v-for="i in 2"></peoplePie>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Top from './components/top.vue'
import peoplePie from '@/views/Screen/components/peoplePie.vue'
import Map from '@/views/Screen/components/map/index.vue'
import { initSocket } from '@/socket';
import { onMounted } from 'vue';
onMounted(() => {
    initSocket(111)
})
</script>

<style lang='scss' scoped>
.container {
    width: 100vw;
    height: 100vh;
    background: url(@/assets/bg.png) no-repeat;
    background-size: cover;
    .screen {
        position: fixed;
        width: 100%;
        height: 100%;
        // left: 50%;
        // top: 50%;
        // transform-origin: left top;
        .bottom {
            display: flex;
            // width: 100vw;
            // height: 100vh;
            .left {
                flex: 1;
            }
            .center {
                flex: 1.5;
            }
            .right {
                flex: 1;
            }
        }
    }
}
</style>