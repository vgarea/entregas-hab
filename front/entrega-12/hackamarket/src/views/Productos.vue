<template>
    <div class='product'>
        <vue-headful title='Productos' />
        <h1>HACKAMARKET - PRODUCTS</h1>
        <div class="loader" v-show="loadingShow">Loading...</div>
        <listaproductos v-on:datos='mostrarInfoProduct' :productos='productos' />

        <!-- MODAL PARA ACTUALIZAR PRODUCTOS -->
        <div class='modal' v-show='seeModal'>
            <div class='modalBox'>
                <h3>
                Actualiza los datos del producto: {{ idProducto }}
                </h3>
                <label>Imagen:</label>
                <input type='text' placeholder='Url de la imagen' v-model='imagenActualizada' />
                <label>Nombre:</label>
                <input type='text' placeholder='Nombre' v-model='nombreActualizado' />
                <label>Stock:</label>
                <input type='text' placeholder='Stock' v-model='stockActualizado' />
                <label>Disponibilidad:</label>
                <input type='text' placeholder='Disponibilidad' v-model='disponibilidadActualizada' />
                <button @click='seeModal =! seeModal'>Cancelar</button>
                <button @click='updateProduct()'>Actualizar producto</button>
            </div>
        </div>
    </div>
    </div>
  
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
import listaproductos from '@/components/ListaProductos.vue';

export default {
  name: 'Productos',
  components: {
    listaproductos
  },
  data() {
    return {
      productos: [],
      idProducto: '',
      imagenActualizada: '',
      nombreActualizado: '',
      stockActualizado: '',
      disponibilidadActualizada: '',
      loadingShow:false,
      seeModal: false,
    }
  },
  methods: {    
    getAllProducts(){
      let self = this;
      axios.get('http://localhost:3051/productos')
      .then(function(response) {
        console.log('productos: ');
        console.log(response.data);
        self.productos = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    },
    // FUNCIÓN PARA ACTULIZAR UN PRODUCTO
    updateProduct(){
      this.seeModal = false;
      let self = this;
      axios.put('http://localhost:3051/update/productos/'+ self.idProducto, {
        imagen: self.imagenActualizada,
        nombre: self.nombreActualizado,
        stock: self.stockActualizado,
        disponibilidad: self.disponibilidadActualizada,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
      self.sweetalertOn(self.idProducto, 'actualizar');
    },

    // FUNCIÓN PARA MOSTRAR LA INFO DE UN PRODUCTO
    mostrarInfoProduct(datosProducto){
        this.imagenActualizada = datosProducto.imagen;
        this.nombreActualizado = datosProducto.nombre;
        this.stockActualizado = datosProducto.stock;
        this.disponibilidadActualizada = datosProducto.disponibilidad;
        this.idProducto = datosProducto.id;

        this.seeModal = true;
    },
    // FUNCIÓN DEL SWEETALERT2
    sweetalertOn(idNew, action){
      let timerInterval;
      this.loadingShow = true;
      swal.fire({
          title: `${action}`,
          text: `Vas a ${action} el producto con id: ${idNew}`,
          icon: 'info',
          confirmButtonText: 'Go',
          confirmButtonColor: '#00ccff',
      }).then(() => {
        timerInterval = setInterval(() => {
          location.reload();
        }, 2000);
      })
    }
  },
  created() {
    this.getAllProducts();
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
/* ESTILOS DEL LOADING */
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: var(--accent);
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>