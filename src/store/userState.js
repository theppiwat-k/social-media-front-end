import AuthenticationService from "../services/authentication.service";
import { Store } from "vuex";
import { createStore } from 'vuex-extensions'

const store = createStore(Store,{
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
    logout(){
      store.reset();
    }
  },
  modules: {},
});

export default store;
