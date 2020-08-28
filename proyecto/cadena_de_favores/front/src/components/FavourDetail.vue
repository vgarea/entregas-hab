<template>
    <article>
        <!-- VALORES MODIFICABLES -->
        <section v-if='!edit'>
            <p><strong>Localidad:</strong></p><p>{{ favour.location }}</p>
            <p><strong>Descripción:</strong></p><p>{{ favour.description }}</p>
            <p><strong>Categoría:</strong></p><p>{{ favour.category }}</p>
            <p><strong>Razón:</strong></p><p>{{ favour.reason }}</p>
            <p><strong>Estado:</strong></p><p>{{ favour.status }}</p>
            <p><strong>Fecha límite:</strong></p><p>{{ favour.deadline }}</p>
            <!-- PERSONAS -->
            <p><strong>Pide #FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p>
            <p v-show='favour.user_maker_id !== null'><strong>Hace #FEIV:</strong></p>
            <p v-show='favour.user_maker_id !== null'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
            <!-- BOTONES -->
            <button v-show='(isIdUser === Number(favour.user_asker_id)) && ((favour.status === "asignado") || (favour.status === "pendiente"))' @click="editFavour">Editar</button>
        </section>
        <section v-else-if='editStatus'>
            <p><strong>Localidad:</strong></p><p>{{ favour.location }}</p>
            <p><strong>Descripción:</strong></p><p>{{ favour.description }}</p>
            <p><strong>Categoría:</strong></p><p>{{ favour.category }}</p>
            <p><strong>Razón:</strong></p><p>{{ favour.reason }}</p>
            <p><strong>Estado:</strong></p>
            <select name='select' v-model='newStatus'>
                <option disabled value="">Estado</option>
                <option value='asignado'>Asignado</option>
                <option value='finalizado'>Finalizado</option>
                <option value='cancelado'>Cancelado</option>
            </select>
            <p><strong>Fecha límite:</strong></p><p>{{ favour.deadline }}</p>
            <!-- PERSONAS -->
            <p><strong>Pide #FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p>
            <p v-show='favour.user_maker_id !== null'><strong>Hace #FEIV:</strong></p>
            <p v-show='favour.user_maker_id !== null'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
            <!-- BOTONES -->
            <button @click="actualizarDatos">ActualizarDatos</button>
            <button @click="cancelar">Cancelar</button>
        </section>
        <section v-else>
            <p><strong>Localidad:</strong></p><input type='text' v-show='edit' v-model='newLocation' placeholder="Localidad" />
            <p><strong>Descripción:</strong></p><input type='text' v-show='edit' v-model='newDescription' placeholder="Descripción" />
            <p><strong>Categoría:</strong></p>
            <select name='select' v-model='newCategory'>
                <option disabled value="">Categorías que puedes seleccionar</option>
                <option value='manitas'>Manitas</option> 
                <option value='nanny'>Nanny</option>
                <option value='transporte'>Transporte</option>
                <option value='tareas casa'>Tareas casa</option>
                <option value='otros' selected>Otros</option>
            </select>
            <p><strong>Razón:</strong></p>
            <select name='select' v-model='newReason'>
                <option disabled value="">Razón por la que necesitas ayuda</option>
                <option value='movilidad reducida'>Movilidad reducida</option> 
                <option value='hospitalización'>Hospitalización</option>
                <option value='vivo sol@'>Vivo sol@</option>
                <option value='tareas casa'>Tareas casa</option>
                <option value='otros' selected>Otros</option>
            </select>
            <p><strong>Estado:</strong></p>
            <select name='select' v-model='newStatus'>
                <option disabled value="">Estado</option>
                <option value='pendiente'>Pendiente</option>
                <option value='cancelado'>Cancelado</option>
            </select>
            <p><strong>Fecha límite:</strong></p><input type='datetime-local' v-model='newDeadline' />
            <!-- PERSONAS -->
            <p><strong>Pide #FEIV:</strong></p><p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname}}</p>
            <p v-show='favour.user_maker_id !== null'><strong>Hace #FEIV:</strong></p>
            <p v-show='favour.user_maker_id !== null'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
            <!-- BOTONES -->
            <button @click="actualizarDatos">ActualizarDatos</button>
            <button @click="cancelar">Cancelar</button>
        </section>
        <button v-show='(isIdUser !== Number(favour.user_asker_id)) && (favour.user_maker_id === null) && (favour.status !== "cancelado") && isAuthenticated' @click="aceptFavour">¡Acepto el reto!</button>
    </article>
</template>

<script>
import { getAuthToken, formatDateToDB, formatDateToInputDate, formatDateToUser, logout } from '@/api/utils';
import favours from '@/favours/favours';
import axios from 'axios';

export default {
    name: 'FavoursData',
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
    methods: {    
        // FUNCIÓN PARA LISTAR LOS FAVORES EN FUNCIÓN DE LA BÚSQUEDA
        aceptFavour(){
            favours.aceptFavour(this.favour.id, this.favour.user_asker_id)
            .then(() => {
                alert('Has aceptado el favor: '+ favourId);
            })
            .catch((error) => {
                this.message = error;
            })
            /* const favourId = this.favour.id;
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
            } */
        },
        editFavour(){
             if(this.favour.status === 'asignado') {
                //console.log('solo puedo editar el estado');
                this.editStatus = true;
                this.edit = true;
            } else {
                //console.log('puedo editar todo');
                this.editStatus = false;
                this.edit = true;
            }
            
            this.newLocation = this.favour.location;
            this.newDescription = this.favour.description;
            this.newCategory = this.favour.category;
            this.newReason = this.favour.reason;
            this.newStatus = this.favour.status;
            this.newDeadline = formatDateToInputDate(this.favour.deadline);
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

            if (this.isIdUser === Number(this.favour.user_asker_id)){
                favourUser = this.favour.user_maker_name;
                favourType ='hecho';
            } else if (this.isIdUser === Number(this.favour.user_maker_id)){
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
    created(){
        // APLICAR FORMATO A LAS FECHAS CON FUNCIÓN DESDE UTILS
        this.favour.deadline = formatDateToUser(this.favour.deadline);
    },
    
}
</script>

<style scoped>

</style>