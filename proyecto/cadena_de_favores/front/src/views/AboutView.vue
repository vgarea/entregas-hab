<template>
  <main id="about">
    <vue-headful title='SOBRE #ME' />
    <h1>SOBRE #ME</h1>
    <p class='destacado'>
      Soy :) Vanessa Almao
      <img src='../assets/profile.jpg' alt='vgarea' />
    </p>
    <p>
      Más info en:
      <a href='https://es.linkedin.com/in/vgarea' target='_blank'>@vgarea</a>
    </p>
  </main>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
#about {
  max-width: 400px;
  height: calc(100vh - 70px);
  margin: 2rem auto
}
#about a, .about a:hover, .about a:link, .about a:focus {
  color: var(--accent);
  padding: 1.5rem 0;
  display: block;
}
#about p {
  font-size: 2rem;
}
#about span {
  display: block;
}
#about img {
  width: 200px;
  border-radius: 1rem;
  vertical-align: middle;
  margin: 2rem
}
#about .destacado {
  font-size: 2rem;
  font-weight: 600;
  margin: 2rem 0 0 0;
}
#about ul {
  flex-direction: column;
  align-items: center;
}
#about ul li {
  font-size: 1.5rem;
}
</style>