<template>
  <div ref="barChart" :class="className" :style="{width:width, height:height}" />
</template>

<script lang="ts">
import echarts from 'echarts'
import 'echarts/theme/macarons'

import { debounce } from '@/utils'

import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'

@Component({
  name: 'BarChart'
})
export default class BarChart extends Vue {
  $refs!: {
    barChart: HTMLCanvasElement
  }

  @Prop({ default: 'chart' })
  className!: string

  @Prop({ default: '100%' })
  width!: string

  @Prop({ default: '300px' })
  height!: string

  @Prop({ default: 6000 })
  animationDuration!: number

  @Provide()
  chart: any = null

  @Provide()
  resizeHandler: any = null

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })

    this.resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.resizeHandler)
  }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.resizeHandler)
    this.chart.dispose()
    this.chart = null
  }

  private setOptions(): void {
    this.chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration: this.animationDuration
        },
        {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration: this.animationDuration
        },
        {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration: this.animationDuration
        }
      ]
    })
  }

  private initChart(): void {
    this.chart = echarts.init(this.$refs.barChart, 'macarons')
    this.setOptions()
  }
}
</script>
