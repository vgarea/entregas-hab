<template>
      <div>
        <ul>
            <li v-for='(cliente, index) in clientes' :key='cliente.id'>
                <img :src='cliente.foto' :alt='cliente.nombre' :name='cliente.nombre' />
                <p><strong>Nombre:</strong></p><p>{{ cliente.nombre }}</p>
                <p><strong>Usuario:</strong></p><p>{{ cliente.usuario }}</p>
                <p><strong>Email:</strong></p><p>{{ cliente.email }}</p>
                <p><strong>Contraseña:</strong></p><p>{{ cliente.password }}</p>
                <div class='edit'>
                    <button @click='enviarDatosCliente(index)'>Editar</button>
                    <button @click='enviarIndiceCliente(index)'>Borrar</button>
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
    name: 'ListaClientes',
    props:{
        clientes: Array
    },
    methods: {
        enviarDatosCliente(index){
            let datosCliente = this.clientes[index];
            this.$emit('datos', datosCliente);
        },
        enviarIndiceCliente(index){
            let indiceCliente = this.clientes[index].id;
            this.$emit('borrar', indiceCliente);
        },
    }
}
</script>

<style scoped>
img {
    object-position: top;
}
li p:nth-child(even) {
    width: 35%;
}
li p:nth-child(odd) {
    width: 65%;
}

</style>