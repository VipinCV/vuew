
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import users from '../views/users.vue'
import Product from '../views/Product.vue'
import Purchase from '../views/Purchase.vue'
import Sale from '../views/Sale.vue'
import bill from '../views/bill.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/users', name: 'users', component: users, meta: { requiresAuth: true } },
  { path: '/product', name: 'Product', component: Product, meta: { requiresAuth: true } },
  { path: '/purchase', name: 'Purchase', component: Purchase, meta: { requiresAuth: true } },
  { path: '/sale', name: 'Sale', component: Sale, meta: { requiresAuth: true } },
   { path: '/bill/:billNo', name: 'bill', component: bill, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const isLoggedIn = !!authStore.token || !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})



export default router
