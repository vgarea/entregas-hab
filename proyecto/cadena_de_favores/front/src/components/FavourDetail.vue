<template>
    <article>
        <header>
            <i class='status' :style="{ backgroundColor: status }"></i>
            <a @click="favourBack" class='volver'></a>
            <h1>NECESITO {{ title }} </h1>
            <img v-if='isFoto' :src='getImage(favour.user_asker_foto)' />
            <img v-else :src='getImage("no-image.jpg")' />
        </header>
        <!-- <a @click="$router.go(-1)" class='volver'>
            <img
                src="../assets/close.png"
                alt="Volver"
            />
        </a> -->
        <!-- VALORES MODIFICABLES -->
        <section v-if='!edit'>
            <p><strong>Localidad:</strong></p><p>{{ favour.location }}</p>
            <p><strong>Descripción:</strong></p><p>{{ favour.description }}</p>
            <p><strong>Categoría:</strong></p><p>{{ favour.category }}</p>
            <p><strong>Razón:</strong></p><p>{{ favour.reason }}</p>
            <!-- <p><strong>Estado:</strong></p><p>{{ favour.status }}</p> -->
            <p><strong>Fecha límite:</strong></p><p>{{ favour.deadline }}</p>
            <!-- PERSONAS -->
            <p><strong>Pide <i class='icoBk logo lt'></i>FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p>
            <p v-show='isMaker'><strong>Hace <i class='icoBk logo lt'></i>FEIV:</strong></p>
            <p v-show='isMaker'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
            <!-- BOTONES -->
            <span class='error'>{{ message }}</span>
            <button v-show='isEditable' @click="editar">Editar</button>
        </section>
        <section v-else-if='editStatus'>
            <p><strong>Localidad:</strong></p><p>{{ favour.location }}</p>
            <p><strong>Descripción:</strong></p><p>{{ favour.description }}</p>
            <p><strong>Categoría:</strong></p><p>{{ favour.category }}</p>
            <p><strong>Razón:</strong></p><p>{{ favour.reason }}</p>
            <p><strong>Estado:</strong></p>
            <select name='select' v-model='newStatus'>
                <option disabled value=''>Estado</option>
                <option value='asignado'>Asignado</option>
                <option value='finalizado'>Finalizado</option>
                <option value='cancelado'>Cancelado</option>
            </select>
            <p><strong>Fecha límite:</strong></p><p>{{ favour.deadline }}</p>
            <!-- PERSONAS -->
            <p><strong>Pide <i class='icoBk logo lt'></i>FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p>
            <p v-show='isMaker'><strong>Hace <i class='icoBk logo lt'></i>FEIV:</strong></p>
            <p v-show='isMaker'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
            <!-- BOTONES -->
            <span class='error'>{{ message }}</span>
            <button @click="editFavour">Actualizar datos</button>
            <button @click="cancelar">Cancelar</button>
        </section>
        <section v-else>
            <p><strong>Localidad:</strong></p>
            <input type='text' v-show='edit' v-model='newLocation' placeholder="Localidad" />
            <p><strong>Descripción:</strong></p>
            <input type='text' v-show='edit' v-model='newDescription' placeholder="Descripción" />
            <p><strong>Categoría:</strong></p>
            <select name='select' v-model='newCategory'>
                <option disabled value=''>Categorías que puedes seleccionar</option>
                <option value='manitas'>Manitas</option> 
                <option value='nanny'>Nanny</option>
                <option value='transporte'>Transporte</option>
                <option value='tareas casa'>Tareas casa</option>
                <option value='otros' selected>Otros</option>
            </select>
            <p><strong>Razón:</strong></p>
            <select name='select' v-model='newReason'>
                <option disabled value=''>Razón por la que necesitas ayuda</option>
                <option value='movilidad reducida'>Movilidad reducida</option> 
                <option value='hospitalización'>Hospitalización</option>
                <option value='vivo sol@'>Vivo sol@</option>
                <option value='tareas casa'>Tareas casa</option>
                <option value='otros' selected>Otros</option>
            </select>
            <p><strong>Estado:</strong></p>
            <select name='select' v-model='newStatus'>
                <option disabled value=''>Estado</option>
                <option value='pendiente'>Pendiente</option>
                <option value='cancelado'>Cancelado</option>
            </select>
            <p><strong>Fecha límite:</strong></p><input type='datetime-local' v-model='newDeadline' />
            <!-- PERSONAS -->
            <p><strong>Pide <i class='icoBk logo lt'></i>FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p>
            <p v-show='isMaker'><strong>Hace <i class='icoBk logo lt'></i>FEIV:</strong></p>
            <p v-show='isMaker'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
            <!-- BOTONES -->
            <span class='error'>{{ message }}</span>
            <button @click="editFavour">Actualizar datos</button>
            <button @click="cancelar">Cancelar</button>
        </section>
        <section v-show='canVote' class='vote'>
            <p><strong>Voto:</strong></p>
            <input @click.prevent="" class='voteClass' type='text' v-model='userVote' placeholder="Voto" />
            <button @click.prevent="votarUsuario">ok</button>
        </section>
        <button v-show='isAcepted' @click="aceptFavour(favour.id)">¡Acepto el reto!</button>
    </article>
</template>

<script>
import favours from '@/favours/favours';

export default {
    name: 'FavourDetail',
    data(){
        return{
            message:'',
            message1:'',
            favourId: '',
            askerId: '',
            edit: false,
            editStatus: false,
            editButon: false,
            newLocation: '',
            newDescription:'',
            newCategory:'',
            newReason:'',
            newStatus:'',
            newDeadline:'',
            userVote:'',
        }
    },
    props: {
        isAuthenticated: Boolean,
        isIdUser: Number,
        favour: Object
    },
    computed: {
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
        canVote() {
            return (((this.isIdUser === parseInt(this.favour.user_maker_id)) && this.favour.rating_asker === null)
            || ((this.isIdUser === parseInt(this.favour.user_asker_id)) && this.favour.rating_maker === null))
            && this.favour.status === "finalizado";
        },
        isFoto() {
            return this.favour.user_asker_foto !== null;
        },
        isMaker(){
            return this.favour.user_maker_id !== null;
        },
        isEditable(){
            return (this.isIdUser === parseInt(this.favour.user_asker_id))
            && ((this.favour.status === "asignado") || (this.favour.status === "pendiente"));
        },
        isAcepted(){
            return (this.isIdUser !== parseInt(this.favour.user_asker_id))
            && (this.favour.user_maker_id === null)
            && (this.favour.status !== "cancelado" || this.favour.status !== "asignado")
            && this.isAuthenticated;
        },
        // Estado del favor
        status(){
            let favourStatus
            switch (this.favour.status) {
                case 'asignado':
                    favourStatus = 'var(--accentdk)'
                    break;
                case 'finalizado':
                    favourStatus = 'var(--contrast)'
                    break;
                case 'cancelado':
                    favourStatus = 'var(--gray)'
                    break;
                default:
                    favourStatus = 'var(--accent)'
                    break;
            }
            /* console.log('favourStatus', favourStatus); */
            return favourStatus;
        },
    },
    methods: {
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
                    this.favour.status = 'asignado';
                }, 3000)
            })
            .catch((error) => {
                this.message = error;
            })
        },
        editar(){
             if(this.favour.status === 'asignado') {
                this.editStatus = true;
                this.edit = true;
            } else {
                this.editStatus = false;
                this.edit = true;
            }
            
            this.newLocation = this.favour.location;
            this.newDescription = this.favour.description;
            this.newCategory = this.favour.category;
            this.newReason = this.favour.reason;
            this.newStatus = this.favour.status;
            this.newDeadline = favours.formatDateToInputDate(this.favour.deadline);
        },
        cancelar(){
            if(this.favour.status === 'asignado') {
                this.editStatus = false;
                this.edit = false;
            } else {
                this.editStatus = false;
                this.edit = false;
            }
        },
        editFavour(){
            const favourId = this.favour.id;
            favours.editFavour(this.newLocation, this.newDescription, this.newCategory, this.newReason, this.newStatus, this.newDeadline, favourId)
            .then((result) => {
                this.message = result.data.message;
                this.$emit('isupload');
                setTimeout(() => {
                    this.message='';
                    this.cancelar();
                }, 1000);
            })
            .catch((error) => {
                this.message = error;
            })
        },
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
                }, 1000);
            })
            .catch((error) => {
                this.message = error;
            })
        },
        // Volver / Cerrar
        favourBack(){
            this.$emit('isBack');
            this.$router.go(-1);
        }
    },
    created(){
        // Aplicar formato a las fechas
        this.favour.deadline = favours.formatDateToUser(this.favour.deadline);
    },
    
}
</script>

<style scoped>

</style>