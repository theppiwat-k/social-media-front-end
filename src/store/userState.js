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
      state.userInformation =  Object.freeze(userInformation);
    },
    logout(state){
      state.isAuthenticated = false
    }
  },
  actions: {
    authenticate({ commit }) {
      AuthenticationService.authorization()
        .then((response) => {
          const activeStatus = response.data.data.active;
          commit("authenticate", activeStatus);
        })
        .catch((error) => {
          console.error(error);
          commit("authenticate", false);
        });
    },
    userInformation({ commit }) {
      AuthenticationService.userProfile()
        .then((response) => {
          let userInformation = {
            id: response.data.data.id,
            email: response.data.data.email,
            username: response.data.data.username,
            avatar: response.data.data.avatar,
          };
          commit("userInformation", userInformation);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout({commit}){
      commit("logout", false)
    }
  },
  modules: {},
});

export default store;
