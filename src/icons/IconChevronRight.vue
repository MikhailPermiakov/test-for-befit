<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronRight } from '@mdi/js';

export default {
  name: "icon-chevron-right",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiChevronRight,
    }
  }
}
</script>
