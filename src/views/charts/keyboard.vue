<template>
  <div class="chart-container">
    <keyboard-chart width="100%" height="100%" />
  </div>
</template>

<script lang="ts">
import KeyboardChart from '@/components/Charts/KeyboardChart.vue'

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Keyboard',
  components: {
    KeyboardChart
  }
})
export default class KeyBoard extends Vue {}
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
