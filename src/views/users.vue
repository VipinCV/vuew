<template>
  <div class="home">
    <h1>Home Page</h1>
    
    <div class="form-container">
      <h2>Add New Entry</h2>
      <form @submit.prevent="saveEntry" class="entry-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            v-model="newEntry.name" 
            required 
            placeholder="Enter your name"
          >
        </div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="newEntry.email" 
            required 
            placeholder="Enter your email"
          >
        </div>
        
        <button type="submit" class="submit-btn">Save Entry</button>
      </form>
    </div>
    
    <div class="entries-list" v-if="entries.length > 0">
      <h2>Saved Entries</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in entries" :key="index">
            <td>{{ entry.name }}</td>
            <td>{{ entry.email }}</td>
            <td>
              <button @click="deleteEntry(index)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="no-entries" v-else>
      <p>No entries saved yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      newEntry: {
        name: '',
        email: ''
      },
      entries: []
    }
  },
  methods: {
    saveEntry() {
      // Add the new entry to the entries array
      this.entries.push({
        name: this.newEntry.name,
        email: this.newEntry.email
      });
      
      // Reset the form
      this.newEntry = {
        name: '',
        email: ''
      };
      
      // Optional: Save to localStorage
      localStorage.setItem('entries', JSON.stringify(this.entries));
    },
    deleteEntry(index) {
      // Remove the entry at the specified index
      this.entries.splice(index, 1);
      
      // Update localStorage
      localStorage.setItem('entries', JSON.stringify(this.entries));
    }
  },
  mounted() {
    // Load saved entries from localStorage when component mounts
    const savedEntries = localStorage.getItem('entries');
    if (savedEntries) {
      this.entries = JSON.parse(savedEntries);
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-container {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.entry-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
}

.form-group input {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.submit-btn:hover {
  background-color: #1d4ed8;
}

.entries-list {
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  background-color: #f1f3f5;
  font-weight: 600;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c82333;
}

.no-entries {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}
</style>
