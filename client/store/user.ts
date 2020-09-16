
const state = () => ({
  userdata: {}
})

const getters = {
  get_userdata: (state) => {
    return state.userdata;
  }
};
const mutations = {
  UPDATEUSERDATA(state, data) {
    state.userdata = data;
  }
}

const actions = {
  action_userdata({commit}, data) {
		commit('UPDATEUSERDATA', data);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
