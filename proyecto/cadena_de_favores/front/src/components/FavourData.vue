<template>
    <article>
        <!-- VALORES MODIFICABLES -->
        <section>
            <p><strong>Localidad:</strong></p><p v-show='!edit'>{{ favour.location }}</p><input type='text' v-show='edit' v-model='newLocation' placeholder="Localidad" />
            <p><strong>Descripción:</strong></p><p v-show='!edit'>{{ favour.description }}</p><input type='text' v-show='edit' v-model='newDescription' placeholder="Descripción" />
            <p><strong>Categoría:</strong></p><p v-show='!edit'>{{ favour.category }}</p>
            <!--input type='text' v-show='edit' v-model='newCategory' placeholder="Categoría" /-->
            <select name='select' v-show='edit' v-model='newCategory'>
                <option disabled value="">Categorías que puedes seleccionar</option>
                <option value='manitas'>Manitas</option> 
                <option value='nanny'>Nanny</option>
                <option value='transporte'>Transporte</option>
                <option value='tareas casa'>Tareas casa</option>
                <option value='otros' selected>Otros</option>
            </select>
            <p><strong>Razón:</strong></p><p v-show='!edit'>{{ favour.reason }}</p>
            <!--input type='text' v-show='edit' v-model='newReason' placeholder="Razón" /-->
            <select name='select' v-show='edit' v-model='newReason'>
                <option disabled value="">Razón por la que necesitas ayuda</option>
                <option value='movilidad reducida'>Movilidad reducida</option> 
                <option value='hospitalización'>Hospitalización</option>
                <option value='vivo sol@'>Vivo sol@</option>
                <option value='tareas casa'>Tareas casa</option>
                <option value='otros' selected>Otros</option>
          </select>
            <p><strong>Estado:</strong></p><p v-show='!editStatus'>{{ favour.status }}</p>
            <!--input type='text' v-show='editStatus' v-model='newStatus' placeholder="Estado" /-->
            <select name='select'  v-show='editStatus' v-model='newStatus'>
                <option disabled value="">Estado</option>
                <option v-show='edit' value='pendiente' selected>Pendiente</option>
                <option v-show='editStatus' value='finalizado'>Finalizado</option>
                <option v-show='editStatus' value='cancelado'>Cancelado</option>
          </select>
            <p><strong>Fecha límite:</strong></p><p v-show='!edit'>{{ favour.deadline }}</p><input v-show='edit' type='datetime-local' v-model='newDeadline' />  <!-- placeholder="yyyy-MM-ddThh:mm" -->
        </section>
        <!-- PERSONAS -->
        <section>
            <p><strong>Pide #FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p><span></span>
            <p v-show='favour.user_maker_id !== null'><strong>Hace #FEIV:</strong></p>
            <p v-show='favour.user_maker_id !== null'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p><span></span>
        </section>
        <section v-show='(((Number(this.$userId) === Number(favour.user_maker_id)) && favour.rating_asker === null) || ((Number(this.$userId) === Number(favour.user_asker_id)) && favour.rating_maker === null)) && favour.status === "finalizado"'>
            <p><strong>Voto:</strong></p><input type='text' v-model='userVote' placeholder="Voto" />
            {{ message1 }}
            <button @click="votarUsuario()">Vota</button>
        </section>
        <!-- MENSAJE DE ERROR -->
        {{ message }}
        <!-- BOTONES -->
        <!-- MEJORAR LOS V-SHOW -->
        <button v-show='(Number(this.$userId) !== Number(favour.user_asker_id) && favour.user_maker_id === null) && favour.status !== "cancelado" && login' @click="aceptFavour">¡Acepto el reto!</button>

        <button v-show='(Number(this.$userId) === Number(favour.user_asker_id)) && ((favour.status === "asignado") || (favour.status === "pendiente")) && !editButon' @click="editFavour()">Editar</button>
        <button v-show='editButon' @click="actualizarDatos">ActualizarDatos</button>
        <button v-show='editButon' @click="cancelar">Cancelar</button>


    </article>
</template>

<script>

import { getAuthToken, getUserId, formatDateToDB, formatDateToInputDate, formatDateToUser, logout } from '../api/utils';
import axios from 'axios';

export default {
    name: 'FavoursData',
    data(){
        return{
            message:'',
            message1:'',
            userId: '',
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
            login:true,
        }
    },
    props: {
        favour: Object
    },
    methods: {    
        // FUNCIÓN PARA LISTAR LOS FAVORES EN FUNCIÓN DE LA BÚSQUEDA
        async aceptFavour(){
            const favourId = this.favour.id;
            const askerId = this.favour.user_asker_id;
            //console.log('favour_id: ' + favourId + ' | asker_id: ' + askerId);

            try {
                const response = await axios.post('http://localhost:3001/favours/' + favourId, {
                    favour_status: 'asignado'
                },
                {
                    headers: { 
                        Authorization: `${getAuthToken()}`
                    }
                })
                console.log('Aceptado el Favor ' + response);
                alert('Has aceptado el favor: '+ favourId);
                
                location.reload();
            } catch (error) {
                this.message = error.response.data.message;
            }
        },
        editFavour(){
            //console.log((Number(this.$userId) === Number(this.favour.user_asker_id)) +'&&'+ (this.favour.status === "asignado") +'||'+ (this.favour.status === "pendiente") +'&&'+ !this.editButon);
            if(this.favour.status === 'asignado') {
                //console.log('solo puedo editar el estado');
                this.editStatus = true;
                this.edit = false;
            } else {
                //console.log('puedo editar todo');
                this.editStatus = true;
                this.edit = true;
            }
            this.newLocation = this.favour.location;
            this.newDescription = this.favour.description;
            this.newCategory = this.favour.category;
            this.newReason = this.favour.reason;
            this.newStatus = this.favour.status;
            this.newDeadline = formatDateToInputDate(this.favour.deadline);
            this.editButon = true;
        },
        cancelar(){
            this.editButon = false;
            if(this.favour.status === 'asignado') {
                this.editStatus = false;
                this.edit = false;
            } else {
                this.editStatus = false;
                this.edit = false;
            }
        },
        async actualizarDatos(){
            const favourId = this.favour.id;
            try {
                const response = await axios.put('http://localhost:3001/favours/' + favourId, {
                    location: this.newLocation,
                    description: this.newDescription,
                    category: this.newCategory,
                    reason: this.newReason,
                    status: this.newStatus,
                    deadline: formatDateToDB(this.newDeadline)
                },
                {
                    headers: { 
                        Authorization: `${getAuthToken()}`
                    }
                })
                //console.log('Actualizado el Favor ' + response);
                alert('Has actualizado el favor: '+ favourId);
                location.reload();
            } catch (error) {
                this.message = error.response.data.message;
                //console.log(error);
            }
        },
        async votarUsuario() {
            const favourId = this.favour.id;
            let favourUser, favourType;

            if (Number(this.$userId) === Number(this.favour.user_asker_id)){
                favourUser = this.favour.user_maker_name;
                favourType ='hecho';
            } else if (Number(this.$userId) === Number(this.favour.user_maker_id)){
                favourUser = this.favour.user_asker_name;
                favourType ='pedido';
            }
            try {
                const response = await axios.post('http://localhost:3001/favours/' + favourId + '/votes', {
                    vote: this.userVote
                },
                {
                    headers: { 
                        Authorization: `${getAuthToken()}`
                    }
                });
                alert(`Has votado al usuario ${favourUser} que ha ${favourType} el favor ${favourId} `);
                location.reload();
            } catch (error) {
                this.message1 = error.response.data.message;
                //console.log(error.response.data.message);
            }
        },
    },
    beforeCreate(){
        // TRAEMOS EL ID DE USUARIO PARA TRABAJAR EN EL COMPONENTE
        this.$userId = getUserId();
        this.$userId > 0 ? this.login = true : this.login = false;
    },
    created(){
        // TRAEMOS EL ID DE USUARIO PARA TRABAJAR EN EL COMPONENTE
        this.$userId = getUserId();
        // APLICAR FORMATO A LAS FECHAS CON FUNCIÓN DESDE UTILS
        this.favour.deadline = formatDateToUser(this.favour.deadline);
    },
    beforeUpdate(){
        // SE ME HACE RECURSIVA Y NO SÉ PORQUÉ
        for(let i=0; i<=12; i++){
            // APLICAR FORMATO A LAS FECHAS CON FUNCIÓN DESDE UTILS 
            this.favour.deadline = formatDateToUser(this.favour.deadline);
            // TRAEMOS EL ID DE USUARIO PARA TRABAJAR EN EL COMPONENTE
            this.$userId = getUserId();
            this.$userId > 0 ? this.login = true : this.login = false;
        }
    },
}
</script>

<style scoped>

</style>