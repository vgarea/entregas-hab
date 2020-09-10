<template>
    <div v-if='isNotLogued' class="loader">
        Loading...
    </div>
    <main id='profile' v-else>
        <vue-headful title='MIS DATOS' />
        <header>
            <h1>MODIFICA TUS DATOS</h1>
        </header>
        <section>
            <tabs
            :tabs="tabs"
            :currentTab="currentTab"
            :wrapper-class="'default-tabs'"
            :tab-class="'default-tabs__item'"
            :tab-active-class="'default-tabs__item_active'"
            :line-class="'default-tabs__active-line'"
            @onClick="handleClick"
            />
            <section class="content">
                <section v-if="currentTab === 'tab1'" class='ficha'>
                    <header>
                        <h2>PASSWORD NUEVA</h2>
                    </header>
                    <article >
                        <label>{{ this.emailAct }}</label>
                        <input type='password' @focus="cleanError('pass')" v-model='passOld' placeholder='Password antigua' />
                        <input type='password' @focus="cleanError('pass')" v-model='passAct0' placeholder='Nueva password' />
                        <input type='password' @focus="cleanError('pass')" v-model='passAct1' placeholder='Repite la nueva password' />
                        <p class='error'>{{ messagePass }}</p>
                        <button @click='updateUser'>Actualizar contraseña</button>
                        <p class='error'>{{ message }}</p>
                    </article>
                </section>
                <section v-if="currentTab === 'tab2'" class='ficha'>
                    <header>
                        <h2>CAMBIA TUS DATOS</h2>
                    </header>
                    <article>
                        <input type='text' @focus="cleanError" v-model='nameAct' placeholder='Nombre' />
                        <input type='text' @focus="cleanError" v-model='surnameAct' placeholder='Apellidos' />
                        <input type='text' @focus="cleanError" v-model='aliasAct' placeholder='Escribe aquí tu alias' />
                        <input type="file" @focus="cleanError" ref="avatarAct" @change="uploadAvatar" class='inputFile'>
                        <p>Nombre del avatar: {{avatarAct.name}}</p>
                        <p class='error'>{{ messageData }}</p>
                        <button @click='updateData'>Actualizar datos</button>
                        <p class='error'>{{ message }}</p>
                    </article>
                </section>
                <section v-if="currentTab === 'tab3'">
                    <h2>HISTÓRICO DE <i class='logo icoBk bg'></i>FEIVS</h2>
                    <button @click="getAllFavoursAsker" class='tabs__item default-tabs__item tabs_button' :class="{'tabs__item_active':isActive}">SOLICITADOS</button>
                    <button @click="getAllFavoursMaker" class='tabs__item default-tabs__item tabs_button' :class="{'tabs__item_active':!isActive}">REALIZADOS</button>
                    <ul>
                        <li v-for="favour in favours" :key="favour.id">
                            <favourdata
                                :is-authenticated="isAuthenticated"
                                :is-id-user="isIdUser"
                                :favour="favour"
                                @isBack="goToHistoric"
                            />
                        </li>
                    </ul>
                    <p class='error'>{{ message }}</p>
                </section>
            </section>
        </section>
    </main>
</template>

<script>

import favourdata from '@/components/FavourListDetail.vue';

import api from '@/api/api';
import users from '@/users/users';
import favours from '@/favours/favours';

import Tabs from 'vue-tabs-with-active-line';

export default {
  name: 'ProfileView',
  props: {
      isAuthenticated: Boolean,
      isIdUser: Number,
      favour: Array,
  },
  components: {
    favourdata,
    Tabs
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
        avatarAct: '',
        tabs: [
            { title: 'HISTÓRICO', value: 'tab3'},
            { title: 'LOGIN', value: 'tab1' },
            { title: 'DATOS', value: 'tab2' },
        ],
        currentTab: 'tab3',
        isActive: false,
    }
  },
  computed: {
    idUser(){
        return this.isIdUser;
    },
    // Función para comprobar si está cargado el contenido
    isNotLogued(){
        if(this.datosUser){
            return false;
        }
        return true;
    },
  },
  methods: {
    // Subir la foto
    uploadAvatar() {
      this.avatarAct = this.$refs.avatarAct.files[0];
      console.log('this.avatarAct: ', this.avatarAct);
    },
    // Actualizar datos de usuario
    async updateData(){
        let formData = new FormData();
        this.avatarAct ? formData.append('avatar', this.avatarAct) : false;
        formData.append('email', this.emailAct);
        formData.append('name' ,this.nameAct);
        formData.append('surname', this.surnameAct);
        formData.append('alias', this.aliasAct);

        return users.updateData(this.idUser, formData)
        .then(result => {
            this.messageData = result.data.message;
            setTimeout(() => {
                this.nameAct='';
                this.surnameAct='';
                this.aliasAct='';
                this.avatarAct=[];
                this.avatarAct.name='';
                this.avatarAct.$refs='';                
                this.messageData='';
                this.getUserData();
            }, 1000);
        })
        .catch(error => {
            this.messageData = error.response.data.message;
        });
    },
    // Actualizamos la contraseña y enviamos al login
    async updateUser(){
        if(this.passAct0 === this.passAct1) {
            return users.updateUser(this.idUser, this.passOld, this.passAct1)
            .then(result => {
                this.messagePass = result.data.message;
                setTimeout(() => {
                    this.passOld='';
                    this.passAct0='';
                    this.passAct1='';
                    api.logout();
                    this.messagePass='';
                    this.$router.push({name: 'Login'});
                }, 1000);
            })
            .catch(error => {
                this.messagePass = error;
            });
        } else {
            this.messagePass = 'Contraseñas distintas'
        }
    },
    // Recuperamos los datos del usuario logueado
    getUserData(){
        return users.getUserData(this.idUser)
        .then(response => {
            this.datosUser = response.data.data;

            this.emailAct = this.datosUser.email;
            this.nameAct = this.datosUser.name;
            this.surnameAct = this.datosUser.surname;
            this.aliasAct = this.datosUser.alias;
        })
        .catch(error => {
            this.message = error;
        });
    },
    // Listar los favores que ha hecho este usuario
    getAllFavoursMaker(){
        return favours.getAllFavoursMaker(this.idUser)
        .then(response => {
            console.log('MAKER:');
            console.log(response.data.data);
            this.favours = response.data.data;
            this.isActive = !this.isActive;
        })
        .catch(error => {
            this.message = error;
        });
    },
    // Listar los favores que subió este usuario
    getAllFavoursAsker(){
        return favours.getAllFavoursAsker(this.idUser)
        .then(response => {
            console.log('ASKER:');
            console.log(response.data.data);
            this.favours = response.data.data;
            this.isActive = !this.isActive;
        })
        .catch(error => {
            this.message = error;
        });
    },
    // Limpiamos los mensajes de error
    cleanError(type){
        if(type === 'pass'){
            this.messagePass = '';
        } else {
            this.messageData = ''
        }
    },
    // Tabs
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    // Ir al tab de Histórico
    goToHistoric(){
        this.currentTab = 'tab3'
    }
  },
  created() {
    this.getUserData();
    this.getAllFavoursAsker();
  }
}
</script>

<style scoped>

</style>