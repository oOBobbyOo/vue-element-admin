<template>
  <div ref="raddarChart" :class="className" :style="{width:width, height:height}" />
</template>

<script lang="ts">
import echarts from 'echarts'
import 'echarts/theme/macarons'

import { debounce } from '@/utils'

import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'

@Component({
  name: 'RaddarChart'
})
export default class RaddarChart extends Vue {
  $refs!: {
    raddarChart: HTMLCanvasElement
  }

  @Prop({ default: 'chart' })
  className!: string

  @Prop({ default: '100%' })
  width!: string

  @Prop({ default: '300px' })
  height!: string

  @Prop({ default: 3000 })
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
      radar: {
        radius: '66%',
        center: ['50%', '42%'],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: 'rgba(127,95,132,.3)',
            opacity: 1,
            shadowBlur: 45,
            shadowColor: 'rgba(0,0,0,.5)',
            shadowOffsetX: 0,
            shadowOffsetY: 15
          }
        },
        indicator: [
          { name: 'Sales', max: 10000 },
          { name: 'Administration', max: 20000 },
          { name: 'Information Techology', max: 20000 },
          { name: 'Customer Support', max: 20000 },
          { name: 'Development', max: 20000 },
          { name: 'Marketing', max: 20000 }
        ]
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
      },
      series: [
        {
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: 'Allocated Budget'
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: 'Expected Spending'
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: 'Actual Spending'
            }
          ],
          animationDuration: this.animationDuration
        }
      ]
    })
  }

  private initChart(): void {
    this.chart = echarts.init(this.$refs.raddarChart, 'macarons')
    this.setOptions()
  }
}
</script>
