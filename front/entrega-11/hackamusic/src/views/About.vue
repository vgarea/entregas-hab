<template>
  <div class="about">
    <vue-headful title="About" />
    <h1>Sobre mí ;)</h1>
      <p class='destacado'>
        Soy un proyecto ...
        <span><i>que creías que iba a hablar de mí :p</i></span>
        ... que utilizo para funcionar ...
      </p>
    <ul>
      <li>
        Vue.js
      </li>
      <li>
        la API de Lastfm
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
      Y ahora sí:
      <span>Soy Vanessa Almao</span>
      <span>y si quieres más info sobre mí</span>
    </p>
    <a class='destacado' href='https://es.linkedin.com/in/vgarea' target='_blank'>@vgarea</a>
  </div>
</template>


<style scoped>
a, a:hover, a:link, a:focus {
  color: var(--accent);
  padding: 1rem 0;
  display: block;
}
span {
  display: block;
}
.destacado {
  font-size: 1.5rem;
  font-weight: 600;
}
ul {
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}
li {
  display: flex;
  font-size: 1.5rem;
}
</style>