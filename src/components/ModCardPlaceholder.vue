<template>
    <v-card class="mod-card-placeholder">
      <div class="flexbox">
        <div class="image placeholder-pulse-bg" />
        <div class="mod-card-placeholder-main-content">
          <div class="mod-card-placeholder-header placeholder-pulse-bg"></div>
          <div class="mod-card-placeholder-description mb-0">
            <div class="placeholder-pulse-bg"/>
            <div class="placeholder-pulse-bg"/>
            <div class="placeholder-pulse-bg"/>
          </div>
        </div>
        <div class="mod-card-placeholder-secondary-content">
          <div>
              <v-icon class="placeholder-pulse-color">person</v-icon> 
              <span class="mod-card-person-placeholder placeholder-pulse-bg"/>
          </div>
          <div class="spacer"></div>
          <div>
              <v-icon class="placeholder-pulse-color">favorite</v-icon> 
              <span class="mod-card-likes-placeholder placeholder-pulse-bg"/>
          </div>
          <div class="spacer"></div>
          <div>
              <v-icon class="placeholder-pulse-color">file_download</v-icon> 
              <span class="mod-card-likes-placeholder placeholder-pulse-bg"/>
          </div>
        </div>
        <div class="installed-indicator"></div>
      </div >
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ModCardPlaceholder extends Vue {}
</script>

<style lang="stylus">
.mod-card-placeholder {
  height: 108px;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;

  .image {
    flex-shrink: 0;
    width: 192px;
    height: 108px;
  }
}

.mod-card-placeholder-main-content {
  padding: 4px 0px 0px 8px;
  flex-grow: 1;
  overflow: hidden;
}

.mod-card-placeholder-header {
  height: 24px;
  margin: 1px 0 6px 0;
  border-radius: 26px;
  max-width: 180px;
}

.mod-card-placeholder-description {
  div {
    height: 15px;
    margin-bottom: 4px;
    border-radius: 15px;
  }

  div:nth-child(2) {
    max-width: 80%;
  }

  div:nth-child(3) {
    max-width: 50px;
  }
}

.mod-card-placeholder-secondary-content {
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

.mod-card-person-placeholder {
  position: relative;
  top: 2px;
  height: 14px;
  width: 100px;
  border-radius: 14px;
  display: inline-block;
}

.mod-card-likes-placeholder {
  position: relative;
  top: 2px;
  height: 14px;
  width: 50px;
  border-radius: 14px;
  display: inline-block;
}
</style>
