import { defineStore } from 'pinia'
import { ref } from 'vue';
import { api } from '@/api/api'
import {PostInterface, VisibleEnum} from "@/interfaces-enums/interfaces";

export const dataListStore = defineStore('dataListStore', ()=>{

    const postList = ref<PostInterface[]>([]);

    const getPostList = async (postId?: number)=> {
        try {
            const data = await api().getData(postId)
            if(data.length === 0) {
                return 5
            } else {
                data.map((index)=> {
                    postList.value.push({
                        id: index.id,
                        userId: index.userId,
                        title: index.title,
                        body: index.body,
                        isVisible: VisibleEnum.LOCAL,
                    })
                })
            }
            if (data.length < 5) {
                return data.length
            }
        } catch (error){
            console.error(error)
        }

    }

    return { postList, getPostList }
})
