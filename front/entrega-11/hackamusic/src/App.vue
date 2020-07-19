<template>
  <div id="app">
    <menuppal />
    <router-view/>
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
/* IMPORTAR GOOGLE FONT */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

/* ESTILOS GENERALES */
*{
  margin: 0;
  padding:0 ;
  list-style: none;
  text-decoration: none;
  box-sizing: content-box;
}
html {
  --fontppal: Roboto, sans-serif;
  --dark: #333333;
  --darkLt: #41595a;
  --light: #e7fbfb;
  --accent: #8bf0f3;

  color: var(--light);
  background-color: var(--dark);
  font-family: var(--fontppal);
  font-weight: 400;
}
h1 {
  padding: 2rem 1rem;
}
h2 {
  padding: 2rem 1rem;
}
a, a:hover, a:link {
  color:inherit;
}
img {
  border-radius: 6rem;
  padding: 0.5rem;
  border: .3rem solid var(--accent);
  width: 150px;
}
input:focus, button:focus {
  outline: none;
}
a img {
  width: 20px;
  height: 20px;
}
/* ESTILOS APP Y NAV */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  background-color: var(--darkLt);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

#nav a {
  padding: 3rem;
  color: var(--accent);
  font-size: 1.5rem;
  padding: 1rem;
  text-transform: uppercase;
}

#nav a.router-link-exact-active {
  color: var(--accent);
}
#nav a.router-link-exact-active.router-link-active {
  background-color: var(--accent);
  color: var(--dark);
}
#nav.footer p {
  padding: 1rem;
  font-weight: 400;
  font-size: 0.9rem;
}
/* ESTILOS GENERALES VISTAS */
.toptracks,
.topartists,
.home,
.about,
.error {
  min-height: 100vh;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
/* ESTILOS DE LAS FICHAS */
ul {
  display: flex;
  flex-wrap: wrap;
  max-width: 1290px;
  margin: 0 auto;
  justify-content: center;
}
li {
  width: 390px;
  padding: .5rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
ul li p.name {
  font-size: 1.5rem;
  color: var(--accent);
  padding: 1rem 0.1rem 0.5rem 0.1rem;
}
ul li p.trackName {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0 0 0.5rem 0;
  text-transform: uppercase;
}
ul li p.number {
  font-size: 1.2rem;
  display: inline-block;
  padding-top: .5rem;
}
.topartiststable a {
  margin: 1rem;
  background-color: var(--accent);
  color: var(--dark);
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.3rem 2.5rem;
}
.toptrackstable a {
  margin: 1rem;
  padding: 0 0.7rem;
  height: 3rem;
  width: 100%;
  background-color: var(--accent);
  color: var(--dark);
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* SWEET ALERT */
.swal2-shown .swal2-container .swal2-popup {
    border-radius: 3rem;
    background-color: var(--light);
    opacity: 0.95;
}
.swal2-shown .swal2-container .swal2-icon.swal2-info {
    color: var(--accent);
    border-color: var(--accent);
    box-shadow: none;
}
.swal2-shown .swal2-container .swal2-actions .swal2-styled.swal2-confirm {
    color: var(--darkLt);
    font-weight: 600;
}
.swal2-shown .swal2-container .swal2-actions .swal2-styled:focus {
  box-shadow: none;
}
/* SPINNER */
/*
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
*/
</style>
