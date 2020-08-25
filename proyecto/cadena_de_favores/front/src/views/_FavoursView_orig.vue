<template>
  <content id="favours">
    <vue-headful title='#FEIVS' />
    <header>
      <h1>#FEIVS</h1>
    </header>
    <section id='favores'>
      <fieldset>
        <p>
          <label for='favour'>¿QUIERES SER UN #HÉROE?</label>
          <input type='text' v-model='locationFav' placeholder='Localización'>
          <!-- CONVERTIR CATEGORY EN UN SELECT -->
          <!--input type='text' v-model='categoryFav' placeholder='Categoría'-->
          <select name='select' v-model='categoryFav'>
            <option disabled value=''>Categorías que puedes seleccionar</option>
            <option value='manitas'>Manitas</option> 
            <option value='nanny'>Nanny</option>
            <option value='transporte'>Transporte</option>
            <option value='tareas casa'>Tareas casa</option>
            <option value='otros'>Otros</option>
          </select>
          <input type='datetime-local' v-model='dataFav' placeholder='Escoge fecha'>
          <button @click="findFavours()">¿QUÉ PUEDES HACER?</button>
        </p>
      </fieldset>
      <p>{{ message }}</p>
      <listafavours :favours='favours' />
    </section>
  </content>
</template>

<script>
import axios from 'axios';
import { formatDateToDB } from '../api/utils';
import listafavours from '@/components/FavourCard.vue';
export default {
  name: 'Favours',
  components: {
    listafavours
  },
  data() {
    return {
      favours: [],
      message:'',
      searchFav: '',
      locationFav: '',
      categoryFav: '',
      dataFav: '',
    }
  },
  methods: {
    // FUNCIÓN PARA LISTAR LOS FAVORES EN FUNCIÓN DE LA BÚSQUEDA
    async findFavours(){
      try {
        //console.log(this.locationFav.length +' > 0 || '+ this.categoryFav.length +' > 0 || '+ this.dataFav.length +'> 0 - this.searchFav === '+ this.searchFav )
        // COMPRUEBO EL TIPO DE BÚSQUEDA QUE SE HA HECHO
        if(this.locationFav.length > 0 || this.categoryFav.length > 0 || this.dataFav.length > 0){
          this.searchFav = '';
        } else if(this.searchFav === '') {
          this.searchFav = '%';
        }
        const response = await axios.post('http://localhost:3001/favours/find', {
          search: this.searchFav,
          locationFavour: this.locationFav,
          categoryFavour: this.categoryFav,
          dataFavour: this.dataFav
        });
        
        // DEVUELVO LA LISTA DE FAVORES QUE CUMPLEN LAS CONDICIONES
        this.favours = response.data.data;
        console.log('favours: ');
        console.log( this.favours);
        // LIMPIO LOS CAMPOS DE BÚSQUEDA
        this.cleanInputs();
      } catch (error) {
        if(error.response){
          this.message = error.response.data.message;
        } else {
          console.log(error);
        }
      }
    },
    // VISUALIZACIÓN POR DEFECTO DE TODOS LOS FAVORES SI NO VIENE DE LA BÚSQUEDA DE LA HOME
    viewFavours(){
        let url = window.location.href;
        let searchValue = url.split("?");
        searchValue[1] ? this.searchFav = searchValue[1] : false;
        this.findFavours();
    },
    cleanInputs(){
      // Mejorar con un bucle que busque todos los inputs y los limpie ;)
      this.locationFav = '';
      this.categoryFav = '';
      this.dataFav = 0;
    }
  },
  created() {
    this.viewFavours();
  }
}
</script>

<style scoped>
</style>