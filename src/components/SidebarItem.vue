<template>
  <router-link class='sidebar-item' v-bind:class='{ active: active }' :to='path' >
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
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
  widows: 100%;
}

.sidebar-item:hover {
  background-color: var(--sidebar-background-selected);
}

.sidebar-item.active {
  background-color: var(--sidebar-background-selected);
}
</style>