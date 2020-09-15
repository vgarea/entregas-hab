<template>
  <main id="favours" >
    <vue-headful title='#FEIVS' />
    <header>
      <h1>¿QUIERES SER UN <i class='icoWh logo bg'></i>HÉROE?</h1>
    </header>
    <section id='favores' v-if="isLoaded">
      <section id='buscador'>
        <input
          type='text'
          placeholder='Localización'
          v-model='locationFav'
          @focus='cleanError'
        >
        <!-- CONVERTIR CATEGORY EN UN SELECT -->
        <select
          name='select'
          v-model='categoryFav'
          @focus='cleanError'
        >
          <option disabled value=''>Categorías que puedes seleccionar</option>
          <option value='manitas'>Manitas</option> 
          <option value='nanny'>Nanny</option>
          <option value='transporte'>Transporte</option>
          <option value='tareas casa'>Tareas casa</option>
          <option value='otros'>Otros</option>
        </select>
        <input 
          type='datetime-local'
          v-model='dataFav'
          @focus='cleanError'
        >
        <button @click="getFavours">¿QUÉ PUEDES HACER?</button>
      </section>
      <header>
        <h2 for='favour'>LISTADO DE <i class='logo icoBk bg'></i>FEVIS</h2>
        <p>{{ message }}</p>
      </header>
      <ul>
        <li v-for="favour in favours" :key="favour.id">
            <favourdata
                :is-authenticated="isAuthenticated"
                :is-id-user="isIdUser"
                :favour="favour"
              />
          </li>
      </ul>
    </section>
    <div class="loader" v-else>
          Loading...
    </div>
  </main>
</template>

<script>
import favourdata from '@/components/FavourListDetail.vue';
import favours from '@/favours/favours';

export default {
  name: 'FavoursListView',
  props: {
      isAuthenticated: Boolean,
      isIdUser: Number,
      favour: Array,
  },
  components: {
    favourdata,
  },
  data() {
    return {
      favours: [],
      message:'',
      searchFav: '',
      locationFav: '',
      categoryFav: '',
      dataFav: ''
    }
  },
  computed: {
    isLoaded(){
      return this.favours !== null;
    }
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
        if(!result.length > 0){
          this.message = 'No hay resultados';
        }
      })
      .then(() => {
        this.cleanInputs();
      })
    },
    // Recupera datos de la url para saber la búsqueda que viene de la home
    viewFavours(){
        let url = decodeURI(window.location.href);
        let searchValue = url.split("?");

        searchValue[1] ? this.searchFav = searchValue[1] : false;
        this.getFavours();
        // Le quitamos la búsqueda a la url
        window.location.href = searchValue[0];
    },
    // Limpiar todos los campos
    cleanInputs(){
      // Mejorar con un bucle que busque todos los inputs y los limpie ;)
      this.locationFav = '';
      this.categoryFav = '';
      this.dataFav = '';
    },
    // Limpiamos los mensajes de error
    cleanError(){
      this.message = '';
    },
  },
  created() {
    this.viewFavours();
  }
}
</script>

<style scoped>

</style>