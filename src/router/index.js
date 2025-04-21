
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import users from '../views/users.vue'
import Product from '../views/Product.vue'
import Purchase from '../views/Purchase.vue'
import Sale from '../views/Sale.vue'
import Bill from '../views/bill.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/users', name: 'users', component: users },
  { path: '/product', name: 'Product', component: Product },
  { path: '/purchase', name: 'Purchase', component: Purchase },
  { path: '/sale', name: 'Sale', component: Sale },
   { path: '/bill/:billNo', name: 'Bill', component: Bill },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
