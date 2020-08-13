<!--
<label><strong>Status:</strong></p><p>{{ fav.status }}</label>
<input type='text' v-model='statusAct' placeholder='Status' />
<input type='text' v-model='voteAct' placeholder='Valoración' />
<p><strong>Fecha límite:</strong></p><p>{{ favour.deadline }}</p>
<input type='text' v-model='deadlineAct' placeholder='Fecha límite' />
<button @click='updateData()'>Actualizar datos</button>
-->

<template>
    <div>
        <ul>
            <li v-for='favour in favours' :key='favour.id'>
                <p><strong>Localidad:</strong></p><p>{{ favour.location }}</p>
                <p><strong>Descripción:</strong></p><p>{{ favour.description }}</p>
                <p><strong>Categoría:</strong></p><p>{{ favour.category }}</p>
                <p><strong>Razón:</strong></p><p>{{ favour.reason }}</p>
                <p><strong>Estado:</strong></p><p>{{ favour.status }}</p>
                <p><strong>Pide favor:</strong></p>
                <p>{{ favour.user_asker_name + ' ' + favour.user_asker_surname }}</p>
                <p v-show='favour.user_maker_name !== null'><strong>Hace favor:</strong></p>
                <p v-show='favour.user_maker_name !== null'>{{ favour.user_maker_name + ' ' + favour.user_maker_surname }}</p>
                <p><strong>Fecha límite:</strong></p><p>{{ formatDateToDB(favour.deadline) }}</p>
                <button v-show='favour.user_maker_name === null && favour.user_maker_id !== 12' @click="aceptFavour()">¡Acepto el reto!</button>
                <p>{{ message }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
/*
PASOS A SEGUIR:
1 - CREAR LA FUNCIÓN EN LA API (SINO, NANAI)
2 - CREAR EVENTO CON EL QUE ENVÍO EL ID
3 - CREAR FUNCIÓN EN LA VISTA QUE RECOJA EL ID
*/

import { format, formatDistance, addMinutes } from "date-fns";
import es from "date-fns/locale/es";

export default {
    name: 'FavourCard',
    props:{
        favours: Array,
        message:'',
    },
    methods: {
        formatDateToDB(date) {
            let internalDate;
            if(typeof date === 'string'){
                internalDate = new Date(date);
            } else {
                internalDate = date;
            }
            const adjustedDate = addMinutes(
                internalDate,
                internalDate.getTimezoneOffset()
            );
            return format(adjustedDate, "yyyy-MM-dd HH:mm:ss", { locale: es });
        },
            // FUNCIÓN PARA LISTAR LOS FAVORES EN FUNCIÓN DE LA BÚSQUEDA
        async aceptFavour(){
        try {
            console.log(favour.user_maker_id +' maker + user '+ favour.id)
            
            const result = await axios
            .post('http://localhost:3001/favours/' + favour.user_maker_id, {
                maker_id: favour.id
            },
            {
                headers: { 
                    Authorization: `${getAuthToken()}`
                }
            })
            .then(response => {
                console.log('favours: ');
                //console.log(response.data.data);
            })
        } catch (error) {
            //console.error;
            this.message = error.response.data.message;
        }
        },
    },
    created() {
    }
}
</script>

<style scoped>

</style>