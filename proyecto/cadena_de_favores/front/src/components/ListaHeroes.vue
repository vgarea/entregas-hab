<template>
    <div id='heroe'> 
        <ul  v-if='isLoaded'>
            <li v-for='heroe in heroes' :key='heroe.id'>
                <header>
                    <h1>#{{ heroe.alias }}</h1>
                    <!-- <h1>{{heroe.name }}</h1> -->
                    <!-- <h2>{{heroe.surname }}</h2> -->
                    <img v-if='isFoto' :src='getImage(heroe.foto)' />
                    <img v-else :src='getImage("no-image.jpg")' />
                </header>
                <p>- COMO -</p><p>( 1-5 )</p>
                <p>#HÉROE:</p><p>{{ heroe.voteMakerAverage }}</p>
                <p>#ASKER:</p><p>{{ heroe.voteAskerAverage }}</p>
            </li>
        </ul>
         <div class="loader" v-else>
            Loading...
        </div>
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
        isLoaded(){
            return this.heroes;
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