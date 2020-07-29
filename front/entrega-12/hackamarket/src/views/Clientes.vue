<template>
    <div class='clients'>
        <vue-headful title='Clientes' />
        <h1>HACKAMARKET - CLIENTS</h1>
        <listaclientes v-on:datos='mostrarInfoClient' v-on:borrar='deleteClient' :clientes='clientes' />
        
        <!-- MODAL PARA ACTUALIZAR CLIENTE -->
        <div v-show='seeModal' class='modal'>
            <div class='modalBox'>
                <h3>
                Actualiza los datos de tu cliente: {{ idCliente }}
                </h3>
                <label>Foto:</label>
                <input type='text' placeholder='Url de la foto' v-model='fotoActualizada' />
                <label>Nombre:</label>
                <input type='text' placeholder='Nombre' v-model='nombreActualizado' />
                <label>Usuario:</label>
                <input type='text' placeholder='Usuario' v-model='usuarioActualizado' />
                <label>Email:</label>
                <input type='text' placeholder='Email' v-model='emailActualizada' />
                <label>Contraseña:</label>
                <input type='text' placeholder='Contraseña' v-model='passwordActualizada' />
                <button @click='seeModal =! seeModal'>Cancelar</button>
                <button @click='updateClient()'>Actualizar cliente</button>
            </div>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import listaclientes from '@/components/ListaClientes.vue';

export default {
  name: 'Clientes',
  components: {
    listaclientes
  },
  data() {
    return {
      clientes: [],
      idCliente: '',
      fotoActualizada: '',
      nombreActualizado: '',
      usuarioActualizado: '',
      emailActualizada: '',
      passwordActualizada: '',
      seeModal: false,
    }
  },
  methods: {
    // FUNCIÓN PARA LISTAR TODOS LOS CLIENTES
    getAllClients(){
      let self = this;
      axios.get('http://localhost:3051/clientes')
      .then(function(response) {
        console.log('clientes: ');
        console.log(response.data);
        self.clientes = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    },
    // FUNCIÓN PARA ACTULIZAR UN CLIENTE
    updateClient(){
      this.seeModal = false;
      let self = this;
      axios.put('http://localhost:3051/update/'+ self.idCliente, {
        foto: self.fotoActualizada,
        nombre: self.nombreActualizado,
        usuario: self.usuarioActualizado,
        email: self.emailActualizada,
        password: self.passwordActualizada,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
      self.sweetalertOn(self.idCliente, 'actualizar');
    },
    // FUNCIÓN PARA MOSTRAR LA INFO DE UN CLIENTE
    mostrarInfoClient(datosCliente){
        this.fotoActualizada = datosCliente.foto;
        this.nombreActualizado = datosCliente.nombre;
        this.usuarioActualizado = datosCliente.usuario;
        this.emailActualizada = datosCliente.email;
        this.passwordActualizada = datosCliente.password;
        this.idCliente = datosCliente.id;

        this.seeModal = true;
    },
    // FUNCIÓN PARA BORRAR UN CLIENTE
    deleteClient(indiceCliente){
      let self = this;
      axios.delete('http://localhost:3051/delete/'+ indiceCliente)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
      this.sweetalertOn(indiceCliente, 'borrar');      
    },
    // FUNCIÓN DEL SWEETALERT2
    sweetalertOn(idNew, action){
        swal.fire({
            title: `${action}`,
            text: `Vas a ${action} el cliente con id: ${idNew}`,
            icon: 'info',
            confirmButtonText: 'Go',
            confirmButtonColor: '#00ccff',
        }).then(() => {
            location.reload();
        })
    },
  },
  created() {
    this.getAllClients();
  }
}
</script>

<style scoped>
.modal {
    border: 2px solid var(--accent);
    border-radius: 2rem;
    margin: 0 auto;
    background: var(--light);
    width: 600px;
    position: sticky;
    bottom: calc(100vh - 520px);
    left: 0;
}
.modalBox{
    background: var(--light);
    padding: 2rem;
    margin: 2rem;
    width: 560px;
    text-align: left;
}
input {
    margin-bottom: 1rem;
    padding: 0.4rem;
    width: 100%;
}
button {
    margin: 1rem;
    width: calc(50% - 2rem);
}
</style>