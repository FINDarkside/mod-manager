<template>
    <v-card class="mod-card" :class="{installed: mod.installed, 'updates-available': $get(mod,'installed.updatesAvailable',false)}">
      <div class="flexbox">
        <img width="192" height="108" class="image" src="~@/assets/RN-logo.png">
        <div class="mod-card-main-content">
          <div class="mod-card-header" v-text="mod.name"></div>
          <p class="mod-card-description mb-0" v-text="mod.shortDescription"></p>
        </div>
        <div class="mod-card-secondary-content">
          <div>
              <v-icon>person</v-icon> 
              <a class="bold" onclick="alert('asd')">ShieldHeart</a>
          </div>
          <div class="spacer"></div>
          <div>
              <v-icon>favorite</v-icon> 
              <span v-text="mod.likes"></span>
          </div>
          <div class="spacer"></div>
          <div>
              <v-icon>file_download</v-icon> 
              <span v-text="mod.downloads"></span>
          </div>
        </div>
        <div class="installed-indicator"></div>
      </div >
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mod } from '@/store/modules/mods/types';

@Component
export default class ModCard extends Vue {
  @Prop(Object)
  public mod!: Mod;
}
</script>

<style lang="stylus">
.mod-card {
  height: 108px;
  margin: 0 auto;
  overflow: hidden;

  img {
    flex-shrink: 0;
  }
}

.mod-card-main-content {
  padding: 4px 0px 0px 8px;
  flex-grow: 1;
  overflow: hidden;
}

.mod-card-header {
  font-size: 24px;
  line-height: 1.1em;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  overflow: hidden;
}

.mod-card-description {
  margin-top: 2px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.mod-card-secondary-content {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  margin: 15px 15px;

  i {
    font-size: 18px;
    margin-right: 4px;
  }
}

.installed-indicator {
  flex: 0 0 6px;
  background: transparent;
}

.installed .installed-indicator {
  background: #27ae60;
}

.updates-available .installed-indicator {
  background: #dc8b41;
}
</style>
