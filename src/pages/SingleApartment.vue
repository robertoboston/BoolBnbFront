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
    mounted(){
        console.log(this.$route.params.slug)
        axios.get(`${this.store.baseUrl}apartments/${this.$route.params.slug}`).then((response) => {
            this.apartment = response.data.apartment
            console.log(this.apartment.descrizione)
            
        })

    }
    
}
</script>

<template lang="">
    <div>
        <h1>{{apartment.descrizione}}</h1>
    </div>
</template>

<style lang="">
    
</style>