<template>
  <div class="icons-container">
    <aside class="warn-content">
      Add and use
    </aside>
    <div class="icons-wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="Svg Icons">
          <div
            class="icons-item"
            v-for="item of svgIcons"
            :key="item"
            @click.prevent="handleClipboard(generateSvgIconCode(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateSvgIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Element-UI Icons">
          <div
            class="icons-item"
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item), $event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
import clipboard from '@/utils/clipboard'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Icons'
})
export default class Icons extends Vue {
  private svgIcons = svgIcons
  private elementIcons = elementIcons

  private generateSvgIconCode(symbol: string) {
    return `<svg-icon icon-class="${symbol}" />`
  }

  private generateElementIconCode(symbol: string) {
    return `<i class="el-icon-${symbol}" />`
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
  padding: 20px;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
    .icons-item {
      .icon-item {
        float: left;
        width: 100px;
        height: 80px;
        margin: 20px;
        text-align: center;
        font-size: 30px;
        color: #24292e;
        cursor: pointer;
      }
      span {
        display: block;
        font-size: 16px;
        margin-top: 10px;
      }
      .disabled {
        pointer-events: none;
      }
    }
  }
}
</style>