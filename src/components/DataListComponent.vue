<template>
  <div class="p-2 max-h-screen">
    <p><small>список постов:</small></p>
    <div class="flex w-full rounded c-shadow-gray-1 p-2 h-auto max-h-[350px] overflow-y-scroll">
      <ul class="py-2 px-4 w-full divide-y divide-blue-200">
        <li v-for="(item, index) in list.local" :key="index" class="py-2">
          <div class="flex items-center">
            <div>
              <p>{{item.title}}</p>
              <p>{{item.id }}: <small>{{item.body}}</small></p>
            </div>
            <div class="inline-flex me-0 ms-auto">
              <button class="bg-blue-400 p-1 text-white rounded mx-3" @click="itemMoveList(item.id, VisibleEnum.YES)">
                Yes
              </button>
              <button class="bg-red-500 p-1 text-white rounded" @click="itemMoveList(item.id, VisibleEnum.NO)">
                No
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="flex align-items-center justify-center">
      <button class="bg-blue-400 p-1 text-white rounded m-2" :disabled="state.loaderGet" @click="pagination('up')">
        <IconArrowUp />
      </button>
      <button class="c-button bg-blue-400 p-1 text-white rounded m-2" :disabled="state.loaderGet" @click="pagination('down')">
        <div v-if="state.loaderGet" class="c-loader mr-1"></div>
        <IconArrowDown v-else />
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4 grid-rows-1">
      <div>
        <p class="text-blue-600"><small>нравится:</small></p>
        <div class="flex w-full rounded c-shadow-blue-1 p-2 h-auto max-h-[300px] overflow-y-scroll">
          <ul class="py-2 px-4 w-full divide-y divide-blue-200">
            <li v-for="(item, index) in list.yes" :key="index" class="py-2">
              <div class="flex items-center">
                <div>
                  <p>{{item.title}}:</p>
                  <p>{{item.id }}: <small>{{item.body}}</small></p>
                </div>
                <div class="inline-flex me-0 ms-auto">
                  <button class="bg-red-500 p-1 text-white rounded" @click="itemMoveList(item.id, VisibleEnum.LOCAL)">
                    <IconClose />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p class="text-red-600"><small>не нравится:</small></p>
        <div class="flex w-full rounded c-shadow-red-1 p-2 h-auto max-h-[300px] overflow-y-scroll">
          <ul class="py-2 px-4 w-full divide-y divide-blue-200">
            <li v-for="(item, index) in list.no" :key="index" class="py-2">
              <div class="flex items-center">
                <div>
                  <p>{{item.title}}:</p>
                  <p>{{item.id }}: <small>{{item.body}}</small></p>
                </div>
                <div class="inline-flex me-0 ms-auto">
                  <button class="bg-red-500 p-1 text-white rounded" @click="itemMoveList(item.id, VisibleEnum.LOCAL)">
                    <IconClose />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, onUnmounted, onMounted} from 'vue';
import { dataListStore } from '@/store/client'
import {storeToRefs} from "pinia";
import {ListsInterface, VisibleEnum} from "@/interfaces-enums/interfaces";
import IconArrowUp from "@/icons/IconArrowUp.vue";
import IconArrowDown from "@/icons/IconArrowDown.vue";
import IconClose from "@/icons/IconClose.vue";


export default defineComponent({
  computed: {
    VisibleEnum() {
      return VisibleEnum
    }
  },
  components: {IconArrowUp, IconArrowDown, IconClose},
  setup(){
    const { postList } = storeToRefs(dataListStore());
    const { getPostList } = dataListStore();
    const state = reactive({loaderGet: false, activeId: 1});
    const list = ref<ListsInterface>({local: [], yes: [], no: []});

    onMounted( async()=>{
      if (postList.value.length === 0){
        await getPostList();
      }
      await createLists();
    })
    onUnmounted( ()=> {
      state.activeId = 1
    })

    const createLists = async ()=> {
      list.value.yes = postList.value.filter((item) => item.isVisible === VisibleEnum.YES);
      list.value.no = postList.value.filter((item) => item.isVisible === VisibleEnum.NO);
      const index = postList.value.findIndex((item)=> item.id === state.activeId);
      const massive = postList.value.slice(index);
      const massiveLocal = massive.filter((item)=> item.isVisible === VisibleEnum.LOCAL);
      list.value.local = [];
      let n = 0;
      while (n < 5) {
        list.value.local.push({...massiveLocal[n]})
        n++
      }
      const lastIdPostList = postList.value[postList.value.length - 1].id;
      if(list.value.local.find((item)=> item.id === lastIdPostList)) {
        state.loaderGet = true;
        const result = await getPostList(lastIdPostList)
        if(result) {
          state.activeId = state.activeId - result
          console.error('dataList end')
        }
        state.loaderGet = false;
      }
    }

    const itemMoveList = (id: number, typeVisible: VisibleEnum) => {
      const index = postList.value.findIndex(item => item.id === id)
      postList.value[index].isVisible = typeVisible;
      createLists()
    }

    const pagination = async (direction: 'up' | 'down')=> {
      if (direction === 'down') {
          state.activeId = state.activeId + 5
      } else if (direction === 'up') {
        if(state.activeId < 5) {
          state.activeId = 1
        } else {
          state.activeId = state.activeId - 5
        }
      }
      await createLists();
    }

    return {
      list,
      state,
      itemMoveList,
      pagination,
    }
  }
})
</script>
