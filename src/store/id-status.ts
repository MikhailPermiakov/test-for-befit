import { defineStore } from 'pinia'
import { ref } from 'vue';
import {ApiPostInterface, IdStatusInterface, StatusEnum} from "@/interfaces-enums/interfaces-enums";

export const idStatusListStore = defineStore('idStatusListStore', ()=>{
    const idStatusList = ref<IdStatusInterface[]>([]);

    const createIdStatusList = (posts: ApiPostInterface[]) => {
        posts.forEach((post) => {
            if (!idStatusList.value.find(item=> item.id === post.id)) {
                idStatusList.value.push({id:post.id, status: StatusEnum.GENERAL});
            }
        })
    }
    const editStatus = (id: number, status: StatusEnum) => {
        const index = idStatusList.value.findIndex(item => item.id === id)
        idStatusList.value[index].status = status;
    }

    return {idStatusList, createIdStatusList, editStatus}

})
