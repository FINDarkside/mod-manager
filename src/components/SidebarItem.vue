<template>
  <router-link class='sidebar-item' :class='{ active: active }' :to='path' >
    {{title}}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Sidebar extends Vue {
  // TODO: Fix requiring exclamation mark?
  @Prop(String)
  public path!: string;
  @Prop(String)
  public title!: string;

  get active() {
    return this.$route.fullPath === this.path;
  }
}
</script>

<style>
.sidebar-item {
  text-decoration: none;
  display: block;
  padding: 10px;
  widows: 100%;
}

.sidebar-item.active,
.sidebar-item:hover {
  background-color: var(--sidebar-selected-background-color);
  color: var(--sidebar-selected-color)!important;
}
</style>