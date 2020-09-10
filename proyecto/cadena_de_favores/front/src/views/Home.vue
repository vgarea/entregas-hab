<template>
  <main id='home'>
    <vue-headful title='CADENA DE #FEIVS' />
    <header>
      <h1><i class='logoWh logo bg'></i>FEIVS</h1>
    </header>
    <section id='favours'>
      <fieldset id='favourNeed'>
        <label>¿NECESITAS ALGO?</label>
        <p>Añade tu petición de ayuda</p>
        <button
          @click="addFavour"
        >
          AÑADIR <i class='icoWh logo lt'></i>FEIV
        </button>
      </fieldset>
      <fieldset id='favourAsk'>
        <label for='favour'>¿QUIERES AYUDAR?</label>
        <input type='text' v-model='searchFav' placeholder='Localidad o categoría'>
        <p>Escribe una localidad, categoría o pulsa BUSCAR <i class='logo icoBk mn'></i>FEIV y podrás ver en qué puedes ayudar</p>
        <button
          @click="sendFavours"
        >
          BUSCAR <i class='icoWh logo lt'></i>FEIV
        </button>
        <p>{{ message }}</p>
      </fieldset>
      <!--listafavours :favours='favours' /-->
    </section>
    <section id='whatIs'>
      <h2>¿QUÉ ES <i class='logoWh logo bg'></i>FEIV?</h2>
      <h3><i class='logoBk logo md'></i>FEIVS conecta a personas que necesitan AYUDA con <i class='logoBk logo md'></i>HÉROES dispuestos a AYUDARLES </h3>
    </section>
    <section id='topHeroes'>
      <h2>TOP<i class='icoWh logo bg'></i>HEROES</h2>
      <listaheroes
        :heroes='heroes'
      />
    </section>
    <section>
      <h2>¿CÓMO PUEDO?</h2>
    </section>
    <section id='howIs'>
      <fieldset @click="askFavour()">
          <h3>¿PEDIR UN <i class='icoBk logo lt'></i>FEIV?</h3>
      </fieldset>
      <fieldset @click="makeFavour()">
          <h3>¿HACER UN <i class='icoBk logo lt'></i>FEIV?</h3>
      </fieldset>
    </section>
  </main>
</template>

<script>
import listaheroes from '@/components/ListaHeroes.vue';
import favours from '@/favours/favours'
export default {
  name: 'Home',
  components: {
    listaheroes
  },
  data() {
    return {
      heroes: [],
      heroesHome:[], 
      message:'',
      searchFav: '',
    }
  },
  methods: {
    // FUNCIÓN PARA ENVIAR LOS DATOS A #FAVS Y HACER AHÍ LA BÚSQUEDA Y EL FILTRADO
    sendFavours(){
      this.$router.push('/favours?'+this.searchFav);
    },
    addFavour(){
      this.$router.push('/add-favour');
    },
    askFavour(){

    },
    makeFavour(){

    },
    getHeroes(){
      favours.getAllHeroes()
      .then(result => {
        for(let i= 0; i< 2; i++){
          this.heroesHome[i] = result[i];
        }
        this.heroes = this.heroesHome;
      })
    }
  },
  created() {
    this.getHeroes();
  }
}
</script>

<style scoped>
  @import "../css/homeStyles.css";
</style>