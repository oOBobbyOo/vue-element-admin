<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-if="!child.hidden" v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0" :is-nest="true" :item="child" :key="child.path" :base-path="resolvePath(child.path)" class="nest-menu" />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script lang="ts">
import { isExternal } from '@/utils'

import AppLink from './Link.vue'
import Item from './Item.vue'

import { Component, Vue, Prop, Provide } from 'vue-property-decorator'

@Component({
  name: 'SidebarItem',
  components: {
    AppLink,
    Item
  }
})
export default class SidebarItem extends Vue {
  @Prop()
  item!: object

  @Prop()
  isNest?: boolean

  @Prop()
  basePath!: string

  @Provide()
  onlyOneChild: any = null

  private hasOneShowingChild(children: any, parent: any) {
    const showingChildren = children.filter((item: any) => {
      if (item.hidden) {
        return false
      } else {
        this.onlyOneChild = item
        return true
      }
    })

    if (showingChildren.length === 1) {
      return true
    }

    if (showingChildren.length === 0) {
      this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  private resolvePath(routePath: string) {
    if (this.isExternalLink(routePath)) {
      return routePath
    }
    return this.basePath + '/' + routePath
  }

  private isExternalLink(routePath: string) {
    return isExternal(routePath)
  }
}
</script>