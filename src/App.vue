<template>
  <v-app id="app" :dark="$store.state.general.darkMode" :style="cssProps"> 
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
  computed: {
    cssProps() {
      return {
        '--primary-color': this.$vuetify.theme.primary,
        '--secondary-color': this.$vuetify.theme.secondary,
        '--accent-color': this.$vuetify.theme.accent,
        '--error-color': this.$vuetify.theme.error,
        '--info-color': this.$vuetify.theme.info,
        '--success-color': this.$vuetify.theme.success,
        '--warning-color': this.$vuetify.theme.warning,
      };
    },
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
  display: flex;
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
