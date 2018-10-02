<template>
<div class="page">
  <ModCard :mod="exampleMod"></ModCard>
</div>
</template>

<script>
import ModCard from "./../ModCard";

export default {
  name: "BrowseModsPage",
  components: { ModCard },
  data() {
    return {
      exampleMod: {
        name: "Relentless Night",
        description:
          "The earth seems to be slowing. Days and nights are getting longer. Every long night gets colder and harsher than the last. How long will you survive?",
        author: {
          id: null,
          name: "ShieldHeart"
        },
        likes: 235,
        downloads: 2460,
        installed: true,
        updatesAvailable: false
      }
    };
  }
};
</script>

<style>
</style>
