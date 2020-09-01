<template>
    <div id='heroe'>
        <ul>
            <li v-for='heroe in heroes' :key='heroe.id'>
                <header>
                    <h1>{{ heroe.name +' '+ heroe.surname }}</h1>
                    <img v-if='isFoto' :src='getImage(heroe.foto)' />
                    <img v-else :src='getImage("no-image.jpg")' />
                </header>
                <p>VOTOS</p><p>(estrellas)</p>
                <p>MAKER:</p><p>{{ heroe.voteMakerAverage }}</p>
                <p>ASKER:</p><p>{{ heroe.voteAskerAverage }}</p>
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
        },
        isFoto() {
            return heroe.foto !== null;
        },
    },
    methods: {
        getImage(name) {
            return favours.getImageName(name);
        },
    }
}
</script>

<style scoped>
#heroe p {
    font-weight: 600;
    text-transform: uppercase;
}
#heroe li {
    padding-bottom: 2rem;
}
</style>