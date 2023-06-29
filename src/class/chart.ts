import * as echarts from 'echarts';
import { EChartsOption, ECharts } from 'echarts';

export default class Chart {
  $el: HTMLElement;
  chartInstance: ECharts;

  constructor(el: HTMLElement) {
    this.$el = el;
    this.chartInstance = echarts.init(this.$el);
  }
  //注册地图
  registerMap(mapName: string, json: any) {
    echarts.registerMap(mapName, json)
  }
  // 绘制图表方法
  render(option: EChartsOption) { 
    this.chartInstance.setOption(option, true);
  }

  // 销毁方法
  destroy() { 
    if (this.chartInstance) {
      this.chartInstance.dispose();
    //   this.chartInstance = null;
      console.log(this.chartInstance);
    }
  }
}