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
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

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
  padding: 1em 2em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--light-text);
}

.nav-links {
  display: flex;
  gap: 2em;
  align-items: center;
}

.nav-link {
  color: var(--light-text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: var(--transition);
  padding: 0.8em 0;
  font-size: 1.05rem;
}

.nav-link:hover {
  color: var(--accent-color);
  transform: translateY(-2px);
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

/* Dropdown styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: transparent;
  color: var(--light-text);
  padding: 0.8em 1.2em;
  font-size: 1.05rem;
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

.dropbtn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--accent-color);
}

.arrow {
  border: solid var(--light-text);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transition: var(--transition);
}

.down {
  transform: rotate(45deg);
}

.dropdown:hover .arrow {
  transform: rotate(225deg);
  border-color: var(--accent-color);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--card-bg);
  min-width: 200px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  z-index: 10;
  overflow: hidden;
  transform: translateY(10px);
  opacity: 0;
  transition: var(--transition);
  padding: 0.5rem 0;
}

.dropdown-item {
  color: var(--text-color);
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: var(--transition);
}

.dropdown-item:hover {
  background-color: rgba(255, 112, 67, 0.1);
  color: var(--accent-color);
  transform: translateX(5px);
}

.item-icon {
  font-size: 1.1rem;
}

.dropdown:hover .dropdown-content {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

main {
  padding: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

@keyframes underline {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Responsive Design */
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

  .nav-link {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
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
