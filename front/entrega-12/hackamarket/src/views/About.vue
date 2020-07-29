<template>
  <div class="about">
    <vue-headful title='About' />
    <h1>HACKAMARKET - ABOUT</h1>
    <h2>Estoy utilizando:</h2>
    <ul>
      <li>
        Vue.js
      </li>
      <li>
        Librería AXIOS
      </li>
      <li>
        SweetAlert2
      </li>
      <li>
        Vue-Headful
      </li>
    </ul>
    <p class='destacado'>
      Soy :) Vanessa Almao y encontrarás más info sobre mí en:
      <a href='https://es.linkedin.com/in/vgarea' target='_blank'>@vgarea</a>
    </p>
  </div>
</template>

<script>
export default {
   name: 'About'
}
</script>

<style scoped>
.about {
  margin-bottom: 2rem;
}
.about a, .about a:hover, .about a:link, .about a:focus {
  color: var(--accent);
  padding: 1.5rem 0;
  display: block;
}
.about span {
  display: block;
}
.about .destacado {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 0 0;
}
.about ul {
  flex-direction: column;
  align-items: center;
}
.about ul li {
  font-size: 1.5rem;
}
</style>