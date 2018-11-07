<template>
  <div ref="pieChart" :class="className" :style="{width:width, height:height}" />
</template>

<script lang="ts">
import echarts from 'echarts'
import 'echarts/theme/macarons'

import { debounce } from '@/utils'

import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'

@Component({
  name: 'PieChart'
})
export default class PieChart extends Vue {
  $refs!: {
    pieChart: HTMLCanvasElement
  }

  @Prop({ default: 'chart' })
  className!: string

  @Prop({ default: '100%' })
  width!: string

  @Prop({ default: '300px' })
  height!: string

  @Prop({ default: 2600 })
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
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
      },
      calculable: true,
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: 'Industries' },
            { value: 240, name: 'Technology' },
            { value: 149, name: 'Forex' },
            { value: 100, name: 'Gold' },
            { value: 59, name: 'Forecasts' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: this.animationDuration
        }
      ]
    })
  }

  private initChart(): void {
    this.chart = echarts.init(this.$refs.pieChart, 'macarons')
    this.setOptions()
  }
}
</script>
