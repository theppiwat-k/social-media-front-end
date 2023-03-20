import { createWebHistory, createRouter } from 'vue-router';
import store from '../store/userState';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/authentication/LoginPage.vue'),
  },
  {
    path: '/',
    redirect: '/main',
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

router.beforeEach(async (to, from) => {
  const isAuthenticated = store.dispatch('authenticate');
  if (to.name !== 'Login' && !isAuthenticated) {
    return '/login';
  }
});

export default router;
