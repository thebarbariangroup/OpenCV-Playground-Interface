<template>
  <li class="transform-item">
    {{ schema.label }}
  </li>
</template>

<script>
import Radio from '../inputs/Radio';
import Slider from '../inputs/Slider';

export default {
  components: {
    // Radio,
    // Slider,
  },
  props: {
    schema: Object,
    opts: Object,
    location: String, // 'inventory' or 'queue'
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {

    },
  }
}
</script>

<style lang="scss">
.transform-item {

}
</style>