
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f4f4f9;
  margin: 0;
}
nav {
  background-color: #6200ea;
  padding: 1em;
  display: flex;
  gap: 1em;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
nav a.router-link-exact-active {
  border-bottom: 2px solid yellow;
}
</style>
