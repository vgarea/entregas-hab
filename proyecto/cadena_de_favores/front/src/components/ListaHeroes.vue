<template>
    <div id='heroe'>
        <ul>
            <li v-for='heroe in heroes' :key='heroe.id'>
                <p>{{ heroe.name }}</p><p>{{ heroe.surname }}</p>
                <p>VOTOS</p><p>(estrellas)</p>
                <p>MAKER:</p><p>{{ heroe.voteMakerAverage }}</p>
                <p>ASKER:</p><p>{{ heroe.voteAskerAverage }}</p>
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
#heroe p {
    font-weight: 600;
    text-transform: uppercase;
}
#heroe img {
    margin-top:2rem;
}
</style>