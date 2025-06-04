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