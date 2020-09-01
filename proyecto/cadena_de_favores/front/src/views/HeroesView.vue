<template>
  <main id='heroes' v-if="isLoaded">
      <vue-headful title='#HEROES' />
      <h1>#HEROES</h1>
      <listaheroes :heroes='heroes' />
  </main>
  <div class="loader" v-else>
        Loading...
  </div>
</template>

<script>
import listaheroes from '@/components/ListaHeroes.vue';

import favours from '@/favours/favours'

export default {
  name: 'HeroesView',
  components: {
    listaheroes
  },
  data() {
    return {
      heroes: [],
    }
  },
  computed: {
    isLoaded(){
      return this.heroes !== null;
    }
  },
  methods: {
    getHeroes(){
      favours.getAllHeroes()
      .then(result => {
        this.heroes = result;
      })
    }
  },
  created() {
    this.getHeroes();
  }
}
</script>

<style scoped>

</style>