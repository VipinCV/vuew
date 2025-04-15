<template>
  <div id="app">
    <nav>
      <div class="dropdown">
        <button @click="toggleMenu" class="dropdown-toggle">
          <i class="fas fa-bars"></i> Menu
        </button>
        <div class="dropdown-menu" :class="{ open: isMenuOpen }">
          <router-link to="/" @click="closeMenu">
            <i class="fas fa-home"></i> Home
          </router-link>
          <router-link to="/about" @click="closeMenu">
            <i class="fas fa-user"></i> About
          </router-link>
          <router-link to="/contact" @click="closeMenu">
            <i class="fas fa-envelope"></i> Contact
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background: #fefefe;
  margin: 0;
}

nav {
  background-color: #0d47a1;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  background-color: #0d47a1;
  color: white;
  padding: 0.6em 1.2em;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.dropdown-toggle:hover {
  background-color: #1565c0;
}

.dropdown-menu {
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: #0d47a1;
  top: 100%;
  left: 0;
  z-index: 1;
  min-width: 180px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.dropdown-menu.open {
  display: flex;
}

.dropdown-menu a {
  color: white;
  padding: 0.75em 1.2em;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5em;
  transition: background 0.3s, padding-left 0.3s;
}

.dropdown-menu a:hover,
.dropdown-menu a.router-link-exact-active {
  background-color: #1565c0;
  padding-left: 1.5em;
  color: #ffca28;
}

/* 🌐 Responsive: mobile-first dropdown expands full width */
@media (max-width: 768px) {
  .dropdown {
    width: 100%;
  }

  .dropdown-toggle {
    width: 100%;
    justify-content: center;
  }

  .dropdown-menu {
    position: static;
    width: 100%;
    border-radius: 0;
  }

  .dropdown-menu a {
    justify-content: center;
  }
}
</style>
