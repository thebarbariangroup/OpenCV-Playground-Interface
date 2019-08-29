<template>
  <div class="composer">
    <div class="composer_content-container">
      <div class="composer_header">Build-a-Filter Workshop</div>
      <div class="composer_controls-container">
        <Inventory :schemas="schemas" />
        <Queue />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../../utils/EventBus.js';

import dragula from '../../lib/dragula';
import schemas from '../../data/schemas';

import Inventory from './Inventory';
import Queue from './Queue';

export default {
  components: {
    Inventory,
    Queue,
  },
  data () {
    return {
      schemas,
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.setupDragula();
    },
    setupDragula () {
      // this.drake = dragula([this.inventoryEl, this.queueEl], {
      //   copySortSource: true,
      //   removeOnSpill: true,
      //   copy: (el, source) => {
      //     return source === this.inventoryEl;
      //   },
      //   accepts: (el, target, source, sibling) => {
      //     const queueToQueue = source === this.queueEl && target === this.queueEl;
      //     const invToQueue = source === this.inventoryEl && target === this.queueEl;
      //     return invToQueue || queueToQueue;
      //   },
      // });
    }
  }
}
</script>

<style lang="scss">
.composer {

}
</style>