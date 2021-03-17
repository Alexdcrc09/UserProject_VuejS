<template>
  <div class="file">
    <form
      enctype="multipart/form-data"
      @submit.prevent="onSubmit"
    >
      <div>
        <label
          class="title-label"
          for="phone"
        >Urlphoto</label>
        <input
          ref="file"
          name="avatar"
          type="file"
          @change="onSelect"
        >
      </div>
      <div>
        <button>Submit</button>
        <h5>{{ message }}</h5>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'FileUpload',

  data() {
      return{
          file:"",
          message: ""
      }
  },
methods: {
    onSelect(){
        const file = this.$refs.file.files[0];
        this.file = file;
    },
    async onSubmit(){
        const formData = new FormData();
        formData.append('file',this.file);
        try {
            await axios.post('/upload',formData);
            this.message = 'Uploaded !!!'
        }
        catch(err){
            console.log(err);
            this.message = 'Something went wrong oupsi !!'
        }
    }
},
}
</script>