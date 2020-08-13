<template>
    <div class='profile'>
        <vue-headful title='Perfil' />
        <h1>Modifica aquí tus datos:</h1>
        <h2>Login</h2>
            <label>{{ this.emailAct }}</label>
            <input type='password' v-model='passOld' placeholder='Password antigua' />
            <input type='password' v-model='passAct0' placeholder='Nueva password' />
            <input type='password' v-model='passAct1' placeholder='Repite la nueva password' />
            <button @click='updateUser()'>Actualizar contraseña</button>
        <h2>Datos</h2>
            <input type='text' v-model='nameAct' placeholder='Nombre' />
            <input type='text' v-model='surnameAct' placeholder='Apellidos' />
            <input type='text' v-model='aliasAct' placeholder='Escribe aquí tu alias' />
            <button @click='updateData()'>Actualizar datos</button>
        <h2>Histórico de Favores</h2>
        <button @click="getAllFavoursAsker()">Solicitados</button><button @click="getAllFavoursMaker()">Realizados</button>
        <listafavours :favours='favours' />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import axios from 'axios';
import listafavours from '@/components/FavourCard.vue';

import { getUserId, getAuthToken, logout } from '../api/utils';

export default {
  name: 'Perfil',
  components: {
    listafavours
  },
  data() {
    return {
      emailAct: '',
      passOld: '',
      passAct0: '',
      passAct1: '',
      nameAct: '',
      surnameAct: '',
      aliasAct:'',
      datosUser: [],
      userId: null,
      favours: [],
      message: ''
    }
  },
  methods: {
    // ACTUALIZAMOS LOS DATOS DEL USUARIO POR AHORA SIN LA FOTO
    async updateData(){
        try {
            const response = await axios.put('http://localhost:3001/users/'+ getUserId(), {
                email: this.emailAct,
                name: this.nameAct,
                surname: this.surnameAct,
                alias: this.aliasAct
            },
            {
                headers: { 
                    Authorization: `${getAuthToken()}`
                }
            })
            //.then( response => {
            //})
            .finally( () => location.reload());
            console.log(response);
        } catch (error) {
            this.message = error.response.data.message;
        }
    },
    // ACTUALIZAMOS LA CONTRASEÑA DEL USUARIO
    async updateUser(){
        try {
            //console.log(`${this.passAct0} === ${this.passAct1}`)
            
            if(this.passAct0 === this.passAct1) {
                const response = await axios.post('http://localhost:3001/users/'+ getUserId()+'/password', {
                    oldPassword: this.passOld,
                    newPassword: this.passAct1
                },
                {
                    headers: { 
                        Authorization: `${getAuthToken()}`
                    }
                })
                //.then( response => {
                //})
                .finally( () => {
                    location.reload()
                    this.$router.push('/login');
                    location.reload();
                });
                console.log(response);
            }
        } catch (error) {
            console.error;
        }
    },
    // RECUPERAMOS LOS DATOS DEL USUARIO LOGUEADO
    async getUserData(){
        try {
            const response = await axios.get('http://localhost:3001/users/'+ getUserId(), {
                headers: {
                    Authorization: `${getAuthToken()}`
                }
            })
            //.then( response => {
                console.log(response.data.data);
                const datosUser = response.data.data;
                this.emailAct = datosUser.email;
                this.nameAct = datosUser.name;
                this.surnameAct = datosUser.surname;
                this.aliasAct = datosUser.alias;
            //})            
        } catch (error) {
            console.error;
        }
    },
    // FUNCIÓN PARA LISTAR LOS FAVORES QUE HIZO ESTE USUARIO
    async getAllFavoursMaker(){
        try {
            const response = await axios.get('http://localhost:3001/favours/maker/'+ getUserId(), {
                headers: {
                    Authorization: `${getAuthToken()}`
                }
            })
            //.then( response => {
                console.log('MAKER:');
                console.log(response.data.data);
                this.favours = response.data.data;
            //})            
        } catch (error) {
            console.error;
        }
    },
    // FUNCIÓN PARA LISTAR LOS FAVORES QUE SUBIÓ ESTE USUARIO
    async getAllFavoursAsker(){
        try {
            const response = await axios.get('http://localhost:3001/favours/asker/'+ getUserId(), {
                headers: {
                    Authorization: `${getAuthToken()}`
                }
            })
            //.then( response => {
                console.log('ASKER:');
                console.log(response.data.data);
                this.favours = response.data.data;
            //})
            
        } catch (error) {
            console.error;
        }
    },
  },
  created() {
    this.getUserData();
  }
}
</script>

<style>

</style>