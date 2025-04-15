<template>
  <div class="home">
    <!-- Main User List Screen -->
    <div v-if="!showAddScreen">
      <div class="header">
        <h1>User Management</h1>
        <button @click="showAddScreen = true" class="add-btn">
          Add New User
        </button>
      </div>

      <div class="entries-list" v-if="users.length > 0">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button @click="deleteUser(user.id)" class="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="no-entries" v-else>
        <p v-if="!isLoading">No users found.</p>
        <p v-else>Loading users...</p>
      </div>
    </div>

    <!-- Add User Screen -->
    <div v-else class="add-user-screen">
      <div class="form-container">
        <h2>Add New User</h2>
        <form @submit.prevent="saveUser" class="entry-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              id="name"
              v-model="newUser.name"
              required
              placeholder="Enter name"
            />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="newUser.email"
              required
              placeholder="Enter email"
            />
          </div>

          <div class="form-actions">
            <button
              type="button"
              @click="showAddScreen = false"
              class="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" class="submit-btn" :disabled="isLoading">
              {{ isLoading ? "Saving..." : "Save User" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
      },
      users: [],
      isLoading: false,
      error: null,
      showAddScreen: false,
    };
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          "https://mobileapi-fbpw.onrender.com/api/User",
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        this.users = await response.json();
      } catch (err) {
        this.error = err.message;
        console.error("Error fetching users:", err);
      } finally {
        this.isLoading = false;
      }
    },
    async saveUser() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          "https://mobileapi-fbpw.onrender.com/api/User",
          {
            method: "POST",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.newUser.name,
              email: this.newUser.email,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save user");
        }

        // Reset form
        this.newUser = {
          name: "",
          email: "",
        };

        // Go back to list view
        this.showAddScreen = false;

        // Refresh the user list
        await this.fetchUsers();
      } catch (err) {
        this.error = err.message;
        console.error("Error saving user:", err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(userId) {
      if (!confirm("Are you sure you want to delete this user?")) {
        return;
      }

      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch(
          `https://mobileapi-fbpw.onrender.com/api/User/${userId}`,
          {
            method: "DELETE",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        // Refresh the user list
        await this.fetchUsers();
      } catch (err) {
        this.error = err.message;
        console.error("Error deleting user:", err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.add-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #1d4ed8;
}

.add-user-screen {
  background: rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
}

.form-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
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
}

.submit-btn:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.submit-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

.entries-list {
  margin-top: 2rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
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

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
}
</style>
