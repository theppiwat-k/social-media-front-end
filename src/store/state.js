import { createStore } from "vuex";
import AuthenticationService from "../services/authentication.service";

const store = createStore({
  state: {
    isAuthenticated: false,
    userInformation: {},
  },
  mutations: {
    authenticate(state, authentication) {
      state.isAuthenticated = authentication;
    },
    userInformation(state, userInformation) {
      state.userInformation = userInformation;
    },
  },
  actions: {
    authenticate({ commit }) {
      AuthenticationService.authorization()
        .then((response) => {
          commit("authenticate", true);
        })
        .catch((error) => {
          console.error(error);
          commit("authenticate", false);
        });
    },
    userInformation({ commit }) {
      AuthenticationService.userProfile()
        .then((response) => {
          console.log(response);
          let userInformation = {
            id: response.data.data.id,
            email: response.data.data.email,
            username: response.data.data.username,
          };
          commit("userInformation", userInformation);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {},
});

export default store;
