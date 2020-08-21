<template>
    <header id='menu'>
        <nav>
            <section class='logo'>
                #FEIVS
            </section>

            <section v-show='!logged' class='register in'>
                <router-link :to="{ name:'Login' }">LOGIN</router-link>
                <router-link :to="{ name:'Register' }">REGISTRO</router-link>
            </section>
            
            <section v-show='logged' class='register out'>
                <router-link :to="{ name:'Profile' }">MIS DATOS</router-link>
                <button @click="logoutUser()">LOGOUT</button>
            </section>
        </nav>
        <aside id='nav'>
            <router-link :to="{ name:'Home' }">INICIO</router-link>
            <router-link :to="{ name:'Favours' }">#FEIVS </router-link>
            <router-link :to="{ name:'AddFavour' }">ADD#FEIVS </router-link>
            <router-link :to="{ name:'Heroes' }">#HEROES </router-link>
            <router-link :to="{ name:'About' }">SOBRE #ME </router-link>
        </aside>
    </header>
</template>
<script>

import { logout, isLoggedIn } from '../api/utils';
/* import utils from '@/api/utilsNew'; */

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