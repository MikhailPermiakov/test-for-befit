<template>
  <DataListComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataListComponent from "@/components/DataListComponent.vue";

export default defineComponent({
  name: 'App',
  components: {DataListComponent}
});
</script>

<style lang="scss">
@import "@/assets/global";
</style>
