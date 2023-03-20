import { createWebHistory, createRouter } from 'vue-router';
import store from '../store/userState';

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/authentication/LoginPage.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/views/HomePage.vue'),
    children: [
      {
        path: '/main',
        name: 'MainPage',
        component: () => import('@/components/views/MainPage.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () =>
          import('@/components/general/profileConfig/ProfileConfig.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  await store.dispatch('authenticate');
  const isAuthenticated = store.state.isAuthenticated
  if (to.name !== 'Login' && !isAuthenticated) {
    return '/login';
  }
});

export default router;
