<template>
  <router-link :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Link extends Vue {
  @Prop()
  to!: string
}
</script> 




