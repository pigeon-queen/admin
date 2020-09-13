<template>
  <img :src="src" alt="">
</template>

<script>

import {functions} from 'nerio-js-utils'

const {setQuery} = functions
export default {
  name: "ossImage",
  props: {
    value: String,
    width: {
      type: Number,
      default: () => 320
    }
  },
  computed: {
    src() {
      return setQuery(this.value, {
        "x-oss-process": `image/resize,w_${this.width}`
      })
    }
  }
}
</script>

<style scoped>

</style>
