<template>
  <DispUsers msg="Welcome to Your Vue.js App" />
  <div class="headt">
    <button
      class="btn btn-primary"
      @click="fetchUsers"
    >
      Réupérer des utilisateurs
    </button>
    <label>
      <input
        v-model="genderFilter"
        type="checkbox"
        value="male"
        :disabled="genderFilter.length<2 && genderFilter.includes('male')"
      >
      Hommes
    </label>
    <label>
      <input
        v-model="genderFilter"
        type="checkbox"
        value="female"
        :disabled="genderFilter.length<2 && genderFilter.includes('female')"
      >
      Femmes
    </label>
    <label>
      Rechercher :
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher"
      >
    </label> 
    <button
      class="btn btn-primary"
      @click="resetFilters"
    >
      Reset filtre
    </button> 
    <label />
    <p v-if="sortDirection === ''" />
    <p v-if="sortDirection === 'asc'" />
    <p v-if="sortDirection === 'desc'" />
  </div>
  <p v-if="users.length">
    il y a <strong>{{ searchedUsers.length }}</strong> utilisateur{{ searchedUsers.length > 1 ? 's' : '' }} filtré{{ searchedUsers.length > 1 ? 's' : '' }} sur {{ users.length }} totaux
  </p>
  <p v-else>
    il n'y a <strong>aucun</strong> utilisateur
  </p>
  <table
    v-if="users.length"
    class="table table-hover"
  >
    <thead>
      <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Genre</th>
        <th>
          <button
            class="btn btn-light"
            @click="changeSort"
          >
            Âge
            <i
              v-if="sortDirection"
              class="fa"
              :class="[ sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down' ]"
            />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in searchedUsers"
        :key="user.email"
      >
        <td><img :src="user.picture.thumbnail"></td>
        <td>{{ user.name.first }} {{ user.name.last }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.dob.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      users: [],
      errored: false,
      genderFilter: (this.$route.query.gender || 'male,female').split(','),
      search: this.$route.query.search || '',
      sortDirection: this.$route.query.sortDirection || '',
    }
  },
  computed: {
    searchedUsers() {
      return this.users
      .filter((user) => this.genderFilter.includes(user.gender))
      .filter((user) => {
        return (user.name.first.toLowerCase().includes(this.search.toLowerCase())) ||
        (user.name.last.toLowerCase().includes(this.search.toLowerCase()))
      })
      .sort((a,b) => {
        if (!this.sortDirection) return 0;
        const  modifier = this.sortDirection === 'desc' ? -1 : 1;
        return (a.dob.age - b.dob.age) * modifier;
      })
    },
  },

// affiche dans l'url le chemin :
  watch:{
    genderFilter() {
      this.updateQuery()
    },
    search() {
      this.updateQuery()
    },
    sortDirection() {
      this.updateQuery()
    }
  },
  // fetch au chargement de la page
  //
  // created(){ this.fetchUsers()},

  methods: {
    fetchUsers() { 
      axios
        .get('https://randomuser.me/api/?results=20')
        .then(response => {
         this.users = [...this.users, ...response.data.results]
         //this.users = this.users.concat(response.data.results)
        })
        .catch(error => {
          console.error(error)
          this.errored = true
        })
    },
    changeSort() {
      if (this.sortDirection === ''){
        this.sortDirection = 'asc'
        return this.users
      }else if (this.sortDirection === 'asc'){
        this.sortDirection = 'desc'
      } else if (this.sortDirection === 'desc'){
        this.sortDirection = ''
      }
    },
    updateQuery () {
      const query = {}
      if (this.genderFilter.length < 2) {
        query.gender = this.genderFilter.join('')
      }
      if (this.search) {
        query.search = this.search
      }
      if (this.sortDirection) {
        query.sort = this.sortDirection
      }
      this.$router.push({query})
    },
    resetFilters () { 
      this.genderFilter = ['male','female'],
      this.search = ''
      this.sortDirection = ''
    }
  },
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 18px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.headt{
  display: flex;
  justify-content: space-around;
}
#btn {
  background-color: white;
  color: #072872;
  border: 2px solid #072872;
  border-radius: 5px;
  font-size: 20px;
  transition-duration: 0.4s;
  cursor: pointer;
}
#btn:hover {
  background-color: #072872;
  color: white;
  cursor: pointer;
}

</style>
