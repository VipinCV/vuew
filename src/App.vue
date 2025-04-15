<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="logo">MyApp</div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
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
  --primary-color: #6200ea;
  --accent-color: #ff4081;
  --text-color: #333;
  --background-color: #f4f4f9;
  --font-family: 'Segoe UI', sans-serif;
}

body {
  font-family: var(--font-family);
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--background-color);
}

header {
  background-color: var(--primary-color);
  color: white;
  padding: 1em;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2em;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  position: relative;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: var(--accent-color);
}

.nav-link.router-link-exact-active {
  color: var(--accent-color);
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent-color);
  border-radius: 2px;
}

main {
  padding: 2em;
  flex-grow: 1;
}
</style>
