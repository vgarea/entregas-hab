import axios from 'axios';
import api from '@/api/api';
import { formatDateToDB } from '@/api/utils'

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
});

export default {
    // FAVOURS
    // Listar todos los favores
    getFavours: function(searchFav, locationFav, categoryFav, dataFav) {
        //console.log('searchFav '+searchFav+' locationFav '+locationFav+' categoryFav '+ categoryFav + ' dataFav ' +dataFav)
        return instance.post('favours/find', {
        search: searchFav,
        locationFavour: locationFav,
        categoryFavour: categoryFav,
        dataFavour: dataFav
        })
        .then(response => {
            //console.log('response: '+response.data.data);
            return response.data.data;
        })
        .catch(error => {
            console.error(error);
        })
    },
    // Images
    getImageName: (name) => {
        return process.env.VUE_APP_SERVER_URL + process.env.VUE_APP_STATIC + name;
    },
    // HEROES
    // Listar todos los clientes
    getAllHeroes: () => {
        return instance.get('users')
        .then(response => {
            console.log('heroes: ');
            console.log(response.data.data);
            return response.data.data;
        })
        .catch(error => {
            console.error(error);
        })
    },
    actualizarDatos: function(newLocation, newDescription, newCategory, newReason, newDeadline) {
        return instance.post('favours/', {
            location: newLocation,
            description: newDescription,
            category: newCategory,
            reason: newReason,
            status: 'pendiente',
            deadline: formatDateToDB(newDeadline)
        },
        {
            headers: { 
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            return error.response.data.message;
        })
    },
    // FUNCIÓN PARA LISTAR LOS FAVORES EN FUNCIÓN DE LA BÚSQUEDA
    aceptFavour: function(id, user_asker) {
        const favourId = id;
        const askerId = user_asker;
        //console.log('favour_id: ' + favourId + ' | asker_id: ' + askerId);
        return instance.post('favours/' + favourId, {
            favour_status: 'asignado'
        },
        {
            headers: { 
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch ((error) => {
            return error.response.data.message;
        });
    },
}