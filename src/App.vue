<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
  >
  <h1> Filter and sort users with VueJS  </h1>
  <HelloWorld :users="users" />
  <button
    id="btn"
    @click="fetchUsers"
  >
    Fetch users <i
      id="icon-btn"
    />  
  </button>
  <label
    id="checkbox"
    for="male"
  ><input
    v-model="genderFilter"
    type="checkbox"
    value="male"
  > Homme</label>
  <label
    id="checkbox"
    for="female"
  >  <input
    v-model="genderFilter"
    type="checkbox"
    value="female"
  >
    Femme</label>
  <input
    id="searchbox"
    v-model="search"
    type="text"
    placeholder="rechercher"
  >
  <table
    id="tbl-users"
    class="table table-hover"
  >
    <thead>
      <tr>
        <th>Image</th>
        <th>
          Nom
        </th>
        <th>
          Prenom
        </th>
        <th>
          Email
        </th>
        <th>
          Genre
        </th>
        <th>
          Tel
        </th>
        <th
          id="th-click"
          @click="sort('age')"
        >
          Âge <i
            :class="[collapsed ? 'fa-chevron-up' : 'fa-chevron-down', 'fa']"
            @click=" collapsed = !collapsed" 
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in sortedUsers "
        :key="user.email"
      >
        <td><img :src="user.picture.thumbnail"></td>
        <td>{{ user.name.first }}</td>
        <td>{{ user.name.last }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.dob.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  data() {
    return {
      users:[],
      genderFilter : ['male', 'female'],
      search: '',
      currentSort:'age',
      currentSortDir:'asc',
      collapsed: true,
    }
  },

  computed: {
      usersFiltered() {
      return this.users.filter(user => this.genderFilter.includes(user.gender))
    },

    filteredsearch () {
      return this.usersFiltered.filter((users) => {
        return users.name.first.toLowerCase().match(this.search.toLowerCase());
      });
    },

    sortedUsers:function() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.filteredsearch.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if( a.dob.age < b.dob.age ) return -1 * modifier;
        if( a.dob.age > b.dob.age ) return 1 * modifier;
        return 0;
      });
    }

  },
  methods: {
    fetchUsers() {
      axios
        .get('https://randomuser.me/api/?results=20')
        .then(response => {
          this.users.push.apply(this.users,response.data.results)
        })
        .catch(error => {
            console.log(error)
            this.errored = true
          })
    },

    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    
  },
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #072872;
  font-size: 20px;
  text-align: left;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #072872;
  margin-top: 60px;
}
#checkbox {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #072872;
  font-size: 20px;
  margin: 20px;
  font-weight: 700;
  cursor: pointer;

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
}

#searchbox {
  margin-right: 10px;
  padding: 0px 5px;
  border-radius: 5px;
  border-color: #072872;
}

#th-click {
  cursor: pointer;
  border-radius: 1px;
}

h1 {
  font-size: 25px;
  text-align: center;
  font-weight:800;
}
</style>
