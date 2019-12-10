import Vue from 'vue'
import VueRouter from 'vue-router'
import Excel from '../views/Excel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'excel',
    component: Excel
  }
]

const router = new VueRouter({
  routes
})

export default router
