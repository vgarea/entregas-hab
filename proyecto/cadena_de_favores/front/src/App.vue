<template>
  <content id="app">
    <menuppal />
    <router-view />
    <footerppal />
  </content>
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

a {
  text-decoration: none;
}

fieldset {
  border: none;
}

/* APP */
#app {
  margin: 0 auto;
  text-align: center;
}

/* HEADER */
#menu {
  margin: 0 auto;
  background-color: var(--gray);
  height: 3rem;
  position: sticky;
}

#menu nav section.register {
  margin-top: 0.7rem;
}

#menu nav section.register a {
  padding: 0.3rem .75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--light);
}

#menu aside#nav {
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20rem;
  top: 3rem;
  text-align: left;
  background-color: var(--gray);
}

#menu aside#nav a {
  font-weight: 600;
  color: var(--light);
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0 .1rem;
}

#menu nav {
  margin: 0 24rem;
}

#menu nav .register {
  float: right;
}

#menu nav .logo {
  float: left;
  color: var(--light);
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0.7rem;
}
#menu nav .register button {
  margin: 0.5rem;
}

#menu nav .register button.simple {
  background-color: transparent;
  color: var(--light);
  right: 10rem;
}

#menu nav #nav a.router-link-exact-active {
  color: var(--accent);
}

/* FOOTER */
footer {
  margin: 2rem 0;
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
    padding: 0.3rem .75rem;
    border-radius: .4rem;
    font-size: 1rem;
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
  vertical-align: top;
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
    width: 400px;
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