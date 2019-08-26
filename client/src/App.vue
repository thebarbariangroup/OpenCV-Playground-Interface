<template>
  <div id="app">
    <p>...!</p>
    <input
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
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      log: [],
    };
  },
  mounted () {
    this.connection = new WebSocket('ws://localhost:1337');

    this.connection.onopen = function () {
      console.log('socket open');
      // connection is opened and ready to use
    };

    this.connection.onerror = function (error) {
      console.log('socket error', error);
    };

    this.connection.onmessage = this.onMessage;
  },
  methods: {
    sendMessage () {
      const payload = {
        text: this.message,
      };
      const json = JSON.stringify({ action: 'message', payload: payload });
      this.connection.send(json);
    },
    onMessage (message) {
      const json = this.safeJsonParse(message.data);
      console.log('socket onMessage', json);

      if (json.action === 'message') {
        this.log.push(json);
      }
    },
    safeJsonParse (string) {
      var json;
      try {
        json = JSON.parse(string);
      } catch (e) {
        console.log('invalid JSON: ', string);
        return;
      }
      return json;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
