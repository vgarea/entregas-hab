import axios from 'axios';
import api from '@/api/api';

import { format, addMinutes } from "date-fns";
import es from "date-fns/locale/es";

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
});

export default {
    // FAVOURS
    // Recuperar valores de un favor
    getFavour: (id) => {
        return instance.get('favours/' + id)
        .catch((error) => {
            return error;
        })
    },
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
            return error;
        })
    },
    // Listado de favores como asker
    getAllFavoursAsker: function(idUser) {
        return instance.get('favours/asker/'+ idUser,
        {
            headers: {
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            return error.response.data.message;
        })
    },
    // Listado de favores como maker
    getAllFavoursMaker: function(idUser) {
        return instance.get('favours/maker/'+ idUser,
        {
            headers: {
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            return error.response.data.message;
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
            return error;
        })
    },
    actualizarDatos: function(newLocation, newDescription, newCategory, newReason, newDeadline) {
        return instance.post('favours/', {
            location: newLocation,
            description: newDescription,
            category: newCategory,
            reason: newReason,
            status: 'pendiente',
            deadline: this.formatDateToDB(newDeadline)
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
    // Aceptar favor
    aceptFavour: function(id) {
        return instance.post('favours/' + id, {
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
    // Votar usuario
    votarUsuario: (favourId, userVote ) => {
        return instance.post('favours/' + favourId + '/votes', {
            vote: userVote
        },
        {
            headers: { 
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch ((error) => {
            console.log(error);
            return error.response.data.message;
        });
    },
    // Formatear fechas
    // FUNCIÓN PARA CAMBIAR LA HORA A DB
    formatDateToDB: (date) => {
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
    // FUNCIÓN PARA CAMBIAR LA HORA EN LOS INPUT DATA-
    formatDateToInputDate: (date) => {
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

        const dateDay = format(internalDate, "yyy-MM-dd", { locale: es });
        const dateHour = format(internalDate, "p", { locale: es });

        return String(dateDay +'T'+ dateHour);
    },
    // FUNCIÓN PARA PONER BIEN LA HORA EN LOCAL
    formatDateToUser: (date) => {
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
        return format(new Date(adjustedDate), "yyyy-MM-dd p", { locale: es });
    }
}