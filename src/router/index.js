import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import EditUser from '../views/EditUser.vue'
import AddUser from '../views/AddUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/users',
    name: 'Users',
    component: Users
  },

  {
    path: '/users',
    component: Users,
  },

  { 
    path: '/user/:id', 
    name : 'EditUser',
    component: EditUser
  },

  { 
    path: '/user', 
    name : 'AddUser',
    component: AddUser
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
