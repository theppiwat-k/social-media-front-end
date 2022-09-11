import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/authentication/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/components/views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
