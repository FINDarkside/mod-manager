<template>
  <div class="page primary-scrollbar" id="mod-page">
    <div class="mod-page-grid">
      <div class="display-2 mb-2 font-weight-medium mx-auto mt-4 mb-2">Relentless Night</div>
      <div/>
      <div class="mx-4 pb-4">
        <v-carousel class="mod-images-carousel mx-auto" height="324" :cycle="false">
          <v-carousel-item src="https://picsum.photos/576/324/?image=2" key="2"/>
          <v-carousel-item src="https://picsum.photos/1920/1080/?image=3" key="3"/>
          <v-carousel-item src="https://picsum.photos/576/324/?image=4" key="4"/>
          <v-carousel-item src="https://picsum.photos/192/108/?image=1" key="1"/>
        </v-carousel>
        <v-expansion-panel class="mr-4" expand :value="expandState">
          <v-expansion-panel-content>
            <div slot="header">
              <div class="flexbox vertical-align">
                <v-icon>description</v-icon>
                <span class="ml-3">Description</span>
              </div>
            </div>
            <v-card class="pa-3">
              <MarkdownRenderer class="fullwidth" :markdown="mod.description"/>
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
            <v-btn flat color="error" class="ml-0">Report</v-btn>
          </div>
          <v-btn depressed large color="primary" class="install-button">Install</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MarkdownRenderer from '@/components/general/MarkdownRenderer.vue';
import store from '@/store';

@Component({ components: { MarkdownRenderer } })
export default class ModPage extends Vue {
  @Prop(String)
  modID!: string;

  mod = {
    description: "# Relentless Night\n\n**DISCLAIMER**\n\nThe Relentless Night mod is completely fan-made, I have no affiliation with Hinterland Studios.- DO NOT report bugs within the modded game to Hinterland Studios, it's possible bugs may be due to the mod code, please go to the [Relentless Night Discord server](https://discord.gg/9ndTkCF) to get help for any bugs you encounter.- The mod is experimental; There is no guarantee it wont corrupt any game saves, although a bug corrupting saves is extremely unlikely.\n\n\n## NEW V3.01 CHANGES\n* Updated all mod features to work with new Vigilant Flame update.\n* Coals can now be added to a fire without a waiting period (late-game balancing).\n* More fuel can be added to a fire even if the fire has reached its maximum duration, provided that the fuel can still increase the fire's current temperature. Although the duration of fire will not increase further, the heat bonus will still be applied. (late-game balancing)\n* The immediate area where an outdoor fire burned will also retain some heat a while longer after the fire's out, although of course the temperature bonus will drop and disappear much quicker compared to the heat from a fire inside an insulated building.\n* Fixed mod bug where failing to start a fire indoors could reset the residual heat bonus remaining inside back to zero in RN's heat retention feature.\n* Fixed mod bug where blizzard temperature drop didn't change temperature during blizzards in certain Relentless Night runs.\n* Fixed mod bug where the temperature of outdoors caves would sometimes get calculated incorrectly and were warmer than intended.\n* Fixed mod bug where custom mode option \"Day Length Multiplier\" would cause timing issues in RN runs if it was set above 1x. All values of this option can now be chosen for RN runs as well.\n* Should you need to correct something in the RN settings later into your game, you can now change specific setting values through new console commands. Loading the save you want to change and entering \"rn_help\" into the console will provide information on all RN commands needed to change each setting."
  };

  expandState = [true];
}
</script>

<style lang="stylus">
.mod-page-grid {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 250px;
  flex-grow: 1;
}

#mod-page .mod-info-card {
  position: sticky;
  top: 10px;

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