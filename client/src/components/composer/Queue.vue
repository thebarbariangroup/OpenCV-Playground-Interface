<template>
  <div class="queue">
    <div class="queue_content-container">
      <div class="queue_header">Queue</div>
      <ol class="queue_items">
        <TransformItem
          v-for="(item, i) in items"
          :key="i"
          :schema="item.schema"
          :opts="item.opts"
          location="queue"
        />
      </ol>
    </div>
  </div>
</template>

<script>
import { EventBus, events } from '../../utils/EventBus.js';

import TransformItem from './TransformItem';

import schemas from '../../data/schemas';

const DEFAULT_ITEMS = [
  {
    schema: schemas[0],
    opts: {},
  }
];

/**
 * Composition
 * 
 * {
 *   category: 'alter',
 *   name: 'grayscale',
 *   conf: {}
 * },
 * {
 *   category: 'alter',
 *   name: 'setChannel',
 *   conf: {
 *     idx: 3,
 *     val: 255,
 *   }
 * }
 * 
 * */


export default {
  components: {
    TransformItem
  },
  data () {
    return {
      items: DEFAULT_ITEMS,
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.buildComposition();
      setTimeout(() => {
        EventBus.$emit(events.UPDATE_COMPOSITION, this.composition);
      }, 500);
    },
    buildComposition () {
      this.composition = this.items.map((item) => {
        return {
          category: item.schema.category,
          name: item.schema.name,
          conf: item.opts,
        };
      });
    },

  }
}
</script>

<style lang="scss">
.queue {

}
</style>