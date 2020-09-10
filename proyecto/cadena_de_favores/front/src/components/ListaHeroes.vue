<template>
    <section id='heroe'>
        <section v-if='isLoaded'>
            <ul>
                <li v-for='heroe in heroes' :key='heroe.id'>
                    <header>
                        <h1><i class='logo icoAccent bg'></i>{{ heroe.alias }}</h1>
                        <!-- <h1>{{heroe.name }}</h1> -->
                        <!-- <h2>{{heroe.surname }}</h2> -->
                        <img v-if='isFoto' :src='getImage(heroe.foto)' />
                        <img v-else :src='getImage("no-image.jpg")' />
                    </header>
                    <!-- <p>- COMO -</p><p>( 1-5 )</p> -->
                    <p><i class='logo icoBk lt'></i>HÉROE:</p>
                    <star-rating
                        read-only=true
                        :star-size="20"
                        :increment="0.5"
                        show-rating=false
                        active-color='var(--contrastlt)'
                        v-model = heroe.voteMakerAverage
                    >
                    </star-rating>
                    <!-- <p>{{ heroe.voteMakerAverage }}</p> -->
                    <p><i class='logo icoBk lt'></i>ASKER:</p>
                    <!-- <p>{{ heroe.voteAskerAverage }}</p> -->
                    <star-rating
                        read-only=true
                        :star-size="20"
                        :increment="0.5"
                        show-rating=false
                        active-color='var(--contrastlt)'
                        v-model = heroe.voteAskerAverage
                    >
                    </star-rating>
                </li>
            </ul>
        </section>
         <section class="loader" v-else>
            Loading...
         </section>
    </section>
</template>

<script>
import favours from '@/favours/favours';
import StarRating from 'vue-star-rating';

export default {
    name: 'ListaHeroes',
    props:{
        heroes: Array
    },
    components: {
        StarRating
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
        /* getHeroMakeRating(){
            return Number(heroe.voteMakerAverage);
        },
        getHeroAskRating(){
            return Number(heroe.voteAskerAverage);
        } */
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