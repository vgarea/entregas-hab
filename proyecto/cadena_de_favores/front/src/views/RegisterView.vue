<template>
    <main id='register'>
        <vue-headful title='REGISTRO' />
        <h1>REGISTRO</h1>
        <input type='text'  v-model='email' placeholder='Email' />
        <input type='password' v-model='password1' placeholder='Contraseña' />
        <input type='password'  v-model='password' placeholder='Repite aquí tu contraseña' />
        <button @click='validatingData()'> Enviar </button>
        <p v-show='errorMsg'>
            *Tienes campos vacíos.
        </p>
    </main>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';

export default {
name: 'Registro',
    data(){
        return {
            email: '',
            password1: '',
            password: '',
            createClient: false,
            errorMsg: false,
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
                confirmButtonColor: '#00ccff',
            })
        },
        validatingData(){
            if(this.email === '' || this.password === '' || this.password1 === '') {
                //alert('No puedes dejar campos vacíos');
                this.sweetalertCreate(false);
                this.errorMsg = true;
                this.createClient = false;
            } else if(this.password != this.password1) {
                this.sweetalertCreate(false);
                this.errorMsg = true;
                this.createClient = false;
            } else {
                this.sweetalertCreate(true);
                this.errorMsg = false;
                this.createClient = true;
                this.addNewClient();
            }
        },
        addNewClient(){
            if(this.createClient === true){
                axios.post('http://localhost:3001/users', {
                    email: this.email,
                    password: this.password,
                })
                .then(function(response){
                    console.log(response);
                })
                .catch(function(error){
                    console.error(error);
                });
                this.createClient = false;
                this.cleanInputs();
            } else {
                console.log('Yo no debería estar aquí');
            }
        },
        cleanInputs(){
            this.email = '';
            this.password = '';
            this.password1 = '';
        },
    }
}
</script>

<style scoped>

</style>