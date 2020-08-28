<template>
  <main v-if='isNotLogued'>
    Aquí el componente del loading
  </main>
  <main id="addFavour" v-else>
    <vue-headful title='ENVÍA TU #FEIV' />
      <h1>#FEIVS</h1>
      <section>
        <h2>¿QUÉ NECESITAS?</h2>
        <p><strong>Localidad:</strong></p><input type='text' @focus="cleanError" v-model='newLocation' placeholder="Localidad" />
        <p><strong>Descripción:</strong></p><input type='text' @focus="cleanError" v-model='newDescription' placeholder="Descripción" />

        <p><strong>Categoría:</strong></p>
        <!--input type='text' v-model='newCategory' placeholder="Categoría" /-->
        <select name='select' @focus="cleanError" v-model='newCategory'>
          <option disabled value="">Elige una categoría</option>
          <option value='manitas'>Manitas</option> 
          <option value='nanny'>Nanny</option>
          <option value='transporte'>Transporte</option>
          <option value='tareas casa'>Tareas casa</option>
          <option value='otros' selected>Otros</option>
        </select>
        
        <p><strong>Razón:</strong></p>
        <!--input type='text' v-model='newReason' placeholder="Razón" /-->
        <select name='select' @focus="cleanError" v-model='newReason'>
          <option disabled value="">Cuál es tu razón</option>
          <option value='movilidad reducida'>Movilidad reducida</option> 
          <option value='hospitalización'>Hospitalización</option>
          <option value='vivo sol@'>Vivo sol@</option>
          <option value='otros' selected>Otros</option>
        </select>          
        
        <p><strong>Fecha límite:</strong></p><input type='datetime-local' @focus="cleanError" v-model='newDeadline' />
        <span class='error'>{{ message }}</span>
        <button @click="actualizarDatos">Envía tu #FEIV</button>
      </section>
  </main>
</template>

<script>

/* import { getAuthToken, getUserId, formatDateToDB, formatDateToInputDate } from '../api/utils'; */
/* import { formatDateToDB, formatDateToInputDate } from '@/api/utils'; */
import api from '@/api/api';
import favours from '@/favours/favours';
import axios from 'axios';

export default {
  name: 'AddFavour',
  props: {
      isAuthenticated: Boolean,
  },
  data(){
    return{
      message:'',
      //userId: '',
      favourId: '',
      newLocation: '',
      newDescription:'',
      newCategory:'',
      newReason:'',
      newDeadline:'',
    }
  },
  computed: {
    //user() {
      // TRAEMOS EL ID DE USUARIO PARA TRABAJAR EN EL COMPONENTE
      //this.userId = this.getUser();
    //},
    isNotLogued(){
      if(!this.isAuthenticated){
        this.$router.push({name: 'Login'});
      }
    },
  },
  methods: {
    /* getUser(){
      return api.getUserId();
    }, */
    actualizarDatos(){
      if(this.newLocation === '' || this.newDescription === '' || this.newCategory === '' || this.newReason === '' || this.newDeadline === ''){
        this.message = 'Debes rellenar todos los campos'
      } else {
        favours.actualizarDatos(this.newLocation, this.newDescription, this.newCategory, this.newReason, this.newDeadline);
        alert('Tu favor se ha registrado correctamente');
        this.cleanInputs();
      }
    },
    cleanInputs() {
      console.log('limpiando')
      this.newLocation = '';
      this.newDescription = '';
      this.newCategory = '';
      this.newReason = '';
      this.newDeadline = '';
      this.message = '';
    },
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