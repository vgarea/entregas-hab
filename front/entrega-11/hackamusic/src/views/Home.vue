<template>
  <div>
    <vue-headful title="Hack a music" />
    <homeppal :tagsName='tagsName' />
  </div>
</template>

<script>
// @ is an alias to /src
import api from '@/api/index.js'
import homeppal from '@/components/HomePpal.vue'

export default {
  name: 'Home',
  components: {
    homeppal,
  },
  data(){
    return {
      tagsName: [],
    }
  },
  created() {
      api.getTopTags().then(response => (this.tagsName = response.data.tags.tag))
      console.log('estoy en home')
  }
}

</script>