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
  },
  {
    path: '/delivery-service',
    name: 'DeliveryService',
    meta: {
      layout: 'main',
    },
    component: () =>
      import('@/views/DeliveryService.vue')
  },
  {
    path: '/timers',
    name: 'timers',
    meta: {
      layout: 'main',
    },
    component: () => import( '@/views/Timers.vue')
  },
  {
    path: '/videos',
    name: 'videos',
    meta: {
      layout: 'main',
    },
    component: () => import( '@/views/Videos.vue')
  },
  {
    path: '/videos/:id',
    name: 'video',
    props: true,
    meta: {
      layout: 'main',
    },
    component: () => import('@/views/Watch.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    meta: {
      layout: 'main',
    },
    component: () => import('@/views/Chart.vue')
  },
  {
    path: '/Banner',
    name: 'banner',
    meta: {
      layout: 'main',
    },
    component: () => import('@/views/Banner.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
