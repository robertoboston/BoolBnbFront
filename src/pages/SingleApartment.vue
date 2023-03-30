<script>
import axios from 'axios';
import {store} from '../store.js';
export default {
    name: 'SingleApartment',
    data(){
        return{
            store,
            apartment: null

        }

    },
    created(){
        axios.get(`${this.store.baseUrl}apartments/${this.$route.params.slug}`).then((response) => {
            this.apartment = response.data.apartment;
            console.log(this.apartment.cover)
        })

    }
    
}
</script>

<template lang="">
    <main class="mt-5">
        <div class="container">
            <div class="row">
                <h1>{{apartment.descrizione}}</h1>
                <img :src="apartment.cover ? `${this.store.baseUrl}/storage/${apartment.cover}` : 'https://picsum.photos/300/200'" class="card-img-top" alt="...">
                <h2>Prezzo per notte: {{apartment.prezzo}}&euro;</h2>
                <h2>Indirizzo: {{ apartment.position.indirizzo }}, {{ apartment.position.N_civico}}, {{apartment.position.città}}, {{apartment.position.Nazione}}</h2> 
            </div>
            <div class="mt-5">
                <router-link :to="{name: 'homepage'}" class="btn btn-sm btn-success">
                    Torna alla Homepage
                </router-link>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    
</style>