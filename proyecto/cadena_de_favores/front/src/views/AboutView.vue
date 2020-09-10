<template>
  <main id="about">
    <vue-headful title='SOBRE #ME' />
    <header>
      <h1>SOBRE <i class='icoWh logo bg'></i>ME</h1>
    </header>
    <section>
      <p>
        Soy Vanessa Almao aka <span class='colAccent'>vgarea</span> . Alguien me definió una vez como #multitasker, porque podía hacer una interfaz, añadirle interactividad, diseñar un personaje en 3D o animarlo, entre otras cosas. Así que me estoy convirtiendo en desarrolladora #fullstack para cerrar el círculo.
      </p>
      <p>
        Más info en:
        <a href='https://es.linkedin.com/in/vgarea' target='_blank'>@vgarea</a>
      </p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
#about {
  /* max-width: 400px; */
  min-height: calc(100vh - 90px);
  /* margin: 2rem auto */
}
#about a, .about a:hover, .about a:link, .about a:focus {
  color: var(--accent);
  padding: 1.5rem 0;
  display: block;
}
#about section {
  margin: 2rem;
  background-image: url('../assets/profile.jpg');
  background-repeat: no-repeat;
  background-position: center right;
  background-size: auto;
  min-height: 250px;
  max-width: 700px;
}
#about> section {
  margin: 0 auto;
}
#about p {
  font-size: 1.5rem;
  font-weight: 400;
  /* margin: 2rem; */
  width: 50%;
  padding: 3rem;
  text-align: end;
}
#about p a {
  display: inline-block;
  font-weight: 600;
}
#about span {
  display: block;
}
#about span.colAccent {
  display: inline-block;
  font-weight: 600;
}
#about img {
  width: 200px;
  border-radius: 1rem;
  vertical-align: middle;
  margin: 2rem
}
#about ul {
  flex-direction: column;
  align-items: center;
}
#about ul li {
  font-size: 1.5rem;
}
@media (max-width: 768px){
  #about section {
    max-width: 550px;
  }
}
@media (max-width: 599px){
  #about p {
    width: 100%;
    padding: 2rem;
    text-align: left;
  }
  #about section {
    background-position: center top;
    height: auto;
  }
  #about section {
    background-image: none;
  }
}
</style>