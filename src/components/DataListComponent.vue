<template>
  <h1>hello{{ name }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({

  setup(){
    const name = ref<string>('Mikhail')

    return {
      name,
    }
  }
})
</script>
