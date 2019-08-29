<template>
  <div id="app">
    <CompositionsList />
    <Composer />

    <!-- <input
      v-model="message"
      type="text"
    >
    <button
      @click="sendMessage"
    >send</button>
    <ul class="log">
      <li
        v-for="(item, i) in log"
        :key="i"
      >
        {{ item && item.action === 'message' ? item.payload.text : 'E R R O R' }}
      </li>
    </ul> -->

  </div>
</template>

<script>
import { EventBus, events } from './utils/EventBus.js';

import CompositionsList from './components/CompositionsList';
import Composer from './components/composer/Composer';

export default {
  components: {
    CompositionsList,
    Composer,
  },
  data () {
    return {
      message: '',
      log: [],
    };
  },
  mounted () {
    this.connection = new WebSocket('ws://localhost:1337');

    this.setupEventHandlers();
  },
  methods: {
    setupEventHandlers () {
      this.onUpdateComposition = this.onUpdateComposition.bind(this);
      EventBus.$on(events.UPDATE_COMPOSITION, this.onUpdateComposition);

      this.connection.onopen = () => {
        console.log('socket open');
      };

      this.connection.onerror = (error) => {
        console.log('socket error', error);
      };

      this.connection.onmessage = this.onMessage;
    },
    onUpdateComposition (composition) {
      console.log(composition);
      this.sendMessage('UPDATE_COMPOSITION', composition);
    },
    sendMessage (action, payload) {
      const message = JSON.stringify({ action, payload });
      this.connection.send(message);
    },
    onMessage (message) {
      const messageData = this.jsonParse(message.data);
      console.log('socket onMessage', messageData);

      if (messageData.action === 'message') {
        this.log.push(messageData);
      }
    },
    jsonParse (string) {
      var obj;
      try {
        obj = JSON.parse(string);
      } catch (e) {
        console.log('invalid JSON: ', string);
        return;
      }
      return obj;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
