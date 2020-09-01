<template>
    <main id='login'>
        <vue-headful title='Login' />
        <section v-if="login">
            <h1>Login</h1>
            <label for="exampleInputEmail1">Email</label>
            <input id="exampleInputEmail1" v-model='email' type='email' class="form-control" />
            <label for="exampleInputPassword1">Password</label>
            <input id="exampleInputPassword1" type='password' v-model='password' :class="{'is-invalid': isInvalid}" />
            <p class='error'>{{ this.message }}</p>
            <a @click="resetLogin">Recupera tu contraseña</a>
            <button type="submit" @click="loginUser">Enviar</button>
        </section>
        <section v-else>
            <section v-if='recover'>
                <h1>Introduce tu nueva contraseña</h1>
                <input v-model='code' type='password' placeholder='Código que te ha llegado al email' />
                <input v-model='newPassword' type='password' placeholder='Contraseña' />
                <input v-model='newPassword1' type='password' placeholder='Repite aquí la contraseña' />
                <p class='error'>{{ this.message }}</p>
                <button @click="resetPassword">Enviar</button>
            </section>
            <section v-else>
                <h1>Recupera tu contraseña</h1>
                <input v-model='emailRecover' type='text' placeholder='Email' />
                <a @click="recoverLogin()">Pulsa aquí si ya tienes el código</a>
                <p class='error'>{{ this.messageMail }}</p>
                <button @click="recoverPassword">Enviar</button>
            </section>
        </section>
    </main>
</template>

<script>
    // si consigo subir los errores a la vista
    import api from '@/api/api';

    export default {
        name: 'LoginView',
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
        computed:{
            
        },
        methods: {
            // Loguear usuario
            loginUser() {
                this.isInvalid = false;
                api.login(this.email, this.password)
                .then(data => {
                    this.$emit('login', data);
                })
                .catch(error => {
                    this.isInvalid = true;
                    this.message = error;
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
                    api.resetPassword(this.code, this.newPassword)
                    .then(response => {
                        this.message = response;
                        this.code = '';
                        this.newPassword ='';
                        this.newPassword1 = '';
                        this.$router.push('/login');
                    })
                    .catch(error => {
                        this.isInvalid = true;
                        this.message = error;
                    })
                }
            },
            recoverLogin(){
                this.recover = true;
            },
            recoverPassword(){
                if(this.emailRecover === '') {
                    this.messageMail ='El campo de email debe estar cubierto';
                } else {
                    api.recoverPassword(this.emailRecover)
                    .then(response => {
                        this.message = response;
                        this.email='';
                    })
                    .catch(error => {
                        this.message = error;
                    })
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