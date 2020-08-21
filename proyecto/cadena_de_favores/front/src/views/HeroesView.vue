<template>
    <main id='heroes'>
        <vue-headful title='#HEROES' />
        <h1>#HEROES</h1>
        <listaheroes :heroes='heroes' />
    </main>
</template>

<script>
import axios from 'axios';
import listaheroes from '@/components/ListaHeroes.vue';

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
  methods: {
    // FUNCIÓN PARA LISTAR TODOS LOS CLIENTES
    async getAllHeroes(){
      try {
        const response = await axios.get('http://localhost:3001/users')
          console.log('heroes: ');
          console.log(response.data.data);

          this.heroes = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getAllHeroes();
  }
}
</script>

<style scoped>

</style>