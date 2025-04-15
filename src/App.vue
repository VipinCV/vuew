<style>
:root {
  --primary-color: #6366f1;  /* Indigo */
  --secondary-color: #4f46e5; /* Deep indigo */
  --accent-color: #ec4899;   /* Pink */
  --light-accent: #a855f7;   /* Purple */
  --text-color: #1e293b;     /* Slate-800 */
  --light-text: #f8fafc;     /* Slate-50 */
  --background-color: #f1f5f9; /* Slate-100 */
  --card-bg: #ffffff;
  --success: #10b981;        /* Emerald */
  --warning: #f59e0b;        /* Amber */
  --error: #ef4444;         /* Red */
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

header {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  box-shadow: var(--shadow-md);
}

.logo {
  background: linear-gradient(
    to right,
    var(--light-accent),
    var(--accent-color)
  );
  -webkit-background-clip: text;
  background-clip: text;
}

.nav-link {
  color: var(--light-text);
}

.nav-link:hover {
  color: var(--light-accent);
}

.nav-link.router-link-exact-active {
  color: var(--light-accent);
}

.nav-link.router-link-exact-active::after {
  background-color: var(--accent-color);
}

/* Dropdown styles */
.dropbtn {
  color: var(--light-text);
}

.dropbtn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--light-accent);
}

.dropdown-content {
  background-color: var(--card-bg);
  border: 1px solid #e2e8f0;
}

.dropdown-item {
  color: var(--text-color);
}

.dropdown-item:hover {
  background-color: #f8fafc;
  color: var(--primary-color);
}

/* Main content area */
main {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  margin: 2rem auto;
  padding: 2rem;
}

/* Responsive mobile menu */
@media (max-width: 768px) {
  .nav-link {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .dropdown-content {
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
