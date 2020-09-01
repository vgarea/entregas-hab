<template>
    <header id='menu'>
        <div>
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
                <div id="app">
                    <burger
                        @openmenu='toogle'
                        :is-close='isClose'
                    />
                </div>
                <!-- <div id="burger"
                    :class="{ 'active' : isBurgerActive }"
                    @click.prevent="toggle">
                    <slot>
                        <button type="button" class="burger-button" title="Menu">
                            <span class="burger-bar burger-bar--1"></span>
                            <span class="burger-bar burger-bar--2"></span>
                            <span class="burger-bar burger-bar--3"></span>
                        </button>
                    </slot>
                </div> -->
                <!-- <section class='hamburgerSect'>
                    <transition name="fade">
                        <div class='hamburger' @click='show = !show'>
                            <div class='hamburger-inner'></div>
                        </div>
                    </transition>
                </section> -->
            </nav>
            <aside id='nav' v-show='openMnu' @click.prevent='toogle'>
                <!-- <transition
                    v-on:enter="enter"
                    v-on:leave="leave"
                > -->
                    <router-link :to="{ name:'Home' }">INICIO</router-link>
                    <router-link :to="{ name:'Favours' }">#FEIVS </router-link>
                    <router-link :to="{ name:'AddFavour' }">ADD#FEIVS </router-link>
                    <router-link :to="{ name:'Heroes' }">#HEROES </router-link>
                    <router-link :to="{ name:'About' }">SOBRE #ME </router-link>
                <!-- </transition> -->
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
        isClose() {
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
    #burger .hidden {
        visibility: hidden;
    }

    #burger button {
        cursor: pointer;
        margin: 0 1rem;
    }

    /* remove blue outline */
    #burger button:focus {
        outline: 0;
    }

    #burger .burger-button {
        position: relative;
        height: 30px;
        width: 32px;
        display: block;
        z-index: 999;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        pointer-events: all;
        transition: transform .6s cubic-bezier(.165,.84,.44,1);
    }
    aside#nav {
        animation-duration: 0.5s;
        animation-name: slideBottom;
        z-index: -10;
    }

    #burger .burger-bar {
        background-color: var(--accent);
        position: absolute;
        top: 50%;
        right: 6px;
        left: 6px;
        height: 2px;
        width: auto;
        margin-top: -1px;
        transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
    }

    #burger .burger-bar--1 {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
    }

    #burger .burger-bar--2 {
        transform-origin: 100% 50%;
        transform: scaleX(.8);
    }

    #burger .burger-button:hover .burger-bar--2 {
        transform: scaleX(1);
    }

    #burger .no-touchevents .burger-bar--2:hover {
        transform: scaleX(1);
    }

    #burger .burger-bar--3 {
        transform: translateY(6px);
    }

    #burger.active .burger-button {
        transform: rotate(-180deg);
    }

    #burger.active .burger-bar {
        background-color: #fff;
    }

    #burger.active .burger-bar--1 {
        transform: rotate(45deg)
    }

    #burger.active .burger-bar--2 {
        opacity: 0;
    }

    #burger.active .burger-bar--3 {
        transform: rotate(-45deg)
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