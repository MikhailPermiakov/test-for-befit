<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiThumbUpOutline } from '@mdi/js';

export default {
  name: "icon-thumb-up-outline",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiThumbUpOutline,
    }
  }
}
</script>
