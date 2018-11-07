<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { Route, RouteRecord } from 'vue-router'

@Component({
  name: 'Breadcrumb'
})
export default class Breadcrumb extends Vue {
  @Provide()
  levelList: any = null

  @Watch('$route')
  onRouteChanged(val: Route, oldVal: Route) {
    this.getBreadcrumb()
  }

  created() {
    this.getBreadcrumb()
  }

  private getBreadcrumb() {
    const { params } = this.$route

    let matched: any[] = this.$route.matched.filter(item => {
      if (item.name) {
        return true
      }
    })

    if (matched[0] && matched[0].name !== 'Dashboard') {
      matched = [
        {
          path: '/dashboard',
          meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
        }
      ].concat(matched)
    }

    this.levelList = matched
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>