<template>
  <div class="page primary-scrollbar px-4" id="add-mod-page">
    <div id="add-mod-page-content">
      <div class="display-2 mb-3 font-weight-medium mt-4">Add mod</div>
      <div class="add-mod-data-grid">
        <div class="title mod-info-title mt-2">Mod name</div>
        <v-textarea
          :auto-grow="true"
          solo
          label="Solo textarea"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>

        <div class="title mod-info-title mt-2">Mod description</div>
        <v-text-field solo label="Solo textarea" value="Relentless night"/>

        <div class="title mod-info-title mt-2">Images</div>
        <div>
          <ImageDropArea ref="imageDropArea" :images="images"/>
          <v-btn class="ml-0" @click="addImagesClicked">Add images</v-btn>
          <v-btn class="ml-0" @click="images = []">Remove all</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ImageDropArea from '@/components/general/ImageDropArea.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as ModService from '@/networking/ModService';
import store from '@/store';
import { ImageData } from '@/components/general/ImageDropArea.vue';
import { remote } from 'electron';

@Component({ components: { ImageDropArea } })
export default class AddModPage extends Vue {
  name: string = '';
  images: ImageData[] = [];

  addImagesClicked() {
    remote.dialog.showOpenDialog(
      {
        title: 'Select images',
        filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }],
        properties: ['openFile', 'multiSelections'],
      },
      files => {
        files.forEach(f => (this as any).$refs.imageDropArea.addImage(f));
      }
    );
  }
}
</script>

<style lang="stylus">
#add-mod-page-content {
  max-width: 900px;
  flex-grow: 1;
  margin: 0 auto;
  flex-grow: 1;

  .add-mod-data-grid {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 1fr;
    column-gap: 50px;
  }
}
</style>