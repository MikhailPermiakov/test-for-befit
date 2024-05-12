<template>
  <h1 class="text-amber-600">hello{{ name }}{{ dataList }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { dataListStore } from '@/store/client'
import {storeToRefs} from "pinia";


export default defineComponent({

  setup(){
    const name = ref<string>('Mikhail')
    const { dataList } = storeToRefs(dataListStore());

    return {
      name,
      dataList
    }
  }
})
</script>
