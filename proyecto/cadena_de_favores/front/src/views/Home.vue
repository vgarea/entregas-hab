<template>
  <main id='home'>
    <vue-headful title='CADENA DE #FEIVS' />
    <header>
      <h1>#FEIVORS</h1>
    </header>
    <section id='favours'>
      <fieldset id='favourNeed'>
        <label>¿NECESITAS ALGO?</label>
        <p>Añade tu petición de ayuda</p>
        <button @click="addFavour">ADD #FEIV</button>
      </fieldset>
      <fieldset id='favourAsk'>
        <label for='favour'>¿QUIERES AYUDAR?</label>
        <input type='text' v-model='searchFav' placeholder='Localidad o categoría'>
        <p>Escribe una localidad, categoría o pulsa FIND #FEIV y podrás ver en qué puedes ayudar</p>
        <button @click="sendFavours">FIND #FEIV</button>
        <p>{{ message }}</p>
      </fieldset>
      <!--listafavours :favours='favours' /-->
    </section>
    <section id='whatIs'>
      <h2>¿QUÉ ES #FEIV?</h2>
      <h3>#FEIV conecta a personas que necesitan AYUDA con #HÉROES dispuestos a AYUDARLES </h3>
    </section>
    <section id='topHeroes'>
      <h2>TOP#HEROES</h2>
      <listaheroes
        :heroes='heroes'
      />
    </section>
    <section>
      <h2>¿CÓMO PUEDO?</h2>
    </section>
    <section id='howIs'>
      <fieldset @click="askFavour()">
          <h3>¿PEDIR UN #FEIV?</h3>
      </fieldset>
      <fieldset @click="makeFavour()">
          <h3>¿HACER UN #FEIV?</h3>
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
h1, h2 {
  background-color: rgba(126,153,0, 0.5);
  color: var(--light);
  padding: 1rem;
  margin: 0;
}
h3 {
  font-size: 1.5rem;
}
#home #favours,
#home #howIs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
}
#home #favours fieldset,
#home #howIs fieldset {
  border: 1px solid var(--gray);
  margin: 6rem 1rem;
  padding: 2rem;
  border-radius: 1rem;
  width: 450px;
}
#home #howIs fieldset {
  cursor: pointer;
}
#home #howIs fieldset:hover,
#home #howIs fieldset:hover h3 {
  background-color: var(--accent);
  color: var(--light);
}
#home #favours fieldset label {
  color: var(--accent);
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}

#home #favours fieldset input {
  width: 100%;
  margin-top: 0;
}
#home #favours fieldset p {
  color: var(--gray);
}
#home #favours fieldset#favourNeed p,
#home #favours fieldset input {
  font-size: 1.2rem;
  line-height: 1.2;
}
#home #favours fieldset#favourNeed p {
  margin: 2rem 0 1rem 0
}

#home #favours fieldset#favourAsk p{
  font-size: .9rem;
  line-height: 1.1;
}

#home #favours fieldset input,
#home #favours fieldset button {
  display: inline;
  text-align: center;
}

#home #favours fieldset button {
  margin: 2rem 0 1rem 0;
}

section {
  margin-bottom: 4rem;
}
@media(min-width:1201px) {
#home #favours,
#home #howIs {
    max-width: none;
  }
}
</style>