<template>
  <iframe ref="renderFrame"></iframe>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
});

@Component
export default class MarkdownRenderer extends Vue {
  @Prop(String)
  public markdown!: string;

  @Watch('markdown')
  markdownChanged() {
    const markDowmHtml = md.render(this.markdown);
    const pageHtml = `
    <!doctype html><html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css">
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
      <style>
        .markdown-body{
          font-family: 'Roboto';
        }
        html, body{
          margin:0;
          overflow: hidden;
        }
      </style>
    </head>
    <body class="markdown-body">${markDowmHtml}</body></html>`;
    const frame = this.$refs.renderFrame as any;
    frame.src = 'about:blank';
    frame.contentWindow.document.open();
    frame.contentWindow.document.write(pageHtml);
    frame.contentWindow.document.close();
  }

  resizeFrame() {
    const frame = this.$refs.renderFrame as any;
    frame.style.height = frame.contentWindow.document.body.offsetHeight + 'px';
  }

  mounted() {}
}
</script>

<style>
iframe {
  border: none;
}
</style>