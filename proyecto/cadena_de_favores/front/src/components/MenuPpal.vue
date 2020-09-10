<template>
    <header id='menu'>
        <div>
            <nav>
                <section class='logo'>
                    <i class='logoWh logo lt'></i>FEIVS
                </section>

                <section v-if="isAuthenticated" class='register out'>
                    <router-link :to="{ name:'Profile' }">MIS DATOS</router-link>
                    <button @click="doLogout">LOGOUT</button>
                </section>
                
                <section v-else class='register in'>
                    <router-link :to="{ name:'Login' }">LOGIN</router-link>
                    <router-link :to="{ name:'Register' }">REGISTRO</router-link>
                </section>
                <div id="app">
                    <burger
                        @openmenu='toogle'
                        :is-open='isOpen'
                    />
                </div>
            </nav>
            <aside id='nav' v-show='openMnu' @click.prevent='toogle'>
                <router-link :to="{ name:'Home' }">INICIO</router-link>
                <router-link :to="{ name:'Favours' }"><i class='icoWh logo lt'></i>FEIVS</router-link>
                <router-link :to="{ name:'AddFavour' }">ADD<i class='icoWh logo lt'></i>FEIVS</router-link>
                <router-link :to="{ name:'Heroes' }"><i class='icoWh logo lt'></i>HEROES</router-link>
                <router-link :to="{ name:'About' }">SOBRE <i class='icoWh logo lt'></i>ME</router-link>
                <section v-if="isAuthenticated" class='register out'>
                    <router-link :to="{ name:'Profile' }">MIS DATOS</router-link>
                    <a @click="doLogout">LOGOUT</a>
                </section>
                <section v-else class='register in'>
                    <router-link :to="{ name:'Register' }">REGISTRO</router-link>
                    <router-link :to="{ name:'Login' }">LOGIN</router-link>
                </section>
            </aside>
        </div>
    </header>
</template>
<script>

import burger from '@/components/BurgerMenu'

export default {
    name:'MenuPpal',
    props: {
        isAuthenticated: Boolean,
    },
    data() {
        return {
            openMnu: false,
        }
    },
    components: {
        burger,
    },
    computed: {
        isOpen() {
            return this.openMnu;
        },
    },
    methods: {
        doLogout() {
            this.$emit('logout');
        },
        toogle() {
            this.openMnu = !this.openMnu;
        },
    }
}
</script>
<style scoped>
    aside#nav {
        animation-duration: 0.5s;
        animation-name: slideBottom;
    }
    
    @keyframes slideBottom {
        from {
            margin-top: -40%;
            opacity: 50%;
        }

        to {
            margin-top: 0%;
            opacity: 100%;
        }
    }
</style>