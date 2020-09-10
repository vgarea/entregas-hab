<template>
    <main id='favourDetail'>
        <div v-if="isLoaded">
            <ul>
                <li>
                    <favourdata
                        :is-authenticated="isAuthenticated"
                        :is-id-user="isIdUser"
                        :favour="favour"
                        @isupload="viewFavours($route.params.id)"
                    />
                </li>
            </ul>
        </div>
          <div class="loader" v-else>
                Loading...
        </div>
    </main>
</template>

<script>
import favourdata from '@/components/FavourDetail.vue';

import api from "@/api/api";
import favours from '@/favours/favours'

export default {
    name: "FavourDetailView",
    props: {
        isAuthenticated: Boolean,
        isIdUser: Number
    },
    components: {
        favourdata,
    },
    data() {
        return {
            favour:null,
            message:'',
            searchFav: '',
            locationFav: '',
            categoryFav: '',
            dataFav: ''
        }
    },
    computed: {
        isLoaded(){
            return this.favour !== null;
        }
    },
     methods: {
        // Recupera la lista de favores
        getFavours(id) {
            if(this.locationFav.length > 0 || this.categoryFav.length > 0 || this.dataFav !== ''){
                this.searchFav = '';
            } else if(this.searchFav === '') {
                this.searchFav = '%';
            }

            favours.getFavour(id)
            .then(result => {
                this.favour = result.data.data[0];
            })
            .then(() => {
                this.cleanInputs();
            })
        },
        // Recupera datos de la url para saber la búsqueda que viene de la home
        viewFavours(id){
            let url = window.location.href;
            let searchValue = url.split("?");

            searchValue[1] ? this.searchFav = searchValue[1] : false;
            this.getFavours(id);
        },
        // Limpiar todos los campos
        cleanInputs(){
        // Mejorar con un bucle que busque todos los inputs y los limpie ;)
        this.locationFav = '';
        this.categoryFav = '';
        this.dataFav = '';
        }
    },
    created() {
        this.viewFavours(this.$route.params.id);
    }
}
</script>

<style scoped>

</style>