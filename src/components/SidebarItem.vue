<template>
  <router-link class='sidebar-item color' :class='{ active: active, "primary-bg": active }' :to='path' >
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

</style>