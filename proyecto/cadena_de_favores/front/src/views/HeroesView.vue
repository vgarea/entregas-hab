<template>
  <main v-if='isLoading'>
    Aquí el componente del loading
  </main>
  <main id='heroes' v-else>
      <vue-headful title='#HEROES' />
      <h1>#HEROES</h1>
      <listaheroes :heroes='heroes' />
  </main>
</template>

<script>
/* import axios from 'axios'; */
import listaheroes from '@/components/ListaHeroes.vue';
import favours from '@/favours/favours'

export default {
  name: 'Heroes',
  components: {
    listaheroes
  },
  data() {
    return {
      heroes: [],
    }
  },
  computed: {
    isLoading(){
      return !!!this.heroes;
    }
  },
  methods: {
    getHeroes(){
      favours.getAllHeroes()
      .then(result => {
        this.heroes = result;
      })
    }
    /* // FUNCIÓN PARA LISTAR TODOS LOS CLIENTES
    async getAllHeroes(){
      try {
        const response = await axios.get('http://localhost:3001/users')
          console.log('heroes: ');
          console.log(response.data.data);

          this.heroes = response.data.data;
      } catch (error) {
        console.error(error);
      }
    }, */
  },
  created() {
    this.getHeroes();
  }
}
</script>

<style scoped>

</style>