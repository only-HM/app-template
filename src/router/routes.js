export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dgl',
    name: 'Dgl',
    component: () => import('@/views/Game/Dgl/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/tyt',
    name: 'Tyt',
    component: () => import('@/views/Game/Tyt/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/ndj',
    name: 'Ndj',
    component: () => import('@/views/Game/Ndj/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/superWednesday',
    name: 'SuperWednesday',
    component: () => import('@/views/SuperWednesday/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: () => import('@/views/Coupons/index.vue'),
    meta: { requiresAuth: true },
  },
  {
    /**
     * 404
     */
    path: '/:pathMatch(.*)' || '/404',
    name: "NotFount",
    component: () => import('@/views/NotFound/404.vue'),
    meta: { requiresAuth: true },
  },
];

export default routes;