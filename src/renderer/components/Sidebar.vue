<template>
  <div id='sidebar'>
    <div class='userContainer' >
      <a v-on:click="$store.dispatch('showLoginPage');" class='userImage-link'>
        <img class='userImage' src='~@/assets/icon.png'>
      </a>
      <span class='currentUserName'>FINDarkside</span>
    </div>
    <template v-for='route in routes'>
      <template v-if='route.showInSidebar'>
          <SidebarItem :title='route.title' :path='route.path' :key='route.title'></SidebarItem>
      </template>
    </template>
  </div>
</template>

<script>
import SidebarItem from "./Sidebar/SidebarItem";

export default {
  components: { SidebarItem },
  props: {
    routes: { type: Array, required: true }
  }
};
</script>

<style lang='scss'>
#sidebar {
  width: 270px;
  min-height: 100vh;
  background-color: $sidebarBackgroundColor;
  color: white;
}

.userImage {
  width: 100%;
  height: 100%
}

.userImage-link{
  display: block;
  margin: 0px auto;
  border-radius: 100%;
  width: 127px;
  height: 127px;
  overflow: hidden;
}

.userContainer {
  text-align: center;
  margin: 10px 0 20px 0;
}

.currentUserName {
  font-size: 1.5em;
  font-weight: 500;
}
</style>