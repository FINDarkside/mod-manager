<template>
  <div id='sidebar'>
    <div class='userContainer' v-if="!!$store.state.user.loggedIn">
      <a class='userImage-link'>
        <img class='userImage' src='~@/assets/icon.png'>
      </a>
      <span class='currentUserName'>{{this.$store.state.user.username}}</span>
    </div>
    <div class='userContainer' v-else>
      <a v-on:click="$store.dispatch('showLoginPage');" class='userImage-link'>
        <v-icon left class="userImage">person</v-icon>
      </a>
      <span class='currentUserName'>Guest</span>
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
  background-color: var(--sidebar-background-color);
  color: white;
}

.userImage {
  width: 100%;
  height: 100%;
}

i.userImage{
  font-size: 90px;
  color: rgba(0,0,0,0.4)!important;
}

.userImage-link {
  display: block;
  margin: 0px auto;
  border-radius: 100%;
  width: 127px;
  height: 127px;
  overflow: hidden;
  background-color: #555;
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