<template>
    <div>
        <div id="nav">
            <router-link :to="{name: 'Home'}">Home</router-link> |
            <router-link :to="{name: 'About'}">About</router-link> |
            <router-link :to="{name: 'Productos'}">Productos</router-link> |
            <router-link :to="{name: 'Clientes'}">Clientes</router-link> |
            <router-link :to="{name: 'Registrar'}">Registrar</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name:'MenuPpal',
    }
</script>