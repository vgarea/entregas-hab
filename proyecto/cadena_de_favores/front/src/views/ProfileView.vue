<template>
    <main id='profile'>
        <vue-headful title='MIS DATOS' />
        <section v-if='!isNotLogued'>
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
            <listafavours
                :favours='favours'
                :is-authenticated="isAuthenticated"
                :is-idUser="isIdUser"
            />
            <p>{{ message }}</p>
        </section>
    </main>
</template>

<script>

import axios from 'axios';
import listafavours from '@/components/Favour.vue';

import { getUserId, getAuthToken, logout } from '../api/utils';

export default {
  name: 'Perfil',
  props: {
      isAuthenticated: Boolean,
      isIdUser: Number
  },
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
        try {
            let formData = new FormData();
            formData.append('avatar', this.avatarAct);
            formData.append('email', this.emailAct);
            formData.append('name' ,this.nameAct);
            formData.append('surname', this.surnameAct);
            formData.append('alias', this.aliasAct);

            const response = await axios.put('http://localhost:3001/users/'+ getUserId(), formData,
            {
                headers: { 
                    Authorization: `${getAuthToken()}`
                }
            })
            console.log('updateData:' + response);
            location.reload();
        } catch (error) {
            this.messageData = error.response.data.message;
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
                this.$router.push('/login');
                location.reload();
                console.log('updateUser: ')
                console.log(response);
            }
        } catch (error) {
            this.messagePass = error.response.data.message;
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
                const datosUser = response.data.data;
                
                console.log('getUserData: ');
                console.log(datosUser);

                this.emailAct = datosUser.email;
                this.nameAct = datosUser.name;
                this.surnameAct = datosUser.surname;
                this.aliasAct = datosUser.alias;
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
                console.log('MAKER:');
                console.log(response.data.data);
                this.favours = response.data.data;
        } catch (error) {
            this.message = error.response.data.message;
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
                console.log('ASKER:');
                console.log(response.data.data);
                this.favours = response.data.data;
        } catch (error) {
            this.message = error.response.data.message;
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