import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'storages',
        component: () => import('../views/backend/Storages.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
