<template>
<div class="page" id="browse-mods-page">
  <div class="pa-4 flexbox-column flexbox-grow of-hidden">
    <div class="display-1 mb-2">{{mods.length}} mods</div>
    <div class="flexbox" id="browseModsMainContainer">
        <transition name="fade2">
          <!--<div class="mod-list primary-scrollbar vertical mr-3" v-show="!loading">
            <ModCard class="mr-3" v-for="mod in mods" :mod="mod" :key="mod.id"></ModCard>
          </div>-->
          <VirtualizedList class="mod-list primary-scrollbar vertical mr-3" 
            :dataSource="dataSource" :elementHeight="120" :bufferedElements="12" 
            :renderer="modCard" :batchSize="20" :maxBatchesInMemory="10" :dataSourceParams="{}" >
          </VirtualizedList>
        </transition>
        <div id="modLoadProgressContainer" v-show="loading">
          <v-progress-circular id="modLoadProgress" :size="90" :width="7" color="primary" indeterminate />
        </div>
      
      
      <v-card class="mod-search-panel">
        <div class="primary-spacer-3"></div>
        <div class="pa-3">
          <div class="headline">Filter</div>
          <v-text-field placeholder="Search" v-model="searchText"></v-text-field>
          <div class="subheading">Sort by</div>
          <v-btn-toggle v-model="sortDirection" mandatory class="flexbox">
            <v-btn flat :value="-1" class="flexbox-grow">
              Descending
            </v-btn>
            <v-btn flat :value="1" class="flexbox-grow">
              Ascending
            </v-btn>
          </v-btn-toggle>
          <v-radio-group v-model="sortMode" column>
            <v-radio label="Last modified" value="lastModified"/>
            <v-radio label="Likes" value="likes"/>
            <v-radio label="Downloads" value="downloads"/>
          </v-radio-group>
        </div>
        
      </v-card>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import ModCard from '@/components/ModCard.vue';
import { Mod } from '@/store/modules/mods/types';
import * as ModService from '@/networking/ModService';
import debounce from '@/helpers/debounce';
import VirtualizedList from '@/components/general/VirtualizedList.vue';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: { ModCard, VirtualizedList },
})
export default class BrowseModsPage extends Vue {
  mods: Mod[] = [];
  searchText = '';
  sortDirection = ModService.SortDirection.Descending;
  sortMode = ModService.SortMode.Likes;
  loading = false;

  dataSource = { getItem: ModService.getModById, getItemSync: ModService.getModSync, getBatch: ModService.getModBatch };
  modCard = ModCard;

  searchModsDebounced = debounce(this.searchMods, 300);


  async searchMods() {
    this.loading = true;
    this.mods = [];
    this.mods = await ModService.searchMods(this.searchText, this.sortMode, this.sortDirection);
    // Wait until mod list is rendered before showing them
    this.$nextTick(() => {
      this.loading = false;
    });
  }

  @Watch('searchText')
  searchTextChanged() {
    //this.searchModsDebounced();
  }

  @Watch('sortMode')
  @Watch('sortDirection')
  sortModeChanged() {
    //this.searchMods();
  }

  async mounted() {
    //this.mods = await ModService.getMods();
  }
}
</script>

<style lang="stylus">
#browse-mods-page {
}

#browseModsMainContainer {
  height: 100%;
}

.mod-list {
  flex-basis: 530px;
  flex-shrink: 1;
  flex-grow: 1;
}

.mod-list .mod-card {
  margin-bottom: 12px;
}

.mod-search-panel {
  overflow: hidden;
  flex-basis: 250px;
  flex-shrink: 0;
  margin-left: auto;
}

#modLoadProgressContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

#modLoadProgress {
}

.fade2-enter-active {
  transition: opacity 0.5s;
}

.fade2-enter { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>
