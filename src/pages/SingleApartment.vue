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
        })

    }
    
}
</script>

<template lang="">
    <main class="mt-5">
        <h1>{{apartment.descrizione}}</h1>
    </main>
</template>

<style lang="scss" scoped>
    
</style>