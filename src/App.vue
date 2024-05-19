<template>
  <DataListComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataListComponent from "@/pages/post-list-page.vue";

export default defineComponent({
  name: 'App',
  components: {DataListComponent}
});
</script>

<style lang="scss">
@import "@/styles/global";
</style>
