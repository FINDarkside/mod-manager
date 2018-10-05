<template>
  <div id="sidebar">
    <div class="userContainer" v-if="!!$store.state.user.userData">
      <a class="userImage-link">
        <img class="userImage" src="~@/assets/logo.png">
      </a>
      <span class="currentUserName">{{this.$store.state.user.userData.username}}</span>
    </div>
    <div class="userContainer" v-else>
      <a v-on:click="generalState.showLoginPage()" class="userImage-link">
        <v-icon left class="userImage">person</v-icon>
      </a>
      <span class="currentUserName">Guest</span>
    </div>
    <template v-for="route in routes">
      <template v-if="route.meta.showInSidebar">
          <SidebarItem :title="route.meta.title" :path="route.path" :key="route.meta.title"></SidebarItem>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import SidebarItem from '@/components/SidebarItem.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

import user from '@/store/user';
import general from '@/store/general';

const namespace: string = 'user';

@Component({
  components: { SidebarItem },
})
export default class Sidebar extends Vue {
  @Prop(Array)
  routes!: object[];

  generalState = general;

  mounted() {
  }
}
</script>

<style lang='stylus'>
#sidebar {
  width: 270px;
  min-height: 100vh;
  background-color: var(--sidebar-background-color);
  color: white;
  flex-shrink: 0;
}

.userImage {
  width: 100%;
  height: 100%;
}

i.userImage {
  font-size: 90px;
  color: rgba(0, 0, 0, 0.4) !important;
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