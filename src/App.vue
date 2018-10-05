<template>
  <v-app id="app" :dark="$store.state.general.darkMode"> 
    <div id="mainWindow"> 
      <Sidebar :routes="routes"></Sidebar>
      <router-view></router-view>
    </div>
    <transition name="fade">
      <LoginPage v-if='$store.state.general.loginScreenVisible'></LoginPage>
    </transition>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import routes from '@/router/routes';

import style from '@/style/index.styl';

export default {
  name: 'App',
  components: {
    Sidebar,
    LoginPage,
  },
  data() {
    return {
      routes: routes,
    };
  },
};
</script>

<style>
#app {
  height: 100vh;
  overflow: hidden;
}

#mainWindow {
  display: flex;
}

.page {
  height: 100vh;
  flex-grow: 1;
  overflow: hidden;
}

.fade-enter-active {
  transition: opacity 0.1s, transform 0.3s;
}

.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1, 1.1);
}
</style>
