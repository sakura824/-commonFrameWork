<template>
    <div class="name">当前在线人数：</div>
    <div class="title">
        <span v-for="(item, index) in String(people)" :key="index">{{ item }}</span>
    </div>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import Chart from '@/class/chart.ts'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { EChartsOption } from 'echarts';
import { store } from "@/store"
const wssStore = store.useWssStore()
const people = ref(0)
const chartRef = ref<HTMLElement>()
const options = ref<EChartsOption>({
    xAxis: {
       type: 'category',
       axisLine: {
        lineStyle: {
            color: 'rgb(255,255,255)'
        }
       },
       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
            color: 'rgb(255,255,255)'
        }
       },
    },
    series: [
        {
            data: [0,0,0,0,0,0,0],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ]
})
let chart: Chart
//创建图标实例
onMounted(() => {
    chart = new Chart(chartRef.value!)
    chart.render(options.value)
})
watchEffect(() => {
    people.value = wssStore.message
    options.value.series[0].data = wssStore.peopleMsg
    if(chart) {
        chart.render(options.value)
    }
    
})
// 在组件卸载前销毁图表实例
onUnmounted(() => {
    chart.destroy(); 
});
</script>

<style lang="scss" scoped>
.name {
    font-size: 10px;
    color: #fff;
    padding: 10px 20px 0 20px;
}
.title {
    display: flex;
    font-size: 10px;
    color: #fff;
    padding: 20px 20px 0 20px;
    span {
            flex: 1;
            width: 10px;
            line-height: 20px;
            text-align: center;
            background: url(@/assets/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
        }
}
.chart {
    height: 30vh;
}
</style>