<template>
  <div class='page'>
    <div class='center ma-4' mx-auto>
      <span>Settings</span>
      <v-switch v-model='darkMode' label='Dark Mode'></v-switch>

      <input type="color" v-model="$vuetify.theme.primary" />
      <label for="head">Primary color: {{$vuetify.theme.primary}}</label>
      <br>
      <input type="color" v-model="$vuetify.theme.Secondary" />
      <label for="head">Secondary color: {{$vuetify.theme.secondary}}</label>
      <br>
      <input type="color" v-model="$vuetify.theme.accent" />
      <label for="head">Accent color: {{$vuetify.theme.accent}}</label>
      <br>
      

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';

@Component
export default class SettingsPage extends Vue {
  get darkMode() {
    return store.general.state.darkMode;
  }
  set darkMode(val: boolean) {
    store.general.setDarkMode(val);
  }
}
</script>

<style>
</style>
