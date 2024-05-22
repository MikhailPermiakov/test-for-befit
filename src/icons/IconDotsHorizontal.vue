<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDotsHorizontal } from '@mdi/js';

export default {
  name: "icon-dots-horizontal",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiDotsHorizontal,
    }
  }
}
</script>
