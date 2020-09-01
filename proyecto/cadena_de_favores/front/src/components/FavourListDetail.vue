<template>
    <article>
        <router-link :to="{ name: 'Favour', params: { id: favour.id } }"  v-if='isLoaded'>
            <header>
                <h1>NECESITO {{ title }} </h1>
                <img v-if='isFoto' class='askerFoto' :src='getImage(favour.user_asker_foto)' />
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
                <span class='error'>{{ message }}</span>
                <button v-show='isAcepted' @click.prevent="aceptFavour(favour.id)">¡Acepto el reto!</button>
            </content>
        </router-link>
        <div class="loader" v-else>
            Loading...
        </div>
    </article>
</template>

<script>
import favours from '@/favours/favours';

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
                    titleCategory = 'HANDYMAN'
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
            return this.favour.user_asker_foto !== null;
        },
        isAcepted() {
            return (this.isIdUser !== parseInt(this.favour.user_asker_id))
            && (this.favour.user_maker_id === null)
            && (this.favour.status !== "cancelado" || this.favour.status !== "asignado")
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
        // Aceptar el reto de hacer un favor
        aceptFavour(id){
            favours.aceptFavour(id)
            .then(response => {
                this.message = `Has aceptado el favor con id: ${id}. Se te ha enviado un correo con los datos del usuario`;
                setTimeout(() => {
                    this.message='';
                    this.favour.status = 'asignado'
                }, 3000)
            })
            .catch((error) => {
                this.message = error;
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
                setTimeout(() => {
                    this.message='';
                    this.favour.status='votado';
                }, 1000)
            })
            .catch((error) => {
                this.message = error;
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