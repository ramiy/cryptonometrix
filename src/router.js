import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import BTCProduction from '@/views/stats/BTCProduction.vue'
import BTCProductionAll from '@/views/stats/BTCProductionAll.vue'
import BTCHodlPosition from '@/views/stats/BTCHodlPosition.vue'
import BTCHodlPositionAll from '@/views/stats/BTCHodlPositionAll.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/btc-production/:company',
    name: 'BTCProduction',
    component: BTCProduction,
  },
  {
    path: '/btc-production/',
    name: 'BTCProductionAll',
    component: BTCProductionAll,
  },
  {
    path: '/btc-hodl-position/:company',
    name: 'BTCHodlPosition',
    component: BTCHodlPosition,
  },
  {
    path: '/btc-hodl-position/',
    name: 'BTCHodlPositionAll',
    component: BTCHodlPositionAll,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;