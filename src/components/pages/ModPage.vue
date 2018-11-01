<template>
  <div class='page primary-scrollbar' id="mod-page">
    <div class="mod-page-grid">
      <div class="display-2 mb-2 font-weight-medium mx-auto mt-4 mb-2">Relentless Night</div>
      <div/>
      <div class="mx-4">
        <v-carousel class="mod-images-carousel mx-auto" height="324" :cycle="false" >
          <v-carousel-item src="https://picsum.photos/576/324/?image=2" key="2"/>
          <v-carousel-item src="https://picsum.photos/1920/1080/?image=3" key="3"/>
          <v-carousel-item src="https://picsum.photos/576/324/?image=4" key="4"/>
          <v-carousel-item src="https://picsum.photos/192/108/?image=1" key="1"/>
        </v-carousel>
        <v-expansion-panel class="mr-4">
          <v-expansion-panel-content value="0">
            <div slot="header">
              <div class="flexbox vertical-align">
                <v-icon>description</v-icon><span class="ml-3">Description</span>
              </div>
            </div>
            <v-card>
              <v-card-text>
                The earth seems to be slowing. Days and nights are getting longer. Every long night gets colder and harsher than the last. How long will you survive?
                The Relentless Night mod is completely fan-made, I have no affiliation with Hinterland Studios.- DO NOT report bugs within the modded game to Hinterland Studios, it's possible bugs may be due to the mod code, please go to the Relentless Night Discord server to get help for any bugs you encounter.- The mod is experimental; There is no guarantee it wont corrupt any game saves, although a bug corrupting saves is extremely unlikely.
              </v-card-text>
            </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
      <div class="mr-4">
        <v-card class="mod-info-card mb-3">
          <div class="primary-spacer-3"/>
          <div class="pa-3">
            <div class="info-title">Author</div>
            <div class="info-data">ShieldHeart</div>
            <div class="info-title">Version</div>
            <div class="info-data">1.2.1</div>
            <div class="info-title">Supported game version</div>
            <div class="info-data">1.3.0</div>
            <div class="info-title">Downloads</div>
            <div class="info-data">12 301</div>
            <div class="info-title">Likes</div>
            <div class="info-data">6 423</div>
            <div class="info-title">Date added</div>
            <div class="info-data">2.1.2018</div>
            <div class="info-title">Last updated</div>
            <div class="info-data">28.10.2018</div>
            <v-btn flat color="error">Report</v-btn>
          </div>
          <v-btn depressed large color="primary" class="install-button">Install</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';

@Component
export default class ModPage extends Vue {
  @Prop(String)
  modID!: string;
}
</script>

<style lang="stylus">
.mod-page-grid {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 250px;
  flex-grow: 1;
}

.mod-info-card {
  .info-title {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 300;
  }

  .info-data {
    font-size: 16px;
    margin-bottom: 6px;
    font-weight: 500;
  }

  .install-button {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}

// Carousel tweaks
.mod-images-carousel.v-carousel {
  width: 576px !important;
  height: 324px !important;
  box-shadow: none;
  overflow: visible;
  margin-bottom: 50px;
}

.mod-images-carousel {
  .v-carousel__controls {
    position: absolute;
    bottom: -40px;
    background: none;

    .v-btn .v-icon {
      transition: color 0s !important;
    }

    .v-btn:before {
      content: none;
    }

    .v-btn--active {
      color: var(--primary-color) !important;
    }

    .v-carousel__controls__item .v-icon {
      opacity: 1;
    }
  }

  .v-window__container {
    overflow: hidden;
  }
}

.theme--light .mod-images-carousel .v-carousel__controls {
  .v-btn {
    color: rgba(0, 0, 0, 0.3);
  }
}
</style>