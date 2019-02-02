<template>
  <div class="page primary-scrollbar px-4" id="add-mod-page">
    <div id="add-mod-page-content">
      <div class="display-2 mb-3 font-weight-medium mt-4">Add mod</div>
      <div class="add-mod-data-grid">
        <div class="title mod-info-title mt-2">Mod name</div>
        <v-text-field :hide-details="true" solo label="Solo textarea" value="Relentless night"/>

        <div class="title mod-info-title mt-2">Mod description</div>
        <v-card>
          <MarkdownInput/>
        </v-card>

        <div class="title mod-info-title mt-2">Images</div>
        <div>
          <ImageDropArea ref="imageDropArea" :images="images"/>
          <v-btn class="ml-0" @click="addImagesClicked">Add images</v-btn>
          <v-btn class="ml-0" @click="images = []">Remove all</v-btn>
        </div>

        <div class="title mod-info-title mt-2">Files</div>
        <div>
          <FileDropArea ref="fileDropArea" class="pa-3" :files="files"/>
          <v-btn class="ml-0" @click="$refs.fileDropArea.openFileDialog()">Add files</v-btn>
          <v-btn class="ml-0" @click="files = []">Remove all</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ImageDropArea from '@/components/general/ImageDropArea.vue';
import FileDropArea from '@/components/general/FileDropArea.vue';
import MarkdownInput from '@/components/general/MarkdownInput.vue';

import * as ModService from '@/networking/ModService';
import store from '@/store';
import { ImageData } from '@/components/general/ImageDropArea.vue';
import { remote } from 'electron';

@Component({ components: { ImageDropArea, MarkdownInput, FileDropArea } })
export default class AddModPage extends Vue {
  name: string = '';
  images: ImageData[] = [];
  files = [];
  description: string = '';
  descriptionCompiled = '';

  @Watch('description')
  descriptionTabChanged(oldVal: string, newVal: string) {
    // Do on next tick to allow markdownRenderer to compile the markdown before calculating height
    Vue.nextTick(() => {
      console.log({ oldVal, newVal });
      if ((this.$refs.descriptionTab as any).$el.style.display === 'none') {
        (this.$refs.descriptionTab as any).$el.style.display = 'block';
        (this.$refs.markdownRenderer as any).resizeFrame();
        (this.$refs.descriptionTab as any).$el.style.display = 'none';
      } else {
        (this.$refs.markdownRenderer as any).resizeFrame();
      }
    });
  }

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
  max-width: 1020px;
  flex-grow: 1;
  margin: 0 auto;
  flex-grow: 1;

  .add-mod-data-grid {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 1fr;
    column-gap: 50px;
    row-gap: 15px;
  }
}
</style>