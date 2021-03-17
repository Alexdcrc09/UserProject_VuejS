<template>
  <div class="headt" />
  <h1>Ajouter un nouvel utilisateur</h1>
  <br>
  <div>
    <div
      class="form"
    >
      <div class="form-row">
        <div class="col">
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
        <div class="col">
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
      <div class="form-row">
        <div class="col">
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
        <div class="col">
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
      <div class="form-row">
        <div class="col">
          <file-upload />
        </div>
        <div class="col">
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
          @click="AddUser"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import FileUpload from '../components/FileUpload.vue'

export default {
  name: 'AddUser',
  components: {
    FileUpload
  },

  data() {
      return {
      user:{}
    }
  },
  methods: {
     back(){
      this.$router.go(-1);
    },
      async AddUser() {
        const response = await axios.post(`http://localhost:6929/users/`, this.user)
            this.message = response.data.messageError
              if(!this.message){
                this.$toast.success("Utilisateur ajouté", {
                //theme of the toast you prefer
                theme: 'bubble',
                //position of the toast container
                position: 'top-right',
                //display time of the toast
                duration: 5000
            }),
                  this.$router.push({ path : '/users' });
                } else{
                  this.$toast.error(this.message)
                }
              }
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
}

.form {
  display: inline-block;
  width : 60%;
}

.btn-container {
  display: flex !important;
  justify-content: space-between;
      }

#btn {
  display: block;
  margin-top:20px !important;
}

#checkbox-gender {
  padding: .375rem .75rem;
  color: #495057;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

</style>
