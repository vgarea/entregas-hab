<template>
    <main id='login'>
        <vue-headful title='Login' />
        <section v-if="login">
            <h1>Login</h1>
            <label for="exampleInputEmail1">Email</label>
            <input id="exampleInputEmail1" v-model='email' type='email' class="form-control" />
            <label for="exampleInputPassword1">Password</label>
            <input id="exampleInputPassword1" type='password' v-model='password' :class="{'is-invalid': isInvalid}" />
            <a @click="resetLogin">Recupera tu contraseña</a>
            <p class='error'>{{ this.message }}</p>
            <button type="submit" @click="loginUser">Enviar</button>
        </section>
        <section v-else>
            <section v-if='recover'>
                <h1>Introduce tu nueva contraseña</h1>
                <input v-model='code' type='password' placeholder='Código que te ha llegado al email' />
                <input v-model='newPassword' type='password' placeholder='Contraseña' />
                <input v-model='newPassword1' type='password' placeholder='Repite aquí la contraseña' />
                <p class='error'>{{ this.message }}</p>
                <button @click="resetPassword()">Enviar</button>
            </section>
            <section v-else>
                <h1>Recupera tu contraseña</h1>
                <input v-model='emailRecover' type='text' placeholder='Email' />
                <a @click="recoverLogin()">Pulsa aquí si ya tienes el código</a>
                <p class='error'>{{ this.messageMail }}</p>
                <button @click="recoverPassword()">Enviar</button>
            </section>
        </section>
    </main>
</template>

<script>
    // si consigo subir los errores a la vista
    import api from '@/api/api';
   /*  import { login } from '@/api/utils'; */
    import axios from 'axios';

    export default {
        name: 'Login',
        data(){
            return {
                email: 'drgnzt@gmail.com',
                password: '12345678',
                emailRecover:'',
                message:'',
                messageMail:'',
                code:'',
                newPassword:'',
                newPassword1:'',
                login: true,
                recover: false,
                isInvalid: false,
            }
        },
        methods: {            
            /* async loginUser(){
                if(this.email === '' || this.password === ''){
                    this.message = 'Te faltan datos.';
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
            }, */
            // Login
            loginUser() {
                this.isInvalid = false;
                api.login(this.email, this.password)
                    .then(data => {
                        this.$emit('login', data);
                    })
                    .catch(() => {
                        this.isInvalid = true;
                    })
            },
            // Limpiar campos
            resetLogin(){
                this.login = false;
                this.email = '';
                this.password = '';
            },
            //
            async resetPassword(){
                if(this.code === '' || this.newPassword === '') {
                    this.message = 'Te faltan datos'
                } else if(this.newPassword !== this.newPassword1 ){
                    this.message = 'Las contraseñas han de ser iguales';
                } else {
                    try {
                        const response = await axios.post('http://localhost:3001/users/reset-password', {
                            recoverCode: this.code,
                            newPassword: this.newPassword
                        });
                        this.code = '';
                        this.newPassword ='';
                        this.newPassword1 = '';
                        this.$router.push('/login');
                        location.reload();
                    } catch (error) {
                        this.message = error.response.data.message;
                    }
                }
            },
            recoverLogin(){
                this.recover = true;
            },
            recoverPassword(){
                if(this.emailRecover === '') {
                    this.messageMail ='El campo de email debe estar cubierto';
                } else {
                        axios.post('http://localhost:3001/users/recover-password',
                    {
                        email: this.emailRecover,
                    });
                    this.email='';
                    //this.$router.push('/login');
                    //location.reload();
                }
            },
        }
    }
</script>

<style scoped>
section a {
    display: block;
}
section a:hover {
    cursor: pointer;
}
#login label {
    text-align: left;
}

</style>