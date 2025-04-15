<template>
  <div id="app">
    <header>
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
              <router-link to="/service2" class="dropdown-item">
                <span class="item-icon">🛠️</span>
                <span>Service 2</span>
              </router-link>
              <router-link to="/service3" class="dropdown-item">
                <span class="item-icon">🔧</span>
                <span>Service 3</span>
              </router-link>
            </div>
          </div>
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Global Styles */
body {
  font-family: var(--font-family);
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-color);
  padding: 1em 2em;
  box-shadow: 0 4px 6px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
}

.nav-links {
  display: flex;
  gap: 2em;
  align-items: center;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  padding: 0.8em 0;
  font-size: 1.05rem;
}

.nav-link:hover {
  color: var(--hover-color);
}

.nav-link.router-link-exact-active {
  color: var(--accent-color);
  font-weight: 600;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0.5em;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--accent-color);
  border-radius: 3px;
  animation: underline 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes underline {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Dropdown Styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: transparent;
  color: var(--text-color);
  padding: 0.8em 1.2em;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5em;
  transition: color 0.3s ease;
  border-radius: 8px;
}

.dropbtn:hover {
  color: var(--hover-color);
}

.arrow {
  border: solid var(--text-color);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: transform 0.3s ease;
}

.down {
  transform: rotate(45deg);
}

.dropdown:hover .arrow {
  transform: rotate(225deg);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--card-bg);
  min-width: 200px;
  box-shadow: 0 10px 15px var(--shadow-color);
  border-radius: 8px;
  z-index: 10;
  padding: 0.5rem 0;
}

.dropdown-item {
  color: var(--text-color);
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--accent-color);
}

.item-icon {
  font-size: 1.1rem;
}

.dropdown:hover .dropdown-content {
  display: block;
}

main {
  padding: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar
::contentReference[oaicite:1]{index=1}
 
