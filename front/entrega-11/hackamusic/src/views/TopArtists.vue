<template>
  <div class='topartists'>
    <vue-headful title='Top Artists' />
    
    <topartistname :artistsName='artistsName' />
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/api/index.js'
import topartistname from '@/components/TopArtistsTable.vue'

export default {
  name: 'TopArtists',
  components: {
    topartistname
  },
  data(){
    return {
      artistsName: []
    }
  },
  created() {
      api.getArtists().then(response => (this.artistsName = response.data.topartists.artist))
      console.log('estoy en artists');
  }
}

</script>
