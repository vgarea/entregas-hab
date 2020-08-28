<template>
    <header id='menu'>
         <nav>
            <section class='logo'>
                #FEIVS
            </section>

            <section v-if="isAuthenticated" class='register out'>
                <router-link :to="{ name:'Profile' }">MIS DATOS</router-link>
                <button @click="doLogout">LOGOUT</button><!-- @click="logoutUser()" -->
            </section>
            
            <section v-else class='register in'>
                <router-link :to="{ name:'Login' }">LOGIN</router-link>
                <router-link :to="{ name:'Register' }">REGISTRO</router-link>
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

export default {
    name:'MenuPpal',
    props: {
        isAuthenticated: Boolean,
    },
    data() {
        return {
            
        }
    },
    methods: {
        doLogout() {
            this.$emit('logout');
        }
    }
}
</script>
<style scoped>

</style>