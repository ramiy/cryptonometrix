import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/views/pages/Home.vue'
import About from '@/views/pages/About.vue'
import NotFound from '@/views/pages/NotFound.vue'
import BTCProduction from '@/views/stats/BTCProduction.vue'
import BTCProductionAll from '@/views/stats/BTCProductionAll.vue'
import BTCHodlPosition from '@/views/stats/BTCHodlPosition.vue'
import BTCHodlPositionAll from '@/views/stats/BTCHodlPositionAll.vue'
import Hashrate from '@/views/stats/Hashrate.vue'
import HashrateAll from '@/views/stats/HashrateAll.vue'
import Company from '@/views/stats/Company.vue'
import CompanyAll from '@/views/stats/CompanyAll.vue'

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
    path: '/hashrate/:company',
    name: 'Hashrate',
    component: Hashrate,
  },
  {
    path: '/hashrate/',
    name: 'HashrateAll',
    component: HashrateAll,
  },
  {
    path: '/company/:company',
    name: 'Company',
    component: Company,
  },
  {
    path: '/company/',
    name: 'CompanyAll',
    component: CompanyAll,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

export default router;