<template>
  <v-card
    class="file-drop-area"
    v-on:drop="dropHandler"
    v-on:dragstart="dragStart"
    v-on:dragend="dragEnd"
    v-on:dragenter="dragEnter"
    v-on:dragover="dragOver"
    v-on:dragleave="dragLeave"
  >
    <v-treeview
      class="file-treeview"
      v-if="files.length !== 0"
      :items="files"
      transition
      hoverable
      open-on-click
    >
      <template slot="prepend" slot-scope="{ item, open  }">
        <v-icon v-if="item.isFolder">{{ open ? 'folder_open' : 'folder' }}</v-icon>
        <v-icon v-else>{{ files[item.file] }}</v-icon>
      </template>
      <template slot="append" slot-scope="{ item }">
        <a @click="removeFile(item)">
          <v-icon>delete</v-icon>
        </a>
      </template>
    </v-treeview>
    <div v-else class="empty-file-area-text" :class="{'drag-over': isDragOver}" @click="openFileDialog">
      <v-icon color="primary" size="100" class="pr-3">file_copy</v-icon>
      <span class="display-1 font-weight-light">Drag & Drop files and folders</span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as ModService from '@/networking/ModService';
import store from '@/store';
import fs from '@/helpers/fsAsPromised';
import path from 'path';
import { remote } from 'electron';

@Component
export default class FileDropArea extends Vue {
  @Prop(Array)
  files!: FileData[];

  isDragOver = false;
  idCounter = 0;

  async createFileData(filePath: string) {
    filePath = path.normalize(filePath);
    const stats = await fs.lstat(filePath);
    const fileData: FileData = {
      id: this.idCounter++,
      path: filePath,
      name: path.basename(filePath),
      isFolder: stats.isDirectory(),
      parent: null,
      children: [],
    };
    if (stats.isDirectory()) {
      const children = await fs.readdir(filePath);
      for (const child of children) {
        const childFileData = await this.createFileData(path.join(filePath, child));
        childFileData.parent = fileData;
        fileData.children.push(childFileData);
      }
      fileData.children.sort((a, b) => b.children.length - a.children.length);
    }
    return fileData;
  }

  async addFile(filePath: string) {
    const fileData = await this.createFileData(filePath);
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].children.length < fileData.children.length) {
        this.files.splice(i, 0, fileData);
        return;
      }
    }
    this.files.push(fileData);
  }

  async dropHandler(evt: any) {
    for (const file of evt.dataTransfer.files) {
      await this.addFile(file.path);
    }
    this.isDragOver = false;
  }

  removeFile(item: FileData) {
    let arr = this.files;
    if (item.parent) {
      arr = item.parent.children;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === item.id) {
        arr.splice(i, 1);
        return;
      }
    }
  }

  openFileDialog() {
    console.log('asd');
    remote.dialog.showOpenDialog(
      {
        title: 'Select files',
        properties: ['openFile', 'multiSelections'],
      },
      files => {
        files.forEach(f => this.addFile(f));
      }
    );
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

export interface FileData {
  id: number;
  path: string;
  name: string;
  isFolder: boolean;
  children: FileData[];
  parent: FileData | null;
}
</script>

<style lang="stylus">
.file-drop-area {
  min-height: 150px;
  display: flex !important;
  flex-direction: row;
}

.empty-file-area-text {
  display: flex;
  align-items: center;
  margin: auto;
  transition: scale, 0.4s;
  cursor: pointer;
}

.empty-file-area-text.drag-over {
  transform: scale(1.1);
  pointer-events: none;
}

.file-treeview {
  width: 100%;
}
</style>