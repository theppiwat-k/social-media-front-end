import { createStore } from "vuex";
import AuthenticationService from "../services/authentication.service";

const store = createStore({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    authenticate(state, authentication) {
      state.isAuthenticated = authentication;
    },
  },
  actions: {
    authenticate({ commit }) {
      AuthenticationService.userProfile()
        .then((response) => {
          console.log(response);
          commit("authenticate", true);
        })
        .catch((error) => {
          console.error(error)
          commit("authenticate", false);
        });
    },
  },
  modules: {},
});

export default store;
