import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    date: new Date(),
    viewHasToday: true,
    tasks: [],
    popup: {
      isOpen: false,
      date: '',
      startTime: '',
      endTime: '',
    },
  },

  getters,
  actions,
  mutations,
});
