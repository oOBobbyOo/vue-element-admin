<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <nav-bar />
      <tags-view />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter, Mutation } from 'vuex-class'
import { NavBar, Sidebar, AppMain, TagsView } from '@/views/layout/components'

@Component({
  components: {
    NavBar,
    Sidebar,
    AppMain,
    TagsView
  }
})
export default class Layout extends Vue {
  // computed
  get sidebar() {
    return this.$store.state.app.sidebar
  }

  get device() {
    return this.$store.state.app.device
  }

  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === 'mobile'
    }
  }

  // private created() {}
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>




