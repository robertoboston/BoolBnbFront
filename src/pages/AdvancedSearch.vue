<script>
import axios from 'axios';
import {store} from '../store.js';
import Searchbar from '../components/Searchbar.vue';
export default {
	name: 'AdvancedSearch',
	components: {
		Searchbar
	},
	data(){
		return{
			store,
			apartments: [],
			apartmentsToShow: [] 
		}
	},
	mounted(){
		axios.get(`${this.store.baseUrl}api/apartments`).then((response) => {
			if(response.data.success){
					this.apartments = response.data.apartments.data;
					this.apartmentsToShow = this.apartments;
					this.loading = false;
			}
    })
	},
	methods: {
		filteredApartments(searchLat, searchLon){
            //console.log(search);
            this.apartmentsToShow = this.apartments;
            this.apartmentsToShow = this.apartments.filter((apartment) => this.distance(searchLat, searchLon, apartment.position.Latitudine, apartment.position.Longitudine) <= 20);
    },
		distance(lat1, lon1, lat2, lon2) {
				let p = 0.017453292519943295;    // Math.PI / 180
				let c = Math.cos;
				let a = 0.5 - c((lat2 - lat1) * p)/2 + 
								c(lat1 * p) * c(lat2 * p) * 
								(1 - c((lon2 - lon1) * p))/2;

				return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
	}
	
}
</script>
<template>
	<main>
		<div class="container">
			<Searchbar @search="filteredApartments"> </Searchbar>
		</div>	
		<div class="row">
			<div class="col-12 mt-4 d-flex flex-wrap gap-5">
					<div class="card" v-for="(apartment, index) in this.apartmentsToShow" :key="index" style="width: 18rem;">
							<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'" class="card-img-top" alt="...">
							<div class="card-body">
									<h4 class="card-title">{{ apartment.descrizione }}</h4>
									<p class="card-text">{{ apartment.position.indirizzo }}, {{ apartment.position.città }}, {{apartment.position.N_civico }}, {{apartment.position.Nazione}}</p>
									<h5 class="text-end fw-bolder">&euro; {{apartment.prezzo}} notte</h5>
									<router-link :to="{name: 'single-apartment', params: {slug: apartment.slug} }" class="btn btn-sm btn-success">
											Vai all'appartamento
									</router-link>
							</div>
					</div>
			</div>
    </div>
	</main>
</template>
<style lang="scss">
	
</style>