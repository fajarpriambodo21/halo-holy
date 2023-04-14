import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import CreateView from '../views/CreateView.vue'
import EditView from '../views/EditView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },    
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/create/',
      name: 'create',
      component: CreateView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView
    },
  ]
})

export default router
