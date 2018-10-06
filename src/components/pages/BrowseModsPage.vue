<template>
<div class="page" id="browse-mods-page">
  <div class="ma-4 flexbox-column flexbox-grow of-hidden">
    <div class="display-1 mb-2">{{mods.length}} mods</div>
    <div class="flexbox">
      <div class="mod-list primary-scrollbar">
        <ModCard class="mr-3" v-for="mod in mods" :mod="mod" :key="mod.id"></ModCard>
      </div>
      <v-card class="mod-search-panel ml-3">
        <div class="primary-spacer-3"></div>
        <div class="pa-3">
          <div class="headline">Filter</div>
          <v-text-field placeholder="Search"></v-text-field>
          <div class="subheading">Sort by</div>
          <v-btn-toggle v-model="sortDirection" mandatory class="flexbox">
            <v-btn flat value="ascending" class="flexbox-grow">
              Ascending
            </v-btn>
            <v-btn flat value="descending" class="flexbox-grow">
              Descending
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

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: { ModCard },
})
export default class BrowseModsPage extends Vue {
  mods: Mod[] = [];
  sortDirection = SortDirection.Ascending;
  sortMode = SortMode.Likes;

  async mounted() {
    this.mods = await ModService.getMods();
  }
}

enum SortDirection {
  Ascending = 'ascending',
  Descending = 'descending',
}

enum SortMode {
  LastModified = 'lastModified',
  Likes = 'likes',
  Downloads = 'downloads',
}
</script>

<style lang="stylus">
#browse-mods-page {
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
  flex-basis: 250px;
  flex-shrink: 0;
}
</style>
