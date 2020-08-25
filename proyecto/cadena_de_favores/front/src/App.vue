<template>
  <content id="app">
    <menuppal
        :is-authenticated="isAuthenticated"
        @logout="doLogout"
     />
        <!-- :is-staff="isStaff" -->
    <router-view
        :is-authenticated="isAuthenticated"
        :is-id-user="isIdUser"
        @login="doLogin"
    />
    <footerppal />
  </content>
</template>

<script>
import api from "@/api/api";
import menuppal from '@/components/MenuPpal.vue'; 
import footerppal from '@/components/FooterPpal.vue';

export default {
  name: 'App',
    components: {
        menuppal,
        footerppal
    },
    data() {
        return {
            token: '',
            //refresh: '',
            user: null,
        }
    },
    computed: {
        isAuthenticated() {
            if(this.token != ''){
                return true;
            }
            return false;
        },
        /* isStaff() {
            if (this.user !== null) {
                return this.user.is_staff;
            }
            return false;
        }, */
        isIdUser(){
            console.log('this.user '+this.user);
            return this.user;
        }

    },
    methods: {
        doLogin(data) {
            console.log('estoy logueado ');
            this.token = data.token;
            this.user = data.idUser;
            //api.getOwnUser().then(user => this.user = user);
            this.$router.push({name: 'Home'});
        },
        doLogout() {
            this.token = '';
            this.user = null;
            api.logout();
        },
    },
};
</script>

<style>
    /* IMPORT HOJA DE ESTILOS GENERAL */
    @import "css/estilos.css";
</style>
