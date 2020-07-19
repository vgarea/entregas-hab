<template>
  <div class='toptracks'>
    <vue-headful title='Top Tracks' />
    <toptracksname :tracksName='tracksName' />
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/api/index.js'
import toptracksname from '@/components/TopTracksTable.vue'

export default {
  name: 'Home',
  components: {
    toptracksname
  },
  data(){
    return {
      tracksName: []
    }
  },
  created() {
      api.getTopTracks().then(response => (this.tracksName = response.data.tracks.track))
      console.log('estoy en tracks');
  }
}

</script>
