<template>
  <v-app id='app' :dark="$store.state.settings.darkMode"> 
    <div id='mainWindow' > 
      <Sidebar :routes='routes'></Sidebar>
      <router-view></router-view>
    </div>
    <transition name='fade'>
      <LoginPage v-if='$store.state.loginPage.visible'></LoginPage>
    </transition>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/Pages/LoginPage";

import routes from "./router/routes";

export default {
  name: "TLD-Mod-Manager",
  components: { Sidebar, LoginPage },
  data() {
    return {
      routes: routes
    };
  }
};
</script>

<style >
@import url("~@/assets/MaterialIcons/MaterialIcons.css");
@import url("main_theme.scss");
@import url("globals.css");


@font-face {
  font-family: "Roboto";
  src: url("~@/assets/Roboto/Roboto-Regular.woff2");
}

@font-face {
  font-family: "Roboto";
  font-weight: bold;
  src: url("~@/assets/Roboto/Roboto-Bold.woff2");
}

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

