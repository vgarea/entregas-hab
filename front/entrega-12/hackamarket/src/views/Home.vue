<template>
  <div class="home">
    <vue-headful title='Home' />
    <header>
      <h1>HACKAMARKET</h1>
      <h2>Decora tu hogar</h2>
    </header>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style scoped>
.home {
  background-image: url('https://images.unsplash.com/photo-1492097631548-189753426f9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1359&q=80');
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.home > header {
  background-color: rgba(255,255,255,0.9);
  margin-top: 8rem;
  border-radius: 2rem;
  display: inline-block;
}
.home > header h1 {
  font-size: 2rem;
  padding: .2rem 1rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

@media (min-width: 800px) {
  .home > header {
    margin-top: 9rem;
  }
  .home > header h1 {
    font-size: 4rem;
    padding: .4rem 1.5rem;
  }
  .home > header h2 {
    font-size: 2rem;
  }
}
@media (min-width: 1200px){
  .home > header {
    margin-top: 12rem;
  }
  .home > header h1 {
    font-size: 6rem;
    padding: 0.1rem 2rem;
  }
  .home > header h2 {
    font-size: 4rem;
  }
}

</style>