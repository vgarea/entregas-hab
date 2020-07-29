<template>
      <div class='producto'>
        <ul>
            <li v-for='(producto, index) in productos' :key='producto.id'>
                <button @click='enviarDatosProduct(index)'>
                    <img src="https://img.icons8.com/material-sharp/24/000000/edit.png" />
                </button>
                <img :src='producto.imagen' :alt='producto.nombre' :name='producto.nombre' />
                <p><strong>Nombre:</strong></p><p>{{ producto.nombre }}</p>
                <p><strong>Stock:</strong></p><p>{{ producto.stock }}</p>
                <p><strong>Disponibilidad:</strong></p><p :class='{notAvailable: producto.stock === 0, available: producto.stock > 0}'>{{ producto.disponibilidad }}</p>
                <div class='stock' v-if='producto.stock > 0'>
                    <button @click="sweetalertOn('comprar', producto.nombre)">Comprar</button>
                    <button @click="sweetalertOn('reservar', producto.nombre)">Reservar</button>
                </div>
                <div class='stock' v-else>
                    Sin fecha de entrada.
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
/*
PASOS A SEGUIR:
1 - CREAR LA FUNCIÓN EN LA API (SINO, NANAI)
2 - CREAR EVENTO CON EL QUE ENVÍO EL ID
3 - CREAR FUNCIÓN EN LA VISTA QUE RECOJA EL ID
*/

import swal from 'sweetalert2';
export default {
    name: 'ListaProductos',
    props:{
        productos: Array
    },
    methods: {
        sweetalertOn(action, product){
            swal.fire({
                title: `${action}`,
                text: `Gracias por ${action} el producto ${product}`,
                icon: 'info',
                confirmButtonText: 'Go',
                confirmButtonColor: '#00ccff',
            })
        },
        enviarDatosProduct(index){
            let datosProduct = this.productos[index];
            this.$emit('datos', datosProduct);
        },
    }
}
</script>

<style scoped>
.stock {
    margin: 1.2rem 0 0.5rem 0;
}
.notAvailable {
    color: var(--red);
}
.available {
    color: var(--green);
}
.producto ul li > button {
    position: absolute;
    margin: 0;
    padding: 0;
    margin-left: 14rem;
    margin-top: 1rem;
    background: transparent;
}
.producto ul li > button:hover img {
    background-color: var(--accent);
}
.producto ul li > button img {
    height: 35px;
    width: 35px;
    background-color: var(--light);
    padding: 0.4rem;
}
</style>