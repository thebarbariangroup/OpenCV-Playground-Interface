<template>
  <div class="inventory">
    <div class="inventory_content-container">
      <div class="inventory_header">Inventory</div>
      <ul class="inventory_items">
        <TransformItem
          v-for="(schema, i) in schemas"
          :key="i"
          :schema="schema"
          location="inventory"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TransformItem from './TransformItem';

export default {
  components: {
    TransformItem
  },
  props: {
    schemas: Array,
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
.inventory {

}
</style>