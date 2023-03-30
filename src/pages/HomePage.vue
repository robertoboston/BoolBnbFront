<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'Homepage',
    props:{
        apartment: Object

    },
	 data(){
		return{
			store,
			loading: true,
			apartments: []
		}
	 },
	 mounted() {
           
			axios.get(`${this.store.baseUrl}api/apartments`).then((response) => {
				if(response.data.success){
		
					this.apartments = response.data.apartments.data;
					this.loading = false;
				}
                console.log(this.apartments);
		})
	 },
}

</script>
<template lang="">
    <main>
        <div class="container">
            <div class="row">
                <div class="image-fluid">
                    <img src="" alt="">
                </div>
                <form class="d-flex w-50" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div class="row">
                <div class="col-12 mt-4 d-flex gap-5">
                    <div class="card" v-for="(apartment, index) in apartments" :key="index" style="width: 18rem;">
                        <img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h4 class="card-title">{{ apartment.descrizione }}</h4>
                            <p class="card-text">{{ apartment.position.indirizzo }}</p>
                            <h5 class="text-end fw-bolder">&euro; {{apartment.prezzo}} notte</h5>
                            <router-link :to="{name: 'single-apartment', params: {slug: apartment.slug} }" class="btn btn-sm btn-success">
                                Vai all'appartamento
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style lang="scss" scoped>

</style>