<template>
    <article>
        <router-link :to="{ name: 'Favour', params: { id: favour.id } }"  v-if='isLoaded'>
            <header>
                <h1>NECESITO {{ title }} </h1>
                <img v-if='isFoto' :src='getImage(favour.user_maker_foto)' />
                <img v-else :src='getImage("no-image.jpg")' />
            </header>
            <content>
                <p><strong>Localidad:</strong></p><p>{{ favour.location }}</p>
                <p><strong>Descripción:</strong></p><p class='description'>{{ favour.description }}</p>
                <p><strong>Estado:</strong></p><p>{{ favour.status }}</p>
                <p><strong>Fecha límite:</strong></p><p>{{ formatDate(favour.deadline) }}</p>
                <!-- BOTONES -->
                <section v-show='canVote'>
                    <p><strong>Voto:</strong></p>
                    <input @click.prevent="" class='voteClass' type='text' v-model='userVote' placeholder="Voto" />
                    <button @click.prevent="votarUsuario">ok</button>
                </section>
                {{ message }}
                <button v-show='isAcepted' @click.prevent="aceptFavour">¡Acepto el reto!</button>
            </content>
        </router-link>
        <div class="loader" v-else>
            Loading...
        </div>
    </article>
</template>

<script>
/* import { formatDateToUser, formatDateToInputDate } from '@/api/utils'; */
import favours from '@/favours/favours';
import axios from 'axios';

export default {
    name: 'FavourListDetail',
    data(){
        return{
            message:'',
            favourId: '',
            userVote:'',
        }
    },
    props: {
        isAuthenticated: Boolean,
        isIdUser: Number,
        favour: Object,
    },
    computed:{
        title(){
            let titleCategory;
            switch (this.favour.category){
                case 'nanny':
                    titleCategory = 'UNA NANNY'
                    break;
                case 'transporte':
                    titleCategory = 'TRANSPORTE'
                    break;
                case 'manitas':
                    titleCategory = 'UN HANDYMAN/HANDYWOMAN'
                    break;
                case 'tareas casa':
                    titleCategory = 'HOUSEKEEPER'
                    break;
                default:
                    titleCategory = 'AYUDA'
                    break;
            }
            return titleCategory;
        },
        isLoaded(){
            return this.favour !== null;
        },
        canVote() {
            return (((this.isIdUser === parseInt(this.favour.user_maker_id)) && this.favour.rating_asker === null)
            || ((this.isIdUser === parseInt(this.favour.user_asker_id)) && this.favour.rating_maker === null))
            && this.favour.status === "finalizado";
        },
        isFoto() {
            return this.favour.user_maker_foto !== null;
        },
        isAcepted() {
            return (this.isIdUser !== parseInt(this.favour.user_asker_id))
            && (this.favour.user_maker_id === null)
            && (this.favour.status !== "cancelado")
            && this.isAuthenticated;
        }
    },
    methods: {
        // Formateo la fecha
        formatDate(date) {
            return favours.formatDateToUser(date);
        },
        // Recupera la imagen
        getImage(name) {
            return favours.getImageName(name);
        },
        // Búsqueda de favores
        aceptFavour(){
            favours.aceptFavour(this.favour.id, this.favour.user_asker_id)
            .then(() => {
                alert('Has aceptado el favor: '+ favourId);
            })
            .catch((error) => {
                this.message = error.data.message;
            })
        },
        // Votar Usuario
        votarUsuario() {
            const favourId = this.favour.id;
            let favourUser, favourType;

            if (this.isIdUser === parseInt(this.favour.user_asker_id)){
                favourUser = this.favour.user_maker_name;
                favourType ='hecho';
            } else if (this.isIdUser === parseInt(this.favour.user_maker_id)){
                favourUser = this.favour.user_asker_name;
                favourType ='pedido';
            }
            favours.votarUsuario(favourId, this.userVote)
            .then((result) => {
                this.message = result.data.message;
                //alert(`Has votado al usuario ${favourUser} que ha ${favourType} el favor ${favourId} `);
            })
            .catch((error) => {
                this.message = error.data.message;
            })
        },
    },
    created(){
        // APLICAR FORMATO A LAS FECHAS CON FUNCIÓN DESDE UTILS
        this.favour.deadline = favours.formatDateToUser(this.favour.deadline);
    },
    
}
</script>

<style scoped>

</style>