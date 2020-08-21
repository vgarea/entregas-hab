<template>
  <main id="addFavour">
    <vue-headful title='ENVÍA TU #FEIV' />
    <h1>#FEIVS</h1>
    <h2>¿QUÉ NECESITAS?</h2>
    <section>
        <p><strong>Localidad:</strong></p><input type='text' v-model='newLocation' placeholder="Localidad" />
        <p><strong>Descripción:</strong></p><input type='text' v-model='newDescription' placeholder="Descripción" />
        <p><strong>Categoría:</strong></p>
        <!--input type='text' v-model='newCategory' placeholder="Categoría" /-->
        <select name='select' v-model='newCategory'>
          <option disabled value="">Elige una categoría</option>
          <option value='manitas'>Manitas</option> 
          <option value='nanny'>Nanny</option>
          <option value='transporte'>Transporte</option>
          <option value='tareas casa'>Tareas casa</option>
          <option value='otros' selected>Otros</option>
        </select>
        <p><strong>Razón:</strong></p>
        <!--input type='text' v-model='newReason' placeholder="Razón" /-->
        <select name='select' v-model='newReason'>
          <option disabled value="">Cuál es tu razón</option>
          <option value='movilidad reducida'>Movilidad reducida</option> 
          <option value='hospitalización'>Hospitalización</option>
          <option value='vivo sol@'>Vivo sol@</option>
          <option value='tareas casa'>Tareas casa</option>
          <option value='otros' selected>Otros</option>
        </select>          
        <p><strong>Fecha límite:</strong></p><input  type='datetime-local' v-model='newDeadline' />
        {{ message }}
      </section>
      <button @click="actualizarDatos()">Envía tu #FEIV</button>
  </main>
</template>

<script>

import { getAuthToken, getUserId, formatDateToDB, formatDateToInputDate } from '../api/utils';
import axios from 'axios';

export default {
  name: 'AddFavour',
  data(){
    return{
      message:'',
      userId: '',
      favourId: '',
      newLocation: '',
      newDescription:'',
      newCategory:'',
      newReason:'',
      newDeadline:'',
    }
  },
  methods: {
    async actualizarDatos(){
      try {
        const response = await axios.post('http://localhost:3001/favours/', {
          location: this.newLocation,
          description: this.newDescription,
          category: this.newCategory,
          reason: this.newReason,
          status: 'pendiente',
          deadline: formatDateToDB(this.newDeadline)
        },
        {
          headers: { 
            Authorization: `${getAuthToken()}`
          }
        });
        //console.log('Actualizado el Favor ' + response);
        alert('Tu favor se ha registrado correctamente');
        location.reload();
      } catch (error) {
        this.message = error.response.data.message;
        //console.log(error);
      }
    },
    created(){
      // TRAEMOS EL ID DE USUARIO PARA TRABAJAR EN EL COMPONENTE
      this.$userId = getUserId();
    }
  }
}
</script>

<style scoped>
  #addFavour section {
    margin: 5rem auto 1rem auto;
  }
</style>