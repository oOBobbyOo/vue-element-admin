<template>
  <div class="chart-container">
    KeyBoard
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'

@Component({
  name: 'KeyboardChart'
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
