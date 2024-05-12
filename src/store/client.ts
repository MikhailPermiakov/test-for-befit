import { defineStore } from 'pinia'
import { ref } from 'vue';

export const dataListStore = defineStore('dataListStore', ()=>{

    const dataList = ref<string>('permiakov')

    return { dataList }
})
