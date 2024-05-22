<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDoubleLeft} from '@mdi/js';

export default {
  name: "icon-chevron-double-left",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiChevronDoubleLeft,
    }
  }
}
</script>
