<template>
    <ul>
        <li v-for="favour in favours" :key="favour.id">
            <favourdata :favour="favour" />
        </li>
    </ul>
</template>

<script>

import favourdata from "@/components/FavourData.vue";

export default {
    name: "ListaFavours",
    data() {
        return {
            favour: {}
        }
    },
    components:{
        favourdata,
    },
    props:{
        favours: Array,
    },
}
</script>

<style scoped>

</style>