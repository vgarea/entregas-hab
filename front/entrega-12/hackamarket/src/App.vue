<template>
  <div id="app">
    <menuppal />
    <router-view />
    <footerppal />
  </div>
</template>
<script>
import menuppal from '@/components/MenuPpal.vue';
import footerppal from '@/components/FooterPpal.vue';

export default {
    components: {
    menuppal,
    footerppal,
  },
}
</script>
<style>
/* IMPORT FONT FAMILY */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

/* RESETEO DE ESTILOS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: var(--gray);
}

html {
  --accent: #00ccff;
  --gray: #222222;
  --light: #ffffff;
  --red: #ad1111;
  --green: #059005;
  --font: Quicksand, sans-serif;
  
  font-family: var(--font);
}

img {
  width: 100%;
}

ul {
  list-style: none;
}

/* APP */
#app {
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* NAV */
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: var(--gray);
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0 1rem;
}

#nav a.router-link-exact-active {
  color: var(--accent);
}
/* ESTILOS GENERALES */
input {
    display: block;
    margin: 1rem auto;
    padding: 0.2rem;
    border: none;
    border-bottom: 2px solid var(--accent);
}

button {
    margin: 2rem;
    border: none;
    background: var(--accent);
    color: var(--light);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
}

input:focus,
button:focus {
    outline: none;
}

button:hover {
  background-color: var(--gray);
  cursor: pointer;
}

/* ESTILOS TEXTOS */
h1{
  font-size: 1.5rem;
  margin: 2rem;
}
h2, h3 {
  margin: 1.5rem;
}
li p {
  display: inline-block;
  width: 50%;
  padding: .2rem 0.2rem;
}
li div button {
  width: calc(50% - 1rem);
  margin: 0 0.5rem;
}
li div.stock, li div.noStock, li div.edit {
  margin: 1rem auto;
}
li p:nth-child(even){
  text-align: left;
}
li p:nth-child(odd){
  text-align: right;
}
strong{
  font-weight: 600;
}
/* ESTILOS LISTADOS */
ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 auto;
    max-width: 1200px;
}
li {
    border: 2px solid var(--accent);
    background-color: var(--light);
    border-radius: 2rem;
    width: 300px;
    padding: 1rem;
    margin: 1rem;
}
img {
  height: 300px;
  /*border: 2px solid var(--accent);*/
  box-shadow: 2px 2px 6px rgba(0, 204, 255, 0.1);
  border-radius: 1.5rem;
  object-fit: cover;
  object-position: center;
}
/* MEDIA QUERIES */
@media (max-width: 1200px) {
  html {
    font-size: 12px;
  }
}
@media (max-width: 600px) {
  html {
    font-size: 10px;
  }
}
@media (max-width: 320px) {
  body > div {
    width: 100%;
  }
}
</style>
