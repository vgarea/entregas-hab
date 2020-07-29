<template>
  <div class='clients'>
    <vue-headful title='Registro' />
    <h1>HACKAMARKET - REGÍSTRATE</h1>
    <section>
        <input type='text' v-model='nombre' placeholder='Nombre' />
        <input type='text' v-model='usuario' placeholder='Usuario' />
        <input type='text' v-model='email' placeholder='Email' />
        <input type='password' v-model='password' placeholder='Contraseña' />
        <input type='text' v-model='foto' placeholder='Foto, pon la URL' />
        <button @click='validatingData()'> Añadir nuevo cliente </button>

        <p v-show='errorMsg'>
            *Tienes campos vacíos.
        </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
export default {
    name: 'Registrar',
    data(){
        return {
            nombre: '',
            usuario: '',
            email: '',
            password: '',
            foto: '',
            createClient: false,
            errorMsg: false,
        }
    },
    methods: {
        sweetalertCreate(clientNew){
            let text, id;
            text = [{
                text: 'Te has registrado!',
                title: 'Bien hecho!'
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
                confirmButtonColor: '#00CCFF',
            })
        },
        validatingData(){
            if(this.nombre === '' || this.usuario === '' || this.email === '' || this.password === ''|| this.foto === ''){
                //alert('No puedes dejar campos vacíos');
                this.sweetalertCreate(false);
                this.errorMsg = true;
                this.createClient = false;
            }else{
                this.sweetalertCreate(true);
                this.errorMsg = false;
                this.createClient = true;
                this.addNewClient();
            }
        },
        addNewClient(){
            if(this.createClient === true){
                let self = this;
                axios.post('http://localhost:3051/add', {
                    nombre: self.nombre,
                    usuario: self.usuario,
                    email: self.email,
                    password: self.password,
                    foto: self.foto,
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
            this.nombre = '';
            this.usuario = '';
            this.email = '';
            this.password = '';
            this.foto = '';
        },
    }
}
</script>

<style scoped>
.clients section{
    width: 90%;
    margin: 0 auto;
}
.clients section input {
    margin-bottom: 1rem;
    padding: 0.6rem;
    width: 100%;
    border-bottom: none;
    border-radius: 2rem;
    border: 2px solid var(--accent);
}
@media (min-width: 800px){
    .clients section{
        width: 300px;
    }
}

</style>