declare module 'vue-count-to' {
  import { VueConstructor } from 'vue'

  export interface VueCountToProps {
    startVal?: number
    endVal?: number
    duration?: number
    autoplay?: boolean
    decimal?: number
    decima?: string
    separator?: string
    prefix?: string
    suffix?: string
    useEasing?: boolean
    easingFn?: Function
  }

  export interface VueCountToData {
    localStartVal: number
    displayValue: number
    printVal: any
    paused: boolean
    localDuration: number
    startTime: any
    timestamp: any
    remaining: any
    rAF: any
  }

  export interface VueCountToWatch {
    startVal: () => void
    endVal: () => void
  }

  export interface VueCountToMethods {
    start: () => void
    pauseResume: () => void
    pause: () => void
    resume: () => void
    reset: () => void
    count: (option: any) => void
    isNumber: (option: any) => boolean
    formatNumber: (option: any) => number
  }

  export interface VueCountToComputed {
    countDown: () => boolean
  }

  export interface VueCountToConstructor extends VueConstructor {
    props: VueCountToProps
    data: () => VueCountToData
    watch: VueCountToWatch
    methods: VueCountToMethods
    computed: VueCountToComputed
  }

  export const VueCountTo: VueCountToConstructor
  export type OptionConsumer = (option: any) => void
  export default VueCountTo
}
