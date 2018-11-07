<template>
  <div class="icons-container">
    <p class="warn-content">
      <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </p>
    <div class="icons-wrapper">
      <div class="icons-item" v-for="item of iconsMap" :key="item" @click.prevent="handleClipboard(generateIconCode(item),$event)">
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(item) }}
          </div>
          <div class="icon-item">
            <svg-icon :icon-class="item" class-name="disabled" />
            <span>{{ item }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import icons from './requireIcons'
import clipboard from '@/utils/clipboard'

import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class SvgIcons extends Vue {
  private iconsMap = icons

  private generateIconCode(symbol: any) {
    return `<svg-icon icon-class="${symbol}" />`
  }

  private handleClipboard(text: string, event: any) {
    this.$nextTick(() => {
      clipboard(text, event)
    })
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icons-item {
    .icon-item {
      margin: 20px;
      height: 110px;
      text-align: center;
      width: 110px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }
    span {
      display: block;
      font-size: 24px;
      margin-top: 10px;
    }
    .disabled {
      pointer-events: none;
    }
  }
}
</style>