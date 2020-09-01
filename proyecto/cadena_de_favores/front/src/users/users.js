import axios from 'axios';
import api from '@/api/api';

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
});

export default {
    // USERS
    // Añadir usuario
    addNewUser: function(email, password) {
        return instance.post('users', {
            email: email,
            password: password,
        })
        .catch (error => {
            return error.response.data.message;
        })
    },
    // Listado de usuarios
    getUserData: function(idUser) {
        return instance.get('users/' + idUser,
        {
            headers: {
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            return error.response.data.message;
        })
    },
    // Actualizar contraseña de usuario
    updateUser: function(idUser, passOld, passAct1) {
        return instance.post('users/'+ idUser +'/password', {
            oldPassword: passOld,
            newPassword: passAct1
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
    updateData: function(idUser, formData){

        return instance.put('users/'+ idUser, formData,
        {
            headers: {
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            return error.response.data.message;
        })
    },
    // Validar un usuario
    validateUser: function(regCode) {
        return instance.get('users/validate/' + regCode)
        .catch (error => {
            return error.response.data.message;
        })
    }
}