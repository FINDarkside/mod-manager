<template>
  <router-link class='sidebar-item' v-bind:class='{ active: active }' :to='path' >
    {{title}}
  </router-link>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    title: { type: String, required: true },
    path: { type: String, required: true }
  },
  computed: {
    active() {
      return this.$route.fullPath === this.path;
    }
  }
};
</script>

<style lang='scss'>
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