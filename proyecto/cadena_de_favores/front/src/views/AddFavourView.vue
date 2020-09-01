<template>
  <main id="addFavour">
    <vue-headful title='ENVÍA TU #FEIV' />
      <h1>#FEIVS</h1>
      <section>
        <h2>¿QUÉ NECESITAS?</h2>
        <p><strong>Localidad:</strong></p><input type='text' @focus="cleanError" v-model='newLocation' placeholder="Localidad" />
        <p><strong>Descripción:</strong></p><input type='text' @focus="cleanError" v-model='newDescription' placeholder="Descripción" />

        <p><strong>Categoría:</strong></p>
        <select name='select' @focus="cleanError" v-model='newCategory'>
          <option disabled value="">Elige una categoría</option>
          <option value='manitas'>Manitas</option> 
          <option value='nanny'>Nanny</option>
          <option value='transporte'>Transporte</option>
          <option value='tareas casa'>Tareas casa</option>
          <option value='otros' selected>Otros</option>
        </select>
        
        <p><strong>Razón:</strong></p>
        <select name='select' @focus="cleanError" v-model='newReason'>
          <option disabled value="">Cuál es tu razón</option>
          <option value='movilidad reducida'>Movilidad reducida</option> 
          <option value='hospitalización'>Hospitalización</option>
          <option value='vivo sol@'>Vivo sol@</option>
          <option value='otros' selected>Otros</option>
        </select>          
        
        <p><strong>Fecha límite:</strong></p><input type='datetime-local' @focus="cleanError" v-model='newDeadline' />
        <span class='error'>{{ message }}</span>
        <button @click="addFavour">Envía tu #FEIV</button>
      </section>
  </main>
</template>

<script>

import favours from '@/favours/favours';

import api from '@/api/api';
import swal from 'sweetalert2';

export default {
  name: 'AddFavourView',
  props: {
      isAuthenticated: Boolean,
  },
  data(){
    return{
      message:'',
      favourId: '',
      newLocation: '',
      newDescription:'',
      newCategory:'',
      newReason:'',
      newDeadline:'',
    }
  },
  computed: {
    isNotLogued(){
      if(!this.isAuthenticated){
        this.$router.push({name: 'Login'});
      }
    },
  },
  methods: {
    // Añadir un favor nuevo
    addFavour(){
      if(this.newLocation === '' || this.newDescription === '' || this.newCategory === '' || this.newReason === '' || this.newDeadline === ''){
        this.message = 'Debes rellenar todos los campos'
      } else {
        favours.addFavour(this.newLocation, this.newDescription, this.newCategory, this.newReason, this.newDeadline)
        .then(() => {
          this.cleanInputs();
          this.sweetalertCreate();
        })
        .catch(error => {
          this.message = error;
        })
      }
    },
    sweetalertCreate(){
      swal.fire({
          title: 'Favor Registrado',
          text: 'Tu favor se ha registrado correctamente',
          icon: 'info',
          confirmButtonText: 'Go',
          confirmButtonColor: 'var(--accent)',
      })
    },
    // Limpiar inputs
    cleanInputs() {
      console.log('limpiando')
      this.newLocation = '';
      this.newDescription = '';
      this.newCategory = '';
      this.newReason = '';
      this.newDeadline = '';
      this.message = '';
    },
    // Limpiar mensajes
    cleanError(){
      this.message = '';
    }
  },
}
</script>

<style scoped>
  #addFavour section {
    margin: 5rem auto 1rem auto;
  }
</style>