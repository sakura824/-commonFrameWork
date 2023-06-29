<template>
    <div ref="chartRef" class="chart"></div>
</template>

<script setup lang="ts">
import Chart from '@/class/chart.ts'
import { onMounted, onUnmounted, ref } from 'vue'
import chinaJSON from './china.json'
const chartRef = ref<HTMLElement>()
const options = ref({
    //地图组件
    geo: {
            map: 'china',//中国地图
            roam: true,//鼠标缩放的效果
            //地图的位置调试
            left: 150,
            top: 150,
            right: 150,
            zoom:1.2,
            bottom: 0,
            //地图上的文字的设置
            label: {
                show: true,//文字显示出来
                color: 'white',
                fontSize: 10
            },

            itemStyle: {
                //每一个多边形的样式
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#9cbbd4' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#187fd3' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                opacity: .8
            },
            //地图高亮的效果
            emphasis: {
                itemStyle: {
                    color: '#187fd3'
                },
                label: {
                    fontSize: 20
                }
            }
        },
        //布局位置
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        series: [
            {
                type: 'lines',//航线的系列
                data: [
                    {
                        coords: [
                            [116.405285, 39.904989],  // 起点
                            [119.306239, 26.075302]   // 终点

                        ],
                        // 统一的样式设置
                        lineStyle: {
                            color: '#a54485',
                            width: 2,
                            type: 'dashed'
                        }
                    },
                ],
                //开启动画特效
                effect: {
                    show: true, 
                    symbol: 'pin',  //图标现状，可以自定义url
                    color: 'black', 
                    symbolSize: 10, //图标大小
                    roundTrip: true //图标是否往返
                }
            }
        ]
})
let chart: Chart
//创建图标实例
onMounted(() => {
    chart = new Chart(chartRef.value!)
    chart.registerMap('china', chinaJSON)
    chart.render(options.value)
})
// 在组件卸载前销毁图表实例
onUnmounted(() => {
    chart.destroy(); 
});
</script>

<style lang="scss" scoped>
.chart {
    width: 100vh;
    height: 100vh;
}
</style>