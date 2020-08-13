<template>
    <header id='menu'>
        <nav>
            <section class='logo'>
                #FAVS
            </section>

            <section v-show='!logged' class='register'>
                <router-link :to="{ name:'Login' }">Login</router-link>
                <router-link :to="{ name:'Register' }">Registro</router-link>
            </section>
            
            <section v-show='logged' class='register'>
                <router-link :to="{ name:'Profile' }">Perfil</router-link>
                <button @click="logoutUser()">Salir</button>
            </section>
        </nav>
        <aside id='nav'>
            <router-link :to="{ name:'Home' }">Inicio</router-link>
            <router-link :to="{ name:'Favours' }">#Favs </router-link>
            <router-link :to="{ name:'Heroes' }">#Heroes </router-link>
            <router-link :to="{ name:'About' }">Acerca de: #Favs </router-link>
        </aside>
    </header>
</template>
<script>

import { logout, isLoggedIn } from '../api/utils';

export default {
    name:'MenuPpal',
    data() {
        return {
            logged: false,
        }
    },
    methods: {
        logoutUser(){
            logout();
            this.$router.push('/login');
            location.reload();
        },
        getLogin(){
            this.logged = isLoggedIn();
        },
    },
  created(){
    this.getLogin();
  }
}
</script>
<style scoped>

</style>