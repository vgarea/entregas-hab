<template>
    <div>
        <h1>Login</h1>

        <input v-model='email' type='text' placeholder='Email' />
        <input v-model='password' type='password' placeholder='Contraseña' />
        <button @click="loginUser()">Enviar</button>
    </div>
</template>

<script>
    import { login } from '../api/utils';
    export default {
        name: 'Login',
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            loginUser(){
                if(this.email === '' || this.password === ''){
                    alert('Te faltan datos.')
                } else {
                    login(this.email, this.password);
                }
                //setTimeout( () => {
                    this.$router.push('/');
                    location.reload();
                //}, 250);
            }
        }
    }
</script>

<style scoped>

</style>