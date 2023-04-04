<script>
import axios from 'axios';
import { store } from '../store.js';
import Searchbar from '../components/Searchbar.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
export default {
	name: 'AdvancedSearch',
	components: {
		Searchbar,
		ApartmentCard
	},
	data() {
		return {
			store,
			apartments: [],
			apartmentsToShow: [],
			services: [],
			serviceFilters: [],
			kilometers: 20,
			searchLon: null,
			searchLon: null,
			minBaths: 1,
			minBeds: 1
		}
	},
	mounted() {
		this.filteredApartmentsByPosition(this.$route.params.lat, this.$route.params.lon);
		axios.get(`${this.store.baseUrl}api/services`).then((response) => {
			if (response.data.success) {
				this.services = response.data.services;
			}
		})
	},
	methods: {
		filteredApartmentsByPosition(reqLat, reqLon) {
			this.searchLon = reqLon
			this.searchLat = reqLat

			axios.get(`${this.store.baseUrl}api/apartments`).then((response) => {
				if (response.data.success) {
					this.apartments = response.data.apartments.data;
					this.applyFilters();
					this.loading = false;
				}
			});
		},
		distance(lat1, lon1, lat2, lon2) {
			var R = 6371; // km
			var dLat = this.toRad(lat2 - lat1);
			var dLon = this.toRad(lon2 - lon1);
			var lat1 = this.toRad(lat1);
			var lat2 = this.toRad(lat2);

			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;
			return d;
		},

		// Converts numeric degrees to radians
		toRad(Value) {
			return Value * Math.PI / 180;
		},

		applyFilters() {
			this.apartmentsToShow = this.apartments;

			//position 
			this.apartmentsToShow = this.apartments.filter((apartment) => {
				console.log(this.distance(this.searchLat, this.searchLon, apartment.position.Latitudine, apartment.position.Longitudine))
				if (this.distance(this.searchLat, this.searchLon, apartment.position.Latitudine, apartment.position.Longitudine) <= this.kilometers) {
					return apartment;
				}
			});

			//Services filter
			if (this.serviceFilters) {
				for (let i in this.serviceFilters) {
					this.apartmentsToShow = this.apartmentsToShow.filter((apartment) => {
						for (let k in apartment.services) {
							if (apartment.services[k].id === this.serviceFilters[i])
								return apartment;
						}
					})
				}
			}

			//Minimum baths filter
			if (this.minBaths > 0 && this.minBaths < 255) {
				this.apartmentsToShow = this.apartmentsToShow.filter((apartment) => {
					if (apartment.numero_di_bagni >= this.minBaths)
						return apartment;
				});
			}

			//Minimum number of beds filter
			if (this.minBeds > 0 && this.minBeds < 32555) {
				this.apartmentsToShow = this.apartmentsToShow.filter((apartment) => {
					console.log(apartment)
					if (apartment.numero_di_letti >= this.minBeds)
						return apartment;
				});
			}
			console.log(this.apartmentsToShow)
		},
		syncServiceFilter(service) {
			(!this.serviceFilters.includes(service.id)) ?
				this.serviceFilters.push(service.id) :
				this.serviceFilters.pop(service.id);
		}
	}

}
</script>
<template>
	<main>
		<div class="container rounded-4 mb-4 py-2" id="advancedContainer">
			<div class="row justify-content-center mt-4">
				<Searchbar @search="filteredApartmentsByPosition"> </Searchbar>
			</div>
			<div class="row">

				<!-- Button trigger modal -->
				
					<div class="container-filter">
						<div class="box d-flex">
							<div class="service">
								<button class="service-button d-flex justify-content-around align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
									<i class="fa-solid fa-list-check fa-2x"></i>
								</button>
								<div class="text-center">
									Servizi
								</div>
					        </div>
							<div class="baths">
						        <input type="text" id="customInput1" v-model="minBaths" @keyup="applyFilters">
								<div class="text-center">
									<label for="customInput1" class="form-label">Bagni</label>
								</div>
					        </div>
							<div class="beds">
						        <input type="text" id="customRange1" v-model="minBeds" @keyup="applyFilters">	
								<div class="text-center">
									<label for="customRange1" class="form-label">Letti</label>
								</div>
					        </div>
						</div>
					</div>

					<div class="range-km-container">
						<div class="type-range">
							<div class="text-center">
								<div>
									<i class="fa-solid fa-route fa-2x"></i>
								</div>
								<label for="customRange1" class="form-label"><strong>Km:</strong> {{ kilometers }}</label>
							</div>
						    <input class="km-range" type="range" id="customRange1" v-model="kilometers" @change="applyFilters" min="5">
						</div>
					</div>

				<!-- Modal -->
				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
					aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body" v-for="(service, index) in services" :key="index">
								<input type="checkbox" value="{{ service.id }}" @change="syncServiceFilter(service)">
								<label for="">{{ service.nome }}</label>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
								<button type="button" class="btn btn-primary" data-bs-dismiss="modal"
									@click="applyFilters">Applica
									filtri</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 mt-4 d-flex flex-wrap">
					<!-- ciclio for ApartmentCard -->
					<ApartmentCard v-for="(item, index) in this.apartmentsToShow" :key="index" :apartment="item">
					</ApartmentCard>
					<!-- <div class="card" v-for="(apartment, index) in this.apartmentsToShow" :key="index"

						<div v-if="apartmentsToShow.length == 0">

						</div>
						<div v-else class="card" v-for="(apartment, index) in this.apartmentsToShow" :key="index"

							style="width: 18rem;">
							<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'"
								class="card-img-top" alt="...">
							<div class="card-body">
								<h4 class="card-title">{{ apartment.descrizione }}</h4>
								<p class="card-text">{{ apartment.position.indirizzo }}, {{ apartment.position.città }},
									{{ apartment.position.N_civico }}, {{ apartment.position.Nazione }}</p>
								<h5 class="text-end fw-bolder">&euro; {{ apartment.prezzo }} notte</h5>
								<router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }"
									class="btn btn-sm btn-success">
									Vai all'appartamento
								</router-link>
							</div>
						</div> -->
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">

#advancedContainer{
	background-color: #f3f3f3;
	.container-filter{
		margin: 0 auto;
		display: flex;
		justify-content: center;
	
	}
	
	.box{
		height: 40px;
		width: 600px;
		
	}
	
	.service,.baths,.beds,.range{
		width: calc(100% / 3 - 20px);
		height: 100%;
		margin: 10px;
	}
	
	.service-button{
		height: 100%;
		width: 100%;
		background-color: #fc9d15;
		border: none;
		border-radius: 5px;
	}
	
	.service-button:hover{
		background-color: #dd8913;
	}
	
	.baths input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25px;
		background-color: #e33f3d;
		border: none;
		border-radius: 5px;
	}
	
	.baths input:hover{
		background-color: #c43431;
	
	}
	
	.beds input{
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25px;
		background-color: #3fa9f5;
		border: none;
		border-radius: 5px;
	}
	
	.beds input:hover{
		background-color: #348fd0;
	
	}
	
	.range-km-container{
		display: flex;
		justify-content: center;
		padding: 70px
	}
	
	.km-range{
		cursor: pointer;
		margin: auto;
		 -webkit-appearance: none;
		 position: relative;
		 overflow: hidden;
		 height: 30px;
		 width: 300px;
		 cursor: pointer;
		 border-radius: 0; /* iOS */
	}
	
	::-webkit-slider-runnable-track {
		 background: #ddd;
	}
	
	/*
	 * 1. Set to 0 width and remove border for a slider without a thumb
	 * 2. Shadow is negative the full width of the input and has a spread 
	 *    of the width of the input.
	 */
	::-webkit-slider-thumb {
		 -webkit-appearance: none;
		 width: 20px; /* 1 */
		 height: 30px;
		 background: #fff;
		 box-shadow: -200px 0 0 200px dodgerblue; /* 2 */
		 border: 2px solid #999; /* 1 */
	}
	
	::-moz-range-track {
		 height: 30px;
		 background: #ddd;
	}
	
	::-moz-range-thumb {
		 background: #fff;
		 height:300px;
		 width: 20px;
		 border: 3px solid #999;
		 border-radius: 0 !important;
		 box-shadow: -200px 0 0 200px dodgerblue;
		 box-sizing: border-box;
	}
	
	::-ms-fill-lower { 
		 background: dodgerblue;
	}
	
	::-ms-thumb { 
		 background: #fff;
		 border: 2px solid #999;
		 height: 30px;
		 width: 20px;
		 box-sizing: border-box;
	}
	
	::-ms-ticks-after { 
		 display: none; 
	}
	
	::-ms-ticks-before { 
		 display: none; 
	}
	
	::-ms-track { 
		 background: #ddd;
		 color: transparent;
		 height: 40px;
		 border: none;
	}
	
	::-ms-tooltip { 
		 display: none;
	}

}




</style>