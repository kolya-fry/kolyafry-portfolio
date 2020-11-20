import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty'
    },
    component: () =>
      import('@/views/Login.vue')
  },
  {
    path: '/frytter',
    name: 'Frytter',
    meta: {
      layout: 'main'
    },
    component: () =>
      import('@/views/Frytter.vue')
  },
  {
    path: '/planner',
    name: 'Planner',
    meta: {
      layout: 'main',
    },
    component: () =>
      import('@/views/Planner.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
