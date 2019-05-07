<template>
  <div v-if="load">
    Load
  </div>
  <b-form id="form" v-else>
   <b-form-input
     id="input-1"
     v-model="link"
     type="email"
     required
     placeholder="Entrer votre lien"
   ></b-form-input>
   <b-button variant="primary" @click="onSubmit">Envoyer</b-button>
  </b-form>
</template>

<script>
import firebase from '../../libs/firebase.js';

export default {
  data () {
    return {
      link: '',
      load: false
    }
  },
  methods: {
    onSubmit (evt) {
      this.load = true
      evt.preventDefault()
      if (!this.link) {
        return alert('Veuillez rentrer un lien correct')
      }

      firebase.insertData(this.link, () => {
        this.link = ''
        this.load = false
      })
    }
  }
}
</script>

<style>
  #form {
    text-align: left;
    padding: 20px;
  }
  button{
    width: 100%;
    height: 40px;
    margin-top: 20px;
  }
</style>
