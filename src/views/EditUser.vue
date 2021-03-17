<template>
  <div class="headt" />
  <h1>Modification de {{ this.user.firstName }}</h1>
  <br>
  <div>
    <div class="form">
      <div class="form-group">
        <div
          id="container-img"
          class="form-row"
        >
          <img
            class="img-form" 
            :src="user.avatarUrl" 
            alt="ImgAvatar"
          >
        </div>
        <div>
          <label
            class="title-label"
            for="Nom"
          >Nom</label>
          <input
            v-model="user.lastName"
            type="text"
            class="form-control"
            placeholder="Modifier votre nom"
          >
        </div>
        <div>
          <label
            class="title-label"
            for="Prenom"
          >Prénom</label>
          <input
            v-model="user.firstName"
            type="text"
            class="form-control"
            placeholder="Modifier votre prénom"
          >
        </div>
      </div>
      <div class="form-group">
        <div>
          <label
            class="title-label"
            for="birthDate"
          >Date de naissance</label>
          <input
            v-model="user.birthDate"
            type="date"
            class="form-control"
            placeholder="Modifier votre date de naissance"
          >
        </div>
        <div>
          <label
            class="title-label"
            for="email"
          >Email</label>
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            placeholder="Modifier votre email"
          >
        </div>
      </div>
      <div class="form-group">
        <div>
          <label
            for="gender-select"
            class="title-label"
          >Choisissez votre genre</label>
          <select
            id="checkbox-gender"
            v-model="user.gender"
            name="gender"
            class="form-control"
          >
            <option value="">
              Choisissez votre genre
            </option>
            <option value="male">
              male
            </option>
            <option value="female">
              female
            </option>
          </select>
        </div>
      </div>
      <div class="btn-container">
        <button
          id="btn"
          class="btn btn-primary"
          @click="back"
        >
          Retour
        </button>
        <button
          id="btn"
          class="btn btn-primary"
          type="submit"
          @click="Delete"
        >
          Supprimer
        </button>
        <button
          id="btn"
          class="btn btn-primary"
          type="submit"
          @click="Edituser"
        >
          Modifier
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'EditUser',
  components: {

  },

  data() {
    return {
      user:{}
    }
  },
    created () {
      this.fetchUsers();
    },

  methods: {
     back(){
      this.$router.go(-1);
    },
    fetchUsers() {
      axios
        .get(`http://localhost:6929/users/${this.$route.params.id}`)
        .then(response => {this.user = response.data; console.log(this.user);}
        )
    },
    Edituser() {
      axios
        .put(`http://localhost:6929/users/${this.$route.params.id}`,this.user)
        .then(response => {this.user = response.data;
        this.$toast.success(`La modification a bien été effectué`, {
        //theme of the toast you prefer
        theme: 'bubble',
        //position of the toast container
        position: 'top-right',
        //display time of the toast
        duration: 5000
    })})
    },
    Delete() {
      axios
        .delete(`http://localhost:6929/users/${this.$route.params.id}`)
        .then(response => {this.user = response.data;
        this.$toast.success(`Vous avez bien supprimé l'utilisateur`, {
        //theme of the toast you prefer
        theme: 'bubble',
        //position of the toast container
        position: 'top-right',
        //display time of the toast
        duration: 5000
    })}
        )
        .then(setTimeout(function () { this.fetchHole(this.$router.push({ path: '/users' })) }.bind(this), 1000))

    },
  }
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

.th {
    vertical-align: center !important;
  }

.img-avatar {
  width:130px;
  height: auto;
  text-align: center;
}

.title-label {
  display: flex !important;
    margin: .5rem !important;
  font-weight: 800;
}

.form {
  display: inline-block;
  width : 35%;
}

.btn-container {
  display: flex !important;
  justify-content: space-between;
      }

#btn {
  display: block;
  margin:0 !important;
  margin-bottom: 30px !important;
}

.img-form {
  width:60%;
  text-align: center;
}

#container-img{
  display:block;
}
</style>
