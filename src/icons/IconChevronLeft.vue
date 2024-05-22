<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft } from '@mdi/js';

export default {
  name: "icon-chevron-left",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiChevronLeft,
    }
  }
}
</script>
