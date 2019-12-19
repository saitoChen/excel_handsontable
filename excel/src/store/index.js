import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableInstance: {},
    currentRange: {},
    originData: []
  },
  mutations: {
    SET_INSTANCE(state, instance) {
      state.tableInstance = instance;
    },
    SET_CUR_RANGE(state, data) {
      state.currentRange = data;
    },
    SET_ORIGIN_DATA(state, data) {
      state.originData = data;
    }
  },
  actions: {},
  modules: {}
});
