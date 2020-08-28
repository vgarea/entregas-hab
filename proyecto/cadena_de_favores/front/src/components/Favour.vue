<template>
    <ul>
        <li v-for="favour in favours" :key="favour.id">
            <favourdata
                :is-authenticated="isAuthenticated"
                :is-id-user="isIdUser"
                :favour="favour"
            />
        </li>
    </ul>
</template>

<script>

import favourdata from "@/components/FavourDetail.vue";

export default {
    name: "ListaFavours",
    props: {
        favours: Array,
        isAuthenticated: Boolean,
        isIdUser:Number
    },
    data() {
        return {
            favour: {}
        }
    },
    computed:{
    },
    components:{
        favourdata,
    },
}
</script>

<style scoped>

</style>