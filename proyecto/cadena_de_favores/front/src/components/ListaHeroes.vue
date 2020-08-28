<template>
    <div v-if='isLoading'>
        componente loading
    </div>
    <div id='heroe' v-else>
        <ul>
            <li v-for='heroe in heroes' :key='heroe.id'>
                <p>{{ heroe.name }}</p><p>{{ heroe.surname }}</p>
                <p>VOTOS</p><p>(estrellas)</p>
                <p>MAKER:</p><p>{{ heroe.voteMakerAverage }}</p>
                <p>ASKER:</p><p>{{ heroe.voteAskerAverage }}</p>
                <img :src='getImage(heroe.foto)' />
            </li>
        </ul>
    </div>
</template>

<script>
import favours from '@/favours/favours';

export default {
    name: 'ListaHeroes',
    props:{
        heroes: Array
    },
    computed: {
        isLoading(){
            return !this.heroes;
        }
    },
    methods: {
        getImage(name) {
            return favours.getImageName(name);
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