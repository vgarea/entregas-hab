<template>
    <div class='home'>
        <h1>
            HACK A MUSIC - TAGS
        </h1>
        <ul>
            <li v-for='tagName in tagsName' :key='tagName.id'>
                <a @click='sweetalertOn(tagName.url)'>
                    <p class='name'>
                        {{ tagName.name.toLowerCase() }}
                    </p>
                    <p class='number'>
                        reach {{ tagName.reach }}
                    </p>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    name:'Home',
    props: {
        tagsName: Array
    },
    methods: {
        sweetalertOn(url){
            console.log('Estoy en la función');
            Swal.fire({
                title: 'Leaving HACK A MUSIC',
                text: "You're leaving HACK A MUSIC towards Lastfm",
                icon: 'info',
                confirmButtonText: 'GO for it',
                confirmButtonColor: '#8bf0f3',
            }).then((result) => {
                if (result.value) {
                window.open(url);
                }
            })
        }
    }
}
</script>
<style scoped>
    li {
        border:.3rem solid var(--accent);
        width: 200px;
        border-radius: 10rem;
        justify-content: center;
        margin: 1rem;
    }
    .home ul li a:hover p {
        color: var(--light);
    }
    .home ul li p.name {
        padding: .2rem 0;
    }
</style>