<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="logo">MyApp</div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
          <div class="dropdown">
            <button class="dropbtn">Services 
              <i class="arrow down"></i>
            </button>
            <div class="dropdown-content">
              <router-link to="/users">users</router-link>
              <router-link to="/service2">Service 2</router-link>
              <router-link to="/service3">Service 3</router-link>
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
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
  --light-accent: #93c5fd;
  --text-color: #1f2937;
  --light-text: #f9fafb;
  --background-color: #f3f4f6;
  --card-bg: #ffffff;
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  background: linear-gradient(135deg, var(--background-color) 0%, #e5e7eb 100%);
}

header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--light-text);
  padding: 1em 2em;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #ffffff, var(--light-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 1.5em;
  align-items: center;
}

.nav-link {
  color: var(--light-text);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease-in-out;
  padding: 0.5em 0;
}

.nav-link:hover {
  color: var(--light-accent);
  transform: translateY(-2px);
}

.nav-link.router-link-exact-active {
  color: var(--light-accent);
  font-weight: 600;
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--light-accent);
  border-radius: 2px;
  animation: underline 0.3s ease-out;
}

/* Dropdown styles */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: transparent;
  color: var(--light-text);
  padding: 0.5em 1em;
  font-size: 1em;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.3em;
  transition: all 0.3s ease;
}

.dropbtn:hover {
  color: var(--light-accent);
}

.arrow {
  border: solid var(--light-text);
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
  border-color: var(--light-accent);
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--card-bg);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.1);
  border-radius: 0.5em;
  z-index: 1;
  overflow: hidden;
  transform: translateY(5px);
  opacity: 0;
  transition: all 0.3s ease;
}

.dropdown-content a {
  color: var(--text-color);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: all 0.2s ease;
}

.dropdown-content a:hover {
  background-color: var(--light-accent);
  color: var(--light-text);
}

.dropdown:hover .dropdown-content {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

main {
  padding: 2em;
  max-width: 1200px;
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

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .nav-links {
    width: 100%;
    flex-direction: column;
    gap: 0;
  }
  
  .dropdown-content {
    position: static;
    box-shadow: none;
    display: none;
    width: 100%;
  }
  
  .dropdown:hover .dropdown-content {
    display: block;
  }
}
</style>
