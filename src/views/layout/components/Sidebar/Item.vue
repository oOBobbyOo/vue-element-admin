<template>
  <div>
    <svg-icon v-if="icon" :icon-class="icon" />
    <span v-if="title" slot="title">{{title}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Item extends Vue {
  @Prop()
  icon?: string

  @Prop()
  title?: string
}
</script> 

