<template>
  <div>
    <p :class="$props.titleStyle"><small>{{$props.title}}</small></p>
    <div class="flex w-full rounded p-2 h-[42dvh] overflow-y-auto" :class="$props.shadowStyle || 'c-shadow-gray-1'">
      <ul class="py-2 ps-2 w-full divide-y divide-blue-200">
        <li v-for="(item, index) in $props.list" :key="index" class="py-2">
          <div class="flex items-center">
            <div>
              <p>{{item.title}}:</p>
              <p>{{item.id }}: <small>{{item.body}}</small></p>
            </div>
            <div class="inline-flex me-0 ms-auto">
              <slot name="buttons" :events="{upId: (value: StatusEnum)=> emitId(item.id, value)}" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {ApiPostInterface, StatusEnum} from "@/interfaces-enums/interfaces-enums";
import type { PropType } from 'vue'

export default defineComponent({
  computed: {
    StatusEnum() {
      return StatusEnum
    }
  },
  components: {},
  props: {
    list:{ type: Object as PropType<ApiPostInterface[]>, required: true },
    title:{ type:String, required: true },
    titleStyle:{ type:String, required: false },
    shadowStyle:{ type:String, required: false },
  },
  emits: ['emitId'],
  setup(props, { emit }) {

    const emitId = (id: number, status: StatusEnum) => {
      emit("emitId", {id: id, status: status});
    }

    return {
      emitId
    }
  }

})

</script>
