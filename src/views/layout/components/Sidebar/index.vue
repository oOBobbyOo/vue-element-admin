<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>


<script lang="ts">
import SidebarItem from './SidebarItem.vue'

import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'
import { SidebarState } from '@/store/modules/app/types'
const namespace: string = 'app'

@Component({
  name: 'Sidebar',
  components: {
    SidebarItem
  }
})
export default class Sidebar extends Vue {
  @Getter('sidebar', { namespace })
  sidebar!: SidebarState

  @State(state => state.permission)
  permission: any

  get isCollapse() {
    return !this.sidebar.opened
  }

  get permission_routers() {
    return this.permission.routers
  }

  created() {
    console.log('====================================')
    console.log(this.permission.routers)
    console.log('====================================')
  }
}
</script>