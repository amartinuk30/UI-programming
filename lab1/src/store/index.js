import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUserPhoto(state, photo) {
      if (state.user) {
        state.user.photo = photo;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    users: state => state.users,
  },
  actions: {
    register({ commit }, user) {
      commit('addUser', user);
    },
    login({ commit, state }, { email, password }) {
      const user = state.users.find(user => user.email === email && user.password === password);
      if (user) {
        commit('setUser', user);
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit('logout');
    },
    setUserPhoto({ commit }, photo) {
      commit('setUserPhoto', photo);
    }
  },
});

export default store;
