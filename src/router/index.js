import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

/**
 * 路由守卫 前置
 * 鉴权
 */
router.beforeEach(async (to, from, next) => {
  console.log(to);
  console.log(from);
  console.log('------------------');
  const toPath = to.href;
  if (toPath === '/dist/index.html') {
    next({ name: 'Login' });
  } else {
    next();
  };
});

export default router;