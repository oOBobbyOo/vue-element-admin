<template>
  <div class="navbar">
    <hamburger :toggle-click="sideBar" :is-active="sidebar.opened" class="hamburger-container" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="Screenfull" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>dashboard</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script lang="ts">
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'

import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'
import { SidebarState } from '@/store/modules/app/types'
const namespace: string = 'app'

@Component({
  name: 'NavBar',
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull
  }
})
export default class NavBar extends Vue {
  @Provide()
  avatar: string = ''

  @State(state => state.user)
  user: any

  @Getter('sidebar', { namespace })
  sidebar!: SidebarState

  @Getter('device', { namespace })
  device!: string

  @Action('toggleSideBar', { namespace })
  toggleSideBar!: any

  created(): void {
    this.avatar = this.user.avatar
  }

  private sideBar() {
    this.toggleSideBar()
  }
}
</script>


<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

