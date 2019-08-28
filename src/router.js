import Vue from 'vue'
import Router from 'vue-router'
import Consumption from './views/Consumption.vue'
import Menu from './views/Menu.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Menu
    },
    {
      path: '/consumption',
      name: 'consumption',
      component: Consumption
    },
  ]
})
