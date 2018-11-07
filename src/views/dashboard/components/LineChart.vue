<template>
  <div ref="lineChart" :class="className" :style="{width:width, height:height}" />
</template>

<script lang="ts">
import echarts from 'echarts'
import 'echarts/theme/macarons'
import { debounce } from '@/utils'

import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'

interface ChartData {
  [key: string]: any
}

@Component({
  name: 'LineChart'
})
export default class LineChart extends Vue {
  $refs!: {
    lineChart: HTMLCanvasElement
  }

  @Prop({ default: 'chart' })
  className!: string

  @Prop({ default: '100%' })
  width!: string

  @Prop({ default: '350px' })
  height!: string

  @Prop(Object)
  chartData!: ChartData

  @Prop({ default: true })
  autoResize!: boolean

  @Provide()
  chart: any = null

  @Provide()
  resizeHandler: any = null

  @Provide()
  sidebarElm: any = null

  @Watch('chartData', { deep: true })
  onchartDataChanged(val: ChartData) {
    const { expectedData, actualData } = val
    this.setOptions({ expectedData, actualData })
    this.$forceUpdate()
  }

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

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        'transitionend',
        this.sidebarResizeHandler
      )
  }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.resizeHandler)
    }

    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        'transitionend',
        this.sidebarResizeHandler
      )

    this.chart.dispose()
    this.chart = null
  }

  private sidebarResizeHandler(e: any) {
    if (e.propertyName === 'width') {
      this.resizeHandler()
    }
  }

  private setOptions({ expectedData, actualData }: ChartData): void {
    this.chart.setOption({
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding: [5, 10]
      },
      yAxis: {
        axisTick: {
          show: false
        }
      },
      legend: {
        data: ['expected', 'actual']
      },
      series: [
        {
          name: 'expected',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
    })
  }

  private initChart(): void {
    this.chart = echarts.init(this.$refs.lineChart, 'macarons')

    const { expectedData, actualData } = this.chartData
    this.setOptions({ expectedData, actualData })
  }
}
</script>





