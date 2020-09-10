<template>
  <main id='validate'>
    <vue-headful title='VALIDACIÓN' />
    <header>
        <h1>¡USUARIO ACTIVADO!</h1>
    </header>
    <h2>HAZ CLIC EN LOGIN PARA INICIAR SESIÓN</h2>
    <section>
        <p class='error'>{{ message }}</p>
        <button>
            <router-link :to="{ name: 'Login' }">Login</router-link>
        </button>
    </section>
  </main>
</template>

<script>
import users from '@/users/users';
export default {
    name: 'UserValidateView',
    data(){
        return{
            message: '',
        }
    },
    methods:{
        goToValidate(){
            let url = window.location.href;
            let registrationCode = url.split('?');
            users.validateUser(registrationCode[1]);
        }
    },
    created() {
        this.goToValidate();
    }
}
</script>

<style>

</style>