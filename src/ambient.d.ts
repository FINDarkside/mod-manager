import Vue from 'vue';
import { VuetifyObject } from 'vuetify';

declare module 'vue/types/vue' {
  interface Vue {
    $vuetify: VuetifyObject;
  }
}
