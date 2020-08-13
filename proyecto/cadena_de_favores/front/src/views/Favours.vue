<template>
  <content class="favours">
    <vue-headful title='#Favours' />
    <header
      <h1>#FAVS</h1>
    </header>
    <section id='favores'>
      <fieldset>
        <p>
          <label for='favour'>¿Necesitas algo, o puedes ayudar?</label>
          <input type='text' v-model='locationFav' placeholder='Localización'>
          <!-- CONVERTIR CATEGORY EN UN SELECT -->
          <input type='text' v-model='categoryFav' placeholder='Categoría'>
          <input type='date' v-model='dataFav' placeholder='Escoge fecha'>
          <button @click="findFavours()">Find Here</button>
        </p>
      </fieldset>
      <p>{{ message }}</p>
      <listafavours :favours='favours' />
    </section>
  </content>
</template>

<script>
import axios from 'axios';
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
          if(this.locationFav.length > 0 || this.categoryFav.length > 0 || this.dataFav.length > 0){
            this.searchFav = '';
          }
          const result = await axios
          .post('http://localhost:3001/favours/find', {
            search: this.searchFav,
            locationFavour: this.locationFav,
            categoryFavour: this.categoryFav,
            dataFavour: this.dataFav
          })
          .then(response => {
            console.log('favours: ');
            console.log(response.data.data);
            this.favours = response.data.data;
            // Mejorar con función que limpie los campos
            this.locationFav = '';
            this.categoryFav = '';
            this.dataFav = '';
          })
      } catch (error) {
        //console.error;
        this.message = error.response.data.message;
      }
    },
    // VISUALIZACIÓN POR DEFECTO DE MANITAS SI NO VIENE DE LA BÚSQUEDA DE LA HOME
    async viewFavours(){
      try {
        let url =  window.location.href;
        let searchValue = url.split("?");
        //console.log(url +' hola '+ searchValue)
        if(searchValue[1]){
          this.searchFav = searchValue[1];
          } else {
          this.searchFav = 'manitas';
        }
          this.findFavours();
      } catch (error) {
        //console.error;
        this.message = error.response.data.message;
      }
    }
  },
  created() {
    this.viewFavours();
  }
}
</script>

<style scoped>

</style>