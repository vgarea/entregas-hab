<template>
    <div v-if='isNotLogued' class="loader">
        Loading...
    </div>
    <main id='profile' v-else>
        <vue-headful title='MIS DATOS' />
        <section>
            <h1>MODIFICA TUS DATOS</h1>
            <h2>LOGIN</h2>
                <label>{{ this.emailAct }}</label>
                <input type='password' v-model='passOld' placeholder='Password antigua' />
                <input type='password' v-model='passAct0' placeholder='Nueva password' />
                <input type='password' v-model='passAct1' placeholder='Repite la nueva password' />
                <p>{{ messagePass }}</p>
                <button @click='updateUser()'>Actualizar contraseña</button>
            <h2>DATOS</h2>
                <input type='text' v-model='nameAct' placeholder='Nombre' />
                <input type='text' v-model='surnameAct' placeholder='Apellidos' />
                <input type='text' v-model='aliasAct' placeholder='Escribe aquí tu alias' />
                <input type="file" ref="avatarAct" @change="uploadAvatar">
                <p>Nombre del avatar: {{avatarAct.name}}</p>
                <p>{{ messageData }}</p>
                <button @click='updateData()'>Actualizar datos</button>
            <h2>HISTÓRICO DE #FEIVS</h2>
            <button @click="getAllFavoursAsker()">Solicitados</button><button @click="getAllFavoursMaker()">Realizados</button>
            <ul>
                <li v-for="favour in favours" :key="favour.id">
                    <favourdata
                        :is-authenticated="isAuthenticated"
                        :is-id-user="isIdUser"
                        :favour="favour"
                    />
                </li>
            </ul>
            <!-- <listafavours
                :favours='favours'
                :is-authenticated="isAuthenticated"
                :is-idUser="isIdUser"
            /> -->
            <p>{{ message }}</p>
        </section>
    </main>
</template>

<script>

import favourdata from '@/components/FavourListDetail.vue';

import axios from 'axios';
import favours from '@/favours/favours';
import users from '@/users/users';
import api from '@/api/api';
/* import { getUserId, getAuthToken, logout } from '../api/utils'; */

export default {
  name: 'ProfileView',
  props: {
      isAuthenticated: Boolean,
      isIdUser: Number,
      favour: Array,
  },
  components: {
    favourdata
  },
  data() {
    return {
        favours: [],
        datosUser: [],
        emailAct: '',
        passOld: '',
        passAct0: '',
        passAct1: '',
        nameAct: '',
        surnameAct: '',
        aliasAct:'',
        userId: null,
        message: '',
        messagePass: '',
        messageData: '',
        avatarAct: ''
    }
  },
  computed: {
    idUser(){
      return this.isIdUser;
    },
    isNotLogued(){
      if(!this.isAuthenticated){
        this.$router.push({name: 'Login'});
      }
    }
  },
  methods: {
    // FUNCIÓN PARA SUBIR LA FOTO
    uploadAvatar() {
      this.avatarAct = this.$refs.avatarAct.files[0];
      console.log('this.avatarAct: ');
      console.log(this.avatarAct);
    },

    // ACTUALIZAMOS LOS DATOS DEL USUARIO
    async updateData(){
        let formData = new FormData();
        formData.append('avatar', this.avatarAct);
        formData.append('email', this.emailAct);
        formData.append('name' ,this.nameAct);
        formData.append('surname', this.surnameAct);
        formData.append('alias', this.aliasAct);

        return users.updateData(this.isIdUser, formData)
        .then(result => {
            this.messagePass = result.data.message;
        })
        .catch(error => {
            this.messageData = error.response.data.message;
        });
        /* try {
            let formData = new FormData();
            formData.append('avatar', this.avatarAct);
            formData.append('email', this.emailAct);
            formData.append('name' ,this.nameAct);
            formData.append('surname', this.surnameAct);
            formData.append('alias', this.aliasAct);

            const response = await axios.put('http://localhost:3001/users/'+ this.isIdUser, formData,
            {
                headers: { 
                    Authorization: `${api.getAuthToken()}`
                }
            })
            console.log('updateData:' + response);
            location.reload();
        } catch (error) {
            this.messageData = error.response.data.message;
        } */
    },
    // ACTUALIZAMOS LA CONTRASEÑA DEL USUARIO
    async updateUser(){
        if(this.passAct0 === this.passAct1) {
            return users.updateUser(this.isIdUser, this.passOld, this.passAct1)
            .then(result => {
                this.messagePass = result.data.message;
            })
            .catch(error => {
                this.messagePass = error.response.data.message;
            });
        } else {
            this.messagePass = 'Contraseñas distintas'
        }
        /* try {
            //console.log(`${this.passAct0} === ${this.passAct1}`)
            
            if(this.passAct0 === this.passAct1) {
                const response = await axios.post('http://localhost:3001/users/'+ this.isIdUser+'/password', {
                    oldPassword: this.passOld,
                    newPassword: this.passAct1
                },
                {
                    headers: { 
                        Authorization: `${api.getAuthToken()}`
                    }
                })
                //this.$router.push('/login');
                //location.reload();
                //console.log('updateUser: ')
                //console.log(response);
            }
        } catch (error) {
            this.messagePass = error.response.data.message;
        } */
    },
    // RECUPERAMOS LOS DATOS DEL USUARIO LOGUEADO
    getUserData(){
        return users.getUserData(this.isIdUser)
        .then(response => {
            const datosUser = response.data.data;
            //console.log('getUserData: ');
            //console.log(datosUser);

            this.emailAct = datosUser.email;
            this.nameAct = datosUser.name;
            this.surnameAct = datosUser.surname;
            this.aliasAct = datosUser.alias;
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
        /* try {
            const response = await axios.get('http://localhost:3001/users/'+ this.isIdUser, {
                headers: {
                    Authorization: `${api.getAuthToken()}`
                }
            })
                const datosUser = response.data.data;
                
                console.log('getUserData: ');
                console.log(datosUser);

                this.emailAct = datosUser.email;
                this.nameAct = datosUser.name;
                this.surnameAct = datosUser.surname;
                this.aliasAct = datosUser.alias;
        } catch (error) {
            console.error;
        } */
    },
    // FUNCIÓN PARA LISTAR LOS FAVORES QUE HIZO ESTE USUARIO
    getAllFavoursMaker(){
        return users.getAllFavoursMaker(this.isIdUser)
        .then(response => {
            console.log('MAKER:');
            console.log(response.data.data);
            this.favours = response.data.data;
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
        /* try {
            const response = await axios.get('http://localhost:3001/favours/maker/'+ this.isIdUser, {
                headers: {
                    Authorization: `${api.getAuthToken()}`
                }
            })
                console.log('MAKER:');
                console.log(response.data.data);
                this.favours = response.data.data;
        } catch (error) {
            this.message = error.response.data.message;
        } */
    },
    // FUNCIÓN PARA LISTAR LOS FAVORES QUE SUBIÓ ESTE USUARIO
    async getAllFavoursAsker(){
        return users.getAllFavoursAsker(this.isIdUser)
        .then(response => {
            console.log('ASKER:');
            console.log(response.data.data);
            this.favours = response.data.data;
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
        /* try {
            const response = await axios.get('http://localhost:3001/favours/asker/'+ this.isIdUser, {
                headers: {
                    Authorization: `${api.getAuthToken()}`
                }
            })
                console.log('ASKER:');
                console.log(response.data.data);
                this.favours = response.data.data;
        } catch (error) {
            this.message = error.response.data.message;
        } */
    },
  },
  created() {
    this.getUserData();
  }
}
</script>

<style>

</style>