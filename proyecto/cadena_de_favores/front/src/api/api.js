import jwt from 'jwt-decode';
import axios from 'axios';

import { format, addMinutes } from "date-fns";
//import formatISO from "date-fns/formatISO";
import es from "date-fns/locale/es";

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
});

export default {
    // Creo la función que hace el login
    login: function (user, password) {
        return instance.post('users/login/', {
                email: user,
                password: password
            })
            .then(response => {
                this.setToken(response.data.data.token);
                this.setuserId(response.data.data.idUser);
                return response.data.data;
            });
    },
    // Guardo el token
    setToken: (token) => {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('AUTH_TOKEN_KEY', token);
    },
    // Guardo el Id del usuario logueado
    setuserId: (userId) => {
        // Por ahora pongo el userId en el localStorage
        localStorage.setItem('USER', userId);
    },
    // Borra el token
    logout: () => {
        localStorage.removeItem('AUTH_TOKEN_KEY');
        localStorage.removeItem('USER');
        delete instance.defaults.headers.common['Authorization'];
    },
    
    // Consigue la fecha de caducidad del token
    tokenExpiration: (encodedToken) => {
        let token = jwt(encodedToken);
        let date = new Date(0);

        if(!token.exp) {
            return null;
        }
        
        date.setUTCSeconds(token.exp);
        return date;
    },
    // Comprueba si el token está activo
    isExpired: (token) => {
        let expirationDate = this.tokenExpiration(token);
        return expirationDate < new Date();
    },
    // Recupero el token
    getAuthToken: () => {
        console.log('getAuthToken');
        return localStorage.getItem('AUTH_TOKEN_KEY');
    },
    // Estoy logueado
    isLoggedIn: () => {
        console.log('isLoggedIn');
        let authToken = this.getAuthToken();
        return !!authToken && !this.isExpired(authToken);
    },
    
    // FUNCIÓN PARA RECUPERAR EL ID DEL USUARIO LOGUEADO EN EL LOCALSTORAGE
    getUserId: () => {
        return localStorage.getItem('USER');
    },

    // Favours
    getFavours: function(searchFav, locationFav, categoryFav, dataFav) {
          instance.post('http://localhost:3001/favours/find', {
            search: searchFav,
            locationFavour: locationFav,
            categoryFavour: categoryFav,
            dataFavour: dataFav
          })
          .then(response => {
              return response.data.data;
          })
      }

    
}
