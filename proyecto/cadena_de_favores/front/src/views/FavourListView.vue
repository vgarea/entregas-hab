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
          <input type='datetime-local' v-model='dataFav'>
          <!-- <button @click="findFavours">¿QUÉ PUEDES HACER?</button> -->
          <button @click="getFavours">¿QUÉ PUEDES HACER?</button>
        </p>
      </fieldset>
      <p>{{ message }}</p>
      <listafavours
        :favours='favours'
        :is-authenticated="isAuthenticated"
        :is-id-user="isIdUser"
      />
    </section>
  </content>
</template>

<script>
import axios from 'axios';
import listafavours from '@/components/Favour.vue';
import favours from '@/favours/favours'
import { formatDateToDB, formatDateToInputDate } from '@/api/utils';

export default {
  name: 'Favours',
  props: {
      isAuthenticated: Boolean,
      isIdUser: Number
  },
  components: {
    listafavours,
  },
  data() {
    return {
      favours:[],
      message:'',
      searchFav: '',
      locationFav: '',
      categoryFav: '',
      dataFav: ''
    }
  },
  computed: {
  },
  methods: {
    // Recupera la lista de favores
    getFavours() {
      if(this.locationFav.length > 0 || this.categoryFav.length > 0 || this.dataFav !== ''){
        this.searchFav = '';
      } else if(this.searchFav === '') {
        this.searchFav = '%';
      }

      favours.getFavours(this.searchFav, this.locationFav, this.categoryFav, this.dataFav)
      .then(result => {
        this.favours = result;
      })
      .then(() => {
        this.cleanInputs();
      })
    },
    // Recupera datos de la url para saber la búsqueda que viene de la home
    viewFavours(){
        let url = window.location.href;
        let searchValue = url.split("?");

        searchValue[1] ? this.searchFav = searchValue[1] : false;
        /* this.findFavours(); */
        this.getFavours();
    },
    // Limpiar todos los campos
    cleanInputs(){
      // Mejorar con un bucle que busque todos los inputs y los limpie ;)
      this.locationFav = '';
      this.categoryFav = '';
      this.dataFav = '';
    }
    /* // FUNCIÓN PARA LISTAR LOS FAVORES EN FUNCIÓN DE LA BÚSQUEDA
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
    }, */
  },
  created() {
    /* this.findFavours(); */
    this.viewFavours();
  }
}
</script>

<style scoped>

</style>