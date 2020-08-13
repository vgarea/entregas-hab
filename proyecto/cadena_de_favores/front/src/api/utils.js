import jwt from 'jwt-decode';
import axios from 'axios';

const URL = 'http://localhost:3001';

export function login(user, password) {
        //console.log(user +' user + email'+ password);
        axios.post(`${URL}/users/login`, {
            email: user,
            password: password
        })
        .then((response) => {
            console.log(response.data.data);
            
            // ME GUARDO EL TOKEN
            setAuthToken(response.data.data.token);

            // ME GUARDO EL ID DEL USER
            setUserId(response.data.data.idUser);

            // ME GUARDO EL ID DEL USER (otra forma)
            //const tokenDecoded = jwt(response.data.data.token);
            //setUserId(tokenDecoded.id);
            
            // ME GUARDO EL ROL
            //setIsAdmin(response.data.admin);
            // ME GUARDO EL NOMBRE DEL USER
            //setName(response.data.user);
        })
}

// FUNCIÓN PARA GUARDAR EL LOCALSTORAGE EL JSONWEBTOKEN
export function setAuthToken(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('AUTH_TOKEN_KEY', token);
}

// FUNCIÓN PARA RECUPERAR EL TOKEN DESDE EL LOCALSTORAGE
export function getAuthToken(){
    return localStorage.getItem('AUTH_TOKEN_KEY');
}

// FUNCTIÓN PARA CONSEGUIR LA FECHA DE CADUCIDAD DEL TOKEN
export function tokenExpiration(encodedToken) {
    let token = jwt(encodedToken);
    let date = new Date(0);

    if(!token.exp) {
        return null;
    }
    
    date.setUTCSeconds(token.exp);
    return date;
}

// FUNCIÓN QUE COMPRUEBA SI EL TOKEN ESTÁ ACTIVO
export function isExpired(token){
    let expirationDate = tokenExpiration(token);
    return expirationDate < new Date();
}

// FUNCIÓN QUE COMPRUEBA SI LA PERSONA ESTÁ LOGUEADA Y SU TOKEN ES VÁLIDO
export function isLoggedIn() {
    let authToken = getAuthToken();
    return !!authToken && !isExpired(authToken);
}

// FUNCIÓN PARA GUARDAR EL ID DEL USUARIO LOGUEADO EN EL LOCALSTORAGE
export function setUserId(id){
    localStorage.setItem('USER', id);
}

// FUNCIÓN PARA RECUPERAR EL ID DEL USUARIO LOGUEADO EN EL LOCALSTORAGE
export function getUserId(){
    return localStorage.getItem('USER');
}

// FUNCIÓN PARA GUARDAR ADMIN EN LOCALSTORAGE
/*export function setIsAdmin(admin){
    localStorage.setItem('ROLE', admin);
}*/

// FUNCIÓN PARA RECUPERAR EL ADMIN DE LOCALSTORAGE
/*export function getIsAdmin(){
    return localStorage.getItem('ROLE');
}*/

// FUNCIÓN QUE COMPRUEBA SI ES ADMIN O NO
/*export function checkIsAdmin(){
    let role = null;
    let admin = getIsAdmin();
    if (admin === 'true') {
        role === true;
    } else {
        role === false;
    }
    return role;
}*/

// FUNCIÓN DE GAURDAR EL NOMBRE DE USER EN EL LOCALSTORAGE
/*export function setName(user) {
    localStorage.setItem('NAME', user);
}*/

// FUNCIÓN DE RECUPERAR EL NOMBRE DE USER EN LOCALSTORAGE
/*export function getName() {
    return localStorage.getItem('NAME');
}*/

// FUNCIÓN DE LOGOUT
export function logout(){
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('AUTH_TOKEN_KEY');
    localStorage.removeItem('USER');
    //localStorage.removeItem('ROLE');
    //localStorage.removeItem('NAME');
}
