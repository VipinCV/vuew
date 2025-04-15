import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', redirect: '/' } // catch-all route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
