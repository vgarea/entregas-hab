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
import store from "@/store/store";

import menuppal from '@/components/MenuPpal.vue'; 
import footerppal from '@/components/FooterPpal.vue';

const TOKEN_KEY = 'AUTH_TOKEN_KEY';

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
            //user: null,
            sharedStore: store.state,
        }
    },
    computed: {
        isIdUser() {
            return Number(this.sharedStore.user);
        },
        isAuthenticated() {
            return this.token !== "";
        },
        /* isStaff() {
            return store.isStaff();
        }, */
        /* isIdUser(){
            //console.log('this.user '+this.user);
            return this.user;
        } */
    },
    created() {
        let token = localStorage.getItem(TOKEN_KEY);
        if (token !== null) {
            this.token = token;
            api.setAuthToken(this.token);
            this.getUser();
        }
    },
    methods: {
        doLogin(data) {
            this.token = data.token;
            //this.refresh = data.refresh;
            localStorage.setItem(TOKEN_KEY, this.token)
            this.getUser()
                this.$router.push({name: 'Home'})
        },
        doLogout() {
            this.token = "";
            //this.refresh = "";
            localStorage.removeItem(TOKEN_KEY);
            store.deleteUser();
            api.logout();
        },
        getUser() {
            return store.storeUser(api.getUserId());
            /* return api.getUserId()
            .then(user => {
                store.storeUser(user);
            }); */
        },
        /* async asyncGetUser() {
            let user = await api.getUserId();
            store.storeUser(user);
        } */
    },
};
</script>

<style>
    /* IMPORT HOJA DE ESTILOS GENERAL */
    @import "css/estilos.css";
</style>
