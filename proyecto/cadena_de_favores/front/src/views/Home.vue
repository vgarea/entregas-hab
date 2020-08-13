<template>
  <content id='home'>
    <header>
      <h1>¿Qué necesitas?</h1>
    </header>
    <section id='favours'>
      <fieldset>
          <label for='favour'>¿Necesitas algo? ¿Quieres ayudar?</label>
          <input type='text' v-model='searchFav' placeholder='Escribe localidad, categoría o fecha'>
          <p>Verás los favores que necesitan tus vecinos</p>
          <button @click="sendFavours()">Find #Favs</button>
      </fieldset>
      <p>{{ message }}</p>
      <listafavours :favours='favours' />
    </section>
    <section>
      <h2>Explicación de qué es este site</h2>
    </section>
    <section>
      <h2>Info-gráfica de cómo funciona</h2>
    </section>
  </content>
</template>

<script>

// @ is an alias to /src
import axios from 'axios';
import listafavours from '@/components/FavourCard.vue';

export default {
  name: 'Home',
  components: {
    listafavours
  },
  data() {
    return {
      favours: [],
      message:'',
      searchFav: '',
    }
  },
  methods: {
    // FUNCIÓN PARA ENVIAR LOS DATOS A #FAVS Y HACER AHÍ LA BÚSQUEDA Y EL FILTRADO
    async sendFavours(){
      this.$router.push('/favours?'+this.searchFav);
    }
  }
}
</script>

<style scoped>
h1, h2 {
  background-color: rgba(0, 204, 255, 0.5);
  color: var(--light);
  padding: 3rem;
  margin: 0;

}
#home #favours fieldset {
    border: 1px solid var(--gray);
    margin: 6rem auto;
    padding: 2rem;
    border-radius: 1rem;
    width: 450px;
    
}
#home #favours fieldset label {
  color: var(--accent);
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0 1rem;
}

#home #favours fieldset input {
  font-size: 1.1rem;
  width: 100%;
}

#home #favours fieldset p {
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 0.4;
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
</style>