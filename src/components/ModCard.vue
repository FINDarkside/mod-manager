<template>
  <div class="pr-3">
    <div class="relative">
      <transition name="fade-enter">
          <v-card
            v-if="mod"
            class="mod-card absolute"
            :class="{installed: mod.installed, 'updates-available': $get(mod,'installed.updatesAvailable',false)}"
            :to="'/mods/'+mod.id"
          >
            <div class="flexbox">
              <img width="192" height="108" class="image" :src="imgUrl">
              <div class="mod-card-main-content">
                <div class="mod-card-header nowrap-ellipsis" v-text="mod.name"></div>
                <p class="mod-card-description mb-0" v-text="mod.shortDescription"></p>
              </div>
              <div class="mod-card-secondary-content">
                <div class="flexbox">
                  <v-icon>person</v-icon>
                  <a class="bold nowrap-ellipsis mod-card-author-name" v-text="mod.authorName"></a>
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
            </div>
          </v-card>
      </transition>
      <transition name="fade-leave">
        <div v-if="!mod" :is="modCardPlaceholder" class="absolute"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Mod } from '@/store/modules/mods/types';
import ModCardPlaceholder from '@/components/ModCardPlaceholder.vue';

@Component({ components: { ModCardPlaceholder } })
export default class ModCard extends Vue {
  @Prop(Object)
  public mod!: Mod;

  modCardPlaceholder = ModCardPlaceholder;
  imgUrl!: string;

  @Watch('mod')
  modChanged() {
    this.imgUrl = this.getPicture();
  }

  created() {
    this.imgUrl = this.getPicture();
  }

  getPicture() {
    let n = 0;
    do {
      n = Math.round(Math.random() * 100);
    } while (n === 97 || n === 86);
    return 'https://picsum.photos/192/108/?image=' + n;
  }
}
</script>

<style lang="stylus">
.mod-card {
  height: 108px;
  width: 100%;
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
  width: 130px;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0 15px 15px;

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

.mod-card-author-name {
  margin-top: 1px;
}

</style>
