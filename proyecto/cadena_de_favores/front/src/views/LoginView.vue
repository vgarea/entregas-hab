<template>
    <main id='login'>
        <vue-headful title='Login' />
        <h1>Login</h1>
        <input v-model='email' type='text' placeholder='Email' />
        <input v-model='password' type='password' placeholder='Contraseña' />
        <p class='error'>{{ this.message }}</p>
        <button @click="loginUser()">Enviar</button>
    </main>
</template>

<script>
    // si consigo subir los errores a la vista
    import { login } from '../api/utils';
    /* import utils from '@/api/utilsNew'; */

    export default {
        name: 'Login',
        data(){
            return {
                email: '',
                password: '',
                message:'',
            }
        },
        methods: {            
            async loginUser(){
                if(this.email === '' || this.password === ''){
                    alert('Te faltan datos.')
                } else {
                    try {
                        await login(this.email, this.password);
                        // SI TODO VA BIEN VOY A LA HOME Y RECARGO LA PÁGINA
                        this.$router.push('/');
                        location.reload();
                    } catch (error) {
                        this.message = error.response.data.message;
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>