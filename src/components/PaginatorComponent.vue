<template>
  <div class="flex items-center justify-center">
    <button class="bg-blue-400 p-1 text-white rounded m-2" @click="moveStart">
      <IconChevronDoubleLeft />
    </button>
    <button class="bg-blue-400 p-1 text-white rounded m-2" @click="moveLeft">
      <IconChevronLeft />
    </button>

    <div class="flex flex-nowrap items-center mx-6">
      <div class="w-4 mx-3">
        <IconDotsHorizontal size="16px" v-show="!state.pageDisplayList.find(page=> page === 1)" />
      </div>
      <div
        class="flex items-center justify-center rounded mx-2 hover:cursor-pointer border border-b-blue-300 min-w-7 aspect-square"
        v-for="(page, index) in state.pageDisplayList"
        :key="index"
        :class="page === state.activePage ? 'bg-blue-300 text-white' : ''"
        @click="editActivePage(page)"
      >
        <p>{{page}}</p>
      </div>
      <div class="w-4 mx-3">
        <IconDotsHorizontal size="16px" v-show="!state.pageDisplayList.find(page=> page === state.pages)" />
      </div>
    </div>

    <button class="bg-blue-400 p-1 text-white rounded m-2" @click="moveRight">
      <IconChevronRight />
    </button>
    <button class="bg-blue-400 p-1 text-white rounded m-2" @click="moveEnd">
      <IconChevronDoubleRight />
    </button>

    <p class="mx-2">pages:</p>
    <p>{{state.pages}}</p>

  </div>
</template>

<script lang="ts">
import {defineComponent, watch, reactive} from 'vue';
import IconChevronDoubleLeft from '@/icons/IconChevronDoubleLeft.vue';
import IconChevronLeft from '@/icons/IconChevronLeft.vue';
import IconChevronDoubleRight from '@/icons/IconChevronDoubleRight.vue';
import IconChevronRight from '@/icons/IconChevronRight.vue';
import IconDotsHorizontal from '@/icons/IconDotsHorizontal.vue';

export default defineComponent({
  props: {
    length: {type: Number, default: 0},
  },
  components: {IconChevronDoubleLeft, IconChevronLeft, IconChevronDoubleRight, IconChevronRight, IconDotsHorizontal},
  emits: ['emitActiveIndex'],
  setup(props, {emit}){
    const state = reactive({pages: 0, pageDisplayList: [0], activePage: 1, activeIndex: 0 });

    watch(()=>props.length, ()=> {
      if(props.length === 0) return
      if(props.length >= 5) {
        state.pages = Math.floor(props.length / 5) ;
      } else {
        state.pages = 1
      }
      if(state.activePage === 1) createPageDisplayList()
    });

    const createPageDisplayList = ()=> {
      state.pageDisplayList = []
      let i = state.activePage;
      if(state.activePage === state.pages) {
        let n = 6;
        while (n > 1) {
          if(i === 1) break
          state.pageDisplayList.unshift(i)
          n--
          i--
        }
      } else {
        let n = 1;
        while (n < 6) {
          if(i > state.pages) break
          state.pageDisplayList.push(i)
          n++
          i++
        }
      }
    }

    const moveRight = ()=> {
      if(state.activePage < state.pages){
        if(state.activePage === state.pageDisplayList[4]){
          state.pageDisplayList = state.pageDisplayList.map(item => item + 1)
        }
        state.activePage += 1
        emitIndex();
      }
    }
    const moveLeft = ()=> {
      if(state.activePage > 1) {
        if(state.activePage === state.pageDisplayList[0]){
          state.pageDisplayList = state.pageDisplayList.map(item => item - 1)
        }
        state.activePage -= 1
        emitIndex();
      }
    }
    const moveStart = ()=> {
      state.activePage = 1
      createPageDisplayList();
      emitIndex();
    }
    const moveEnd = ()=> {
      state.activePage = state.pages
      createPageDisplayList();
      emitIndex();
    }
    const editActivePage = (activePage: number)=> {
      state.activePage = activePage;
      emitIndex();
    }

    const emitIndex = ()=> {
      state.activeIndex = (state.activePage * 5) - 5
      emit("emitActiveIndex", state.activeIndex);
    }

    return{
      state,
      emitIndex,
      moveRight,
      moveLeft,
      moveStart,
      moveEnd,
      editActivePage,
    }
  }
})

</script>

<style lang="scss">

</style>
