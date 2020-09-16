
import VueX from "vuex";
import user from './user';

const state = () => ({
  
})

const getters = {
  
};
const mutations = {
  
}

const actions = {
  nuxtServerInit({ commit}, {req}) {
    if (req.session['session_data']) {
      commit('user/UPDATEUSERDATA', req.session['session_data'])
    }
  }
}

const store = () => { 
    return new VueX.Store<any>({
        state,
        mutations,
        actions,
        modules: {
          user,
        }
    });
}
export default store;
