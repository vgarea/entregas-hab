<template>
    <main id='register'>
        <vue-headful title='REGISTRO' />
        <h1>REGISTRO</h1>
        <input type='text' @focus="cleanError"  v-model='email' placeholder='Email' />
        <input type='password' @focus="cleanError" v-model='password1' placeholder='Contraseña' />
        <input type='password' @focus="cleanError" v-model='password' placeholder='Repite aquí tu contraseña' />
        <p class='error'>{{ message }}</p>
        <button @click='validatingData'> Enviar </button>
    </main>
</template>

<script>
import users from '@/users/users';
import swal from 'sweetalert2';

export default {
name: 'RegisterView',
    data(){
        return {
            email: '',
            password1: '',
            password: '',
            createClient: false,
            /* errorMsg: false, */
            message: '',
        }
    },
    methods: {
        sweetalertCreate(clientNew){
            let text, id;
            text = [{
                text: 'Te has registrado correctamente, te llegará un correo para validar la dirección.',
                title: 'Bien hecho'
            },
            {
                text: 'Revisa los campos',
                title: 'Alerta'
            }]
            clientNew ? id=0 : id=1;
            swal.fire({
                title: `${text[id].title}`,
                text: `${text[id].text}`,
                icon: 'info',
                confirmButtonText: 'Go',
                confirmButtonColor: 'var(--accent)',
            })
        },
        validatingData(){
            if(this.email === '' || this.password === '' || this.password1 === '') {
                this.sweetalertCreate(false);
                /* this.errorMsg = true; */
                this.message = 'Tienes campos vacíos'
                this.createClient = false;
            } else if(this.password != this.password1) {
                this.sweetalertCreate(false);
                /* this.errorMsg = true; */
                this.message = 'Las contraseñas no coinciden'
                this.createClient = false;
            } else {
                this.createClient = true;
                this.addNewClient();
            }
        },
        addNewClient(){
            if(this.createClient === true){
                users.addNewUser(this.email, this.password)
                .then(response => {
                    this.sweetalertCreate(true);
                    /* this.errorMsg = false; */
                })
                .catch(error => {
                    this.message = error;
                });
                this.createClient = false;
                this.cleanInputs();
                this.$router.push({name: 'Login'});
            } else {
                this.message = 'Ha habido un error y no se ha creado el nuevo usuario'
            }
        },
        cleanInputs(){
            this.email = '';
            this.password = '';
            this.password1 = '';
            this.message = '';
        },
         cleanError(){
            this.message = '';
            this.errorMsg = false;
        }
    }
}
</script>

<style scoped>

</style>