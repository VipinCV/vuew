<template>
  <div id="app">
    <header v-if="isLoggedIn">
      <nav class="navbar">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span>MyApp</span>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <div class="dropdown">
            <button class="dropbtn">
              Services
              <i class="arrow down"></i>
            </button>
            <div class="dropdown-content">
              <router-link to="/users" class="dropdown-item">
                <span class="item-icon">👥</span>
                <span>Users</span>
              </router-link>
              <router-link to="/product" class="dropdown-item">
                <span class="item-icon">🛠️</span>
                <span>Product</span>
              </router-link>
              <router-link to="/purchase" class="dropdown-item">
                <span class="item-icon">🔧</span>
                <span>Purchase</span>
              </router-link>
              <router-link to="/sale" class="dropdown-item">
                <span class="item-icon">🔧</span>
                <span>Sale</span>
              </router-link>
            </div>
          </div>
          <router-link to="/login" class="nav-link">Contact</router-link>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'

 
const authStore = useAuthStore()

const router = useRouter()
const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})

function logout() { 
       isLoggedIn.value = false
       authStore.token = null
       authStore.refreshToken = null
      authStore.tokenExpiry = null
      localStorage.clear() 
  router.push('/login')
}
</script>

<style>
:root {
  --primary-color: #4A90E2;
  --secondary-color: #D4E157;
  --accent-color: #FF7043;
  --background-color: #F5F5F5;
  --text-color: #212121;
  --light-text: #FFFFFF;
  --card-bg: #FFFFFF;
  --font-family: 'Poppins', sans-serif;
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

body {
  font-family: var(--font-family);
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
  font-size: 14px;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--light-text);
  padding: 0.6em 1.5em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  font-size: 0.9rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--light-text);
}

.nav-links {
  display: flex;
  gap: 1.2em;
  align-items: center;
}

.nav-link {
  color: var(--light-text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: var(--transition);
  padding: 0.6em 0;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: var(--accent-color);
}

.logout-btn {
  background-color: transparent;
  border: 1px solid var(--light-text);
  color: var(--light-text);
  padding: 0.4em 0.8em;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition);
}

.logout-btn:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: transparent;
  color: var(--light-text);
  padding: 0.6em 1em;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5em;
  transition: var(--transition);
  border-radius: 8px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--card-bg);
  min-width: 180px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  z-index: 10;
  overflow: hidden;
  transform: translateY(10px);
  opacity: 0;
  transition: var(--transition);
  padding: 0.3rem 0;
}

.dropdown-item {
  color: var(--text-color);
  padding: 0.6rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: var(--transition);
}

.dropdown-item:hover {
  background-color: rgba(255, 112, 67, 0.1);
  color: var(--accent-color);
}

.dropdown:hover .dropdown-content {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

main {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .nav-links {
    width: 100%;
    flex-direction: column;
    gap: 0;
    margin-top: 1rem;
  }

  .nav-link,
  .logout-btn {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    text-align: left;
  }

  .dropdown {
    width: 100%;
  }

  .dropbtn {
    width: 100%;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .dropdown-content {
    position: static;
    box-shadow: none;
    display: none;
    width: 100%;
    border-radius: 0;
    transform: none;
    opacity: 1;
    max-height: 0;
    transition: max-height 0.3s ease-out;
  }

  .dropdown:hover .dropdown-content {
    display: block;
    max-height: 500px;
  }

  main {
    padding: 1.5rem;
  }
}
</style>
