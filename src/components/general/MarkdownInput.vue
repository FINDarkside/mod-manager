<template>
  <v-tabs>
    <v-tab ripple>Markdown</v-tab>
    <v-tab ripple>Preview</v-tab>
    <v-tab-item class="primary-scrollbar vertical">
      <v-textarea
        v-model="input"
        :auto-grow="true"
        :hide-details="true"
        solo
        flat
        label="Solo textarea"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
    </v-tab-item>
    <v-tab-item class="pa-3 primary-scrollbar vertical" ref="descriptionTab">
      <MarkdownRenderer class="description-preview-card" :markdown="input" ref="markdownRenderer"/>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MarkdownRenderer from '@/components/general/MarkdownRenderer.vue';

@Component({ components: { MarkdownRenderer } })
export default class MarkdownInput extends Vue {
  @Prop(String)
  markdown!: string;

  input = '';

  @Watch('input')
  descriptionTabChanged(oldVal: string, newVal: string) {
    // Do on next tick to allow markdownRenderer to compile the markdown before calculating height
    Vue.nextTick(() => {
      if ((this.$refs.descriptionTab as any).$el.style.display === 'none') {
        (this.$refs.descriptionTab as any).$el.style.display = 'block';
        (this.$refs.markdownRenderer as any).resizeFrame();
        (this.$refs.descriptionTab as any).$el.style.display = 'none';
      } else {
        (this.$refs.markdownRenderer as any).resizeFrame();
      }
    });
    if (this.input !== this.markdown) this.$emit('input', this.input);
  }

  @Watch('markdown')
  inputChanged() {
    this.input = this.markdown;
  }
}
</script>

<style>
.description-preview-card {
  width: 100%;
}
</style>