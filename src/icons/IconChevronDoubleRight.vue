<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDoubleRight } from '@mdi/js';

export default {
  name: "icon-chevron-double-right",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiChevronDoubleRight,
    }
  }
}
</script>
