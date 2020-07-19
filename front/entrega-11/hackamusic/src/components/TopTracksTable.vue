<template>
  <div class='toptrackstable'>
    <h1>
          HACK A MUSIC - TRACKS
      </h1>
    <ul>
      <li v-for='trackName in tracksName' :key='trackName.id'>
        <img :src="trackName.image[2]['#text']">
        <p class='name'>
          <a @click='sweetalertOn(trackName.url, trackName.artist.name)'><img src='../assets/play.png' /></a>
          {{ trackName.artist.name }}
        </p>
        <p class='trackName'>
          {{ trackName.name }}
        </p>
        <p class='number'>{{ trackName.listeners }} </p>listeners
      </li>
    </ul>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name: 'TopTracks',
    props: {
        tracksName: Array
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
  }
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
</style>