import { computed } from 'vue';
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
  const isAuthenticated = computed(() => {
    if (store.state.isAuthenticated !== undefined) {
      return store.state.isAuthenticated;
    }
    return undefined;
  });
  if (isAuthenticated.value !== undefined) {
    if (to.name !== 'Login' && !isAuthenticated.value) {
      // If user is not authenticated, redirect to login page and save intended URL
      localStorage.setItem('intendedUrl', to.fullPath);
      return '/login';
    } else if (to.name === 'Login' && isAuthenticated.value) {
      // If user is authenticated and tries to access login page,
      // redirect to main page
      return '/main';
    } else if (isAuthenticated.value) {
      // If user is authenticated, check for intended URL and redirect if it exists
      const intendedUrl = localStorage.getItem('intendedUrl');
      if (intendedUrl) {
        localStorage.removeItem('intendedUrl');
        return intendedUrl;
      }
    }
  }
});

export default router;
