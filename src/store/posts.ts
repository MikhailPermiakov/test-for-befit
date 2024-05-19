import { defineStore } from 'pinia'
import { ref } from 'vue';
import { api } from '@/api/api'
import {ApiPostInterface} from "@/interfaces-enums/interfaces-enums";
import { idStatusListStore } from '@/store/id-status';

export const postListStore = defineStore('postListStore', ()=>{
    const { createIdStatusList } = idStatusListStore();

    const postList = ref<ApiPostInterface[]>([]);

    const getPostList = async ()=> {
        try {
            const data = await api().getData()
             postList.value = data.map((index)=> {
                return {
                id: index.id,
                userId: index.userId,
                title: index.title,
                body: index.body,
                }
             })
            createIdStatusList(data)
        } catch (error){
            console.error(error)
        }
    }

    return { postList, getPostList }
})
