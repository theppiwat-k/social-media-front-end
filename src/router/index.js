import { createWebHistory, createRouter } from "vue-router";
import store from "../store/state";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/authentication/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  store.dispatch("authenticate");
  if (to.name !== "Login" && !store.state.isAuthenticated) {
    return "/login";
  }
});

export default router;
