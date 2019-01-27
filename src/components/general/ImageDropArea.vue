<template>
  <v-card
    class="image-drop-area"
    dragenter="console.log('asd')"
    v-on:drop="dropHandler"
    v-on:dragstart="dragStart"
    v-on:dragend="dragEnd"
    v-on:dragenter="dragEnter"
    v-on:dragover="dragOver"
    v-on:dragleave="dragLeave"
  >
    <draggable
      v-if="images.length !== 0"
      v-model="images"
      @start="drag=true"
      @end="drag=false"
      :options="{sort: true, animation: 300, easing: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        filter:'.image-remove-btn', ghostClass: 'sortable-ghost' }"
      key="draggable"
      class="sortable-container"
    >
      <v-card class="sortable-item" v-for="image in images" :key="image.id">
        <v-icon class="image-remove-btn" color="red" @click="removeImage(image.id)">remove_circle</v-icon>
        <img :src="image.url">
      </v-card>
    </draggable>
    <div v-else class="empty-image-area-text" :class="{'drag-over': isDragOver}">
      <v-icon color="primary" size="124">photo</v-icon>
      <span class="display-1 font-weight-light">Drag & Drop Images</span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as ModService from '@/networking/ModService';
import store from '@/store';

@Component
export default class ImageDropArea extends Vue {
  @Prop(Array)
  images!: ImageData[];

  isDragOver = false;
  idCounter = 0;

  addImage(img: string) {}

  print() {
    console.log(this.images[0]);
  }

  removeImage(id: string) {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].id === id) {
        this.images.splice(i, 1);
        break;
      }
    }
  }

  async dropHandler(evt: any) {
    console.log(evt.dataTransfer.files);
    for (const file of evt.dataTransfer.files) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') continue;
      const dataUrl = await new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
          resolve(fr.result as string);
        };
        fr.readAsDataURL(file);
      });
      this.images.push({ id: '' + this.idCounter++, url: dataUrl as string, local: true });
    }

    this.isDragOver = false;
  }

  dragStart(evt: Event) {
    console.log(evt);
  }

  dragEnd(evt: Event) {
    this.isDragOver = false;
  }

  dragEnter(evt: Event) {
    this.isDragOver = true;
    evt.preventDefault();
  }

  dragLeave(evet: Event) {
    this.isDragOver = false;
  }

  dragOver(evt: Event) {
    evt.preventDefault();
  }
}

export interface ImageData {
  id: string;
  local: boolean;
  url: string;
}
</script>

<style lang="stylus">
.image-drop-area {
  min-height: 150px;
  display: flex !important;
  flex-direction: row;
}

.image-drop-empty-message {
}

.sortable-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 5px;
}

.sortable-item {
  height: 108px;
  width: 192px;
  margin: 10px 5px;
  background: rgba(165, 165, 165, 0.3);

  :hover {
  }
}

.sortable-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image-remove-btn {
  position: absolute;
  right: -10px;
  top: -10px;
  cursor: pointer;
}

.empty-image-area-text {
  display: flex;
  align-items: center;
  margin: auto;
  pointer-events: none;
  transition: scale, 0.4s;
}

.empty-image-area-text.drag-over {
  transform: scale(1.1);
}
</style>