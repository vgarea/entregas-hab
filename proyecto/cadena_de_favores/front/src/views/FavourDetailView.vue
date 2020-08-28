<template>
    <div>
        <div v-if="isLoaded">
            <router-link to="/">Volver atrás</router-link>
            <product v-if="isLoaded" :product="product"></product>
            <h3 class="text-left mt-3">Esta es la descripción del producto</h3>
            <p class="text-left">
                {{ product.description }}
            </p>
        </div>

        <div v-else class="spinner-border" role="status">
            <span class="sr-only">Cargando...</span>
        </div>

    </div>
</template>

<script>
import api from "@/api/api";
import product from "@/components/FavourDetail";

export default {
    name: "ProductDetailView",
    components: {
        product,
    },
    data() {
        return {
            product: null
        }
    },
    computed: {
        isLoaded() {
            return this.product !== null;
        }
    },
    created() {
        api.getProduct(this.$route.params.id)
            .then(product => this.product = product)
    }
}
</script>

<style scoped>

</style>