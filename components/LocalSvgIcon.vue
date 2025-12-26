<template>
  <!-- icons -->
  <inline-svg :class="classes" :src="`/icons/${image}.svg`" />
</template>

<script>
// vue
import { defineComponent } from "vue";

// npm
import InlineSvg from "vue-inline-svg";

export default defineComponent({
  name: "LocalSvgIcon",

  components: {
    InlineSvg
  },

  props: {
    image: {
      type: String,
      required: true
    },
    classes: {
      /** classnames to be added */
      type: String,
      default: "",
      required: false
    }
  }
});
</script>
