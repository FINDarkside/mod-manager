<template>
  <div class='page'>
    <div class='center mx-auto' mx-auto>
      <span>Settings</span>
      <v-switch v-model='darkMode' label='Dark Mode'></v-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
  computed: {
    darkMode: {
      get() {
        return this.$store.state.settings.darkMode;
      },
      set(value) {
        this.$store.commit("DARKMODE_SET", value);
      }
    }
  }
};
</script>

<style>

</style>
