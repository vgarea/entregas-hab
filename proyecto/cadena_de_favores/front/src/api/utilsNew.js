import jwt from 'jwt-decode';
import axios from 'axios';

import { format, addMinutes } from "date-fns";
//import formatISO from "date-fns/formatISO";
import es from "date-fns/locale/es";

export default{
    login: (user, password) =>  {
        const response = axios.post(`http://localhost:3031/users/login`, {
            email: user,
            password: password
        });
            console.log(response.data.data);
            // ME GUARDO EL TOKEN EN EL LOCAL STORAGE
            setAuthToken(response.data.data.token);
    
            // ME GUARDO EL ID DEL USER EN EL LOCAL STORAGE
            setUserId(response.data.data.idUser);
            // await setUserId(response.data.data.token);
    
            // ME GUARDO EL ROL
            //setIsAdmin(response.data.admin);
            // ME GUARDO EL NOMBRE DEL USER
            //setName(response.data.user);
    },
    setAuthToken: (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('AUTH_TOKEN_KEY', token);
    },
    getAuthToken: () => {
        return localStorage.getItem('AUTH_TOKEN_KEY');
    },
    tokenExpiration: (encodedToken) => {
        let token = jwt(encodedToken);
        let date = new Date(0);
    
        if(!token.exp) {
            return null;
        }
        
        date.setUTCSeconds(token.exp);
        return date;
    },
    isExpired: (token ) => {
        let expirationDate = tokenExpiration(token);
        return expirationDate < new Date();
    },
    isLoggedIn: () => {
        let authToken = getAuthToken();
        return !!authToken && !isExpired(authToken);
    },
    setUserId: (id) => {
        localStorage.setItem('USER', id);
    
        // ME GUARDO EL ID DEL USER (otra forma)
        //const tokenDecoded = jwt(id);
        //localStorage.setItem('USER', tokenDecoded.id;
    },
    getUserId: () => {
        return localStorage.getItem('USER');
    },
    logout: () => {
        axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('AUTH_TOKEN_KEY');
        localStorage.removeItem('USER');
        //localStorage.removeItem('ROLE');
        //localStorage.removeItem('NAME');
    },
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
    },
    getImageName: (name) => {
        return process.env.VUE_APP_STATIC + name;
    },
}