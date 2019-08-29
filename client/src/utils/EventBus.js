import Vue from 'vue';

const EventBus = new Vue();

const events = {
  'UPDATE_COMPOSITION': 'updateComposition',
};

export {
  EventBus,
  events 
};
