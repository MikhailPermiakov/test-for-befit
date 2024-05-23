<template>
  <div>
    <LoaderComponent v-show="state.loaderGet" />
    <div class="p-2">
      <ListComponent
          title="список постов"
          :list="list.general"
          @emit-id="(value)=>postMoveList(value)"
      >
        <template v-slot:buttons="{ events: {upId} }">
          <button class="bg-blue-400 p-1 text-white rounded mx-3" @click="upId(StatusEnum.LIKE)">
            <IconThumbUpOutline />
          </button>
          <button class="bg-red-500 p-1 text-white rounded" @click="upId(StatusEnum.DISLIKE)">
            <IconThumbDownOutline />
          </button>
        </template>
      </ListComponent>

      <PaginatorComponent
          :length="state.listGeneralLength"
          @emit-active-index="(value)=> pagination(value)"
      />

      <div class="grid grid-cols-2 gap-4 grid-rows-1">
        <ListComponent
            title="нравится"
            title-style="text-blue-600"
            shadow-style="c-shadow-blue-1"
            :list="list.like"
            @emit-id="(value)=>postMoveList(value)"
        >
          <template v-slot:buttons="{ events: {upId} }">
            <button class="bg-red-500 p-1 text-white rounded ms-2" @click="upId(StatusEnum.GENERAL)">
              <IconClose size="16px" />
            </button>
          </template>
        </ListComponent>

        <ListComponent
            title="не нравится"
            title-style="text-red-600"
            shadow-style="c-shadow-red-1"
            :list="list.dislike"
            @emit-id="(value)=>postMoveList(value)"
        >
          <template v-slot:buttons="{ events: {upId} }">
            <button class="bg-red-500 p-1 text-white rounded ms-2" @click="upId(StatusEnum.GENERAL)">
              <IconClose size="16px"/>
            </button>
          </template>
        </ListComponent>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {postListStore} from '@/store/posts';
import {idStatusListStore} from '@/store/id-status';
import {storeToRefs} from "pinia";
import {ApiPostInterface, IdStatusInterface, ListsInterface, StatusEnum} from "@/interfaces-enums/interfaces-enums";
import IconClose from "@/icons/IconClose.vue";
import ListComponent from "@/components/ListComponent.vue";
import PaginatorComponent from "@/components/PaginatorComponent.vue";
import IconThumbUpOutline from "@/icons/IconThumbUpOutline.vue";
import IconThumbDownOutline from "@/icons/IconThumbDownOutline.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";


export default defineComponent({
  computed: {
    StatusEnum() {
      return StatusEnum
    }
  },
  components: {LoaderComponent, ListComponent, IconClose, IconThumbUpOutline, IconThumbDownOutline, PaginatorComponent},
  setup(){
    const { postList } = storeToRefs(postListStore());
    const { getPostList } = postListStore();
    const { idStatusList } = storeToRefs(idStatusListStore());
    const { editStatus } = idStatusListStore();
    const state = reactive({loaderGet: false, activeIndex: 0, listGeneralLength: 0});
    const list = reactive<ListsInterface>({general: [], like: [], dislike: []});

    onMounted( async()=>{
      if (postList.value.length === 0){
        state.loaderGet = true
        await getPostList();
      }
      if(postList.value.length !== 0 && idStatusList.value.length !== 0){
        await createLists();
      }
      state.loaderGet = false
    })

    const createLists = async ()=> {

      const temporaryListGeneral = ref<ApiPostInterface[]>([])
      list.general = [];
      list.like = [];
      list.dislike = [];

      postList.value.forEach((item)=>{
        const itemStatus = idStatusList.value.find((index)=> index.id === item.id)
        if(itemStatus?.status === StatusEnum.GENERAL) temporaryListGeneral.value.push(item)
        if(itemStatus?.status === StatusEnum.LIKE) list.like.push(item)
        if(itemStatus?.status === StatusEnum.DISLIKE) list.dislike.push(item)
      })

      state.listGeneralLength = temporaryListGeneral.value.length

      temporaryListGeneral.value = temporaryListGeneral.value.slice(state.activeIndex)
      let n = 0;
      while (n < 5) {
        if(!temporaryListGeneral.value[n]) break
        list.general.push({...temporaryListGeneral.value[n]})
        n++
      }
    }

    const postMoveList = (value: IdStatusInterface) => {
      editStatus(value.id, value.status);
      createLists();
    }

    const pagination = (index: number)=> {
      state.activeIndex = index
      createLists();
    }

    return {
      list,
      state,
      postMoveList,
      pagination,
    }
  }
})
</script>
