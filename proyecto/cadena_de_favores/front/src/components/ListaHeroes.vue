<template>
    <div>
        <ul>
            <li v-for='heroe in heroes' :key='heroe.id'>
                <p><strong>Nombre:</strong></p><p>{{ heroe.name }}</p>
                <p><strong>Apellido:</strong></p><p>{{ heroe.surname }}</p>
                <p><strong>Email:</strong></p><p>{{ heroe.email }}</p>
                <img :src='getImageName(heroe.foto)' />
            </li>
        </ul>
    </div>
</template>

<script>
/*
PASOS A SEGUIR:
1 - CREAR LA FUNCIÓN EN LA API (SINO, NANAI)
2 - CREAR EVENTO CON EL QUE ENVÍO EL ID
3 - CREAR FUNCIÓN EN LA VISTA QUE RECOJA EL ID
*/

import { getImageName } from '../api/utils';

export default {
    name: 'ListaHeroes',
    props:{
        heroes: Array
    },
     methods: {
         getImageName(name) {
            return process.env.VUE_APP_STATIC + name;
        }
     }
}
</script>

<style scoped>

</style>