<template>
  <div class='topartiststable'>
    <h1>
          HACK A MUSIC - ARTISTS
      </h1>
    <label for='name'>Busca por nombre: </label>
    <input name='name' type='search' v-model='search' placeholder='nombre' />
    <ul>
      <li v-for='artistName in filtered' :key='artistName.id'>
        <!--img :src='"http://data.music-story.com/"+artist.name.toLowerCase()'/-->
        <img :src="artistName.image[2]['#text']">
        <p class='name'>
          <a @click='sweetalertOn(artistName.url, artistName.name)'><img src='../assets/play.png' /></a>
          {{ artistName.name }}
        </p>
        <p class='number'>{{ artistName.listeners }}</p> listeners        
      </li>
    </ul>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'TopArtists',
    props: {
        artistsName: Array
    },
    // importamos el search
    data(){
        return {
            search: ''
        }
    },
    methods: {
      sweetalertOn(url, name){
          console.log('Estoy en la función');
          Swal.fire({
              title: 'Leaving HACK A MUSIC',
              text: `You're leaving HACK A MUSIC towards ${name} in Lastfm`,
              icon: 'info',
              confirmButtonText: 'GO for it',
              confirmButtonColor: '#8bf0f3',
          }).then((result) => {
              if (result.value) {
              window.open(url);
              }
          })
      }
  },
  computed: {
    filtered(){
        if(!this.search){
            return this.artistsName //variable que llega de la vista
        }
        return this.artistsName.filter( artistName => 
            artistName.name.toLowerCase().includes(this.search.toLowerCase())
        )
    }
  },
}
</script>

<style scoped>
a {
  background-color: inherit;
  display: inline;
  margin: 0;
  padding: 0;
  vertical-align: middle;
}
input {
  padding: 0.4rem 1rem;
  font-size: 1rem;
  background: var(--light);
}
label {
  font-size: 1.5rem;
  vertical-align: middle;
}
ul {
  padding-top: 2rem;
  border-radius: 1rem;
}
</style>