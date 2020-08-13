<template>
    <div class='heroes'>
        <vue-headful title='#Heroes' />
        <h1>#HEROES</h1>
        <listaheroes :heroes='heroes' />
    </div>
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
        const result = await axios
        .get('http://localhost:3001/users')
        .then((response) => {
          console.log('heroes: ');
          console.log(response.data.data);
          this.heroes = response.data.data;
        })
      } catch (error) {
        console.error(error)
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