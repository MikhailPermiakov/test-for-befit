<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiThumbDownOutline } from '@mdi/js';

export default {
  name: "icon-thumb-down-outline",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiThumbDownOutline,
    }
  }
}
</script>
