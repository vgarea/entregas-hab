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
            throw error.response.data.message;
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
            throw error.response.data.message;
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
            throw error.response.data.message;
        })
    },
    // Actualizar datos de usuario (no password)
    updateData: function(idUser, formData){

        return instance.put('users/'+ idUser, formData,
        {
            headers: {
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            throw error.response.data.message;
        })
    },
    // Validar un usuario
    validateUser: function(regCode) {
        return instance.get('users/validate/' + regCode)
        .catch (error => {
            throw error.response.data.message;
        })
    },
    votarUsuario: function(favourId, userVote) {
        return instace.post('favours/' + favourId + '/votes', {
            vote: userVote
        },
        {
            headers: { 
                Authorization: `${api.getAuthToken()}`
            }
        })
        .catch (error => {
            throw error.response.data.message;
        })
    },
}