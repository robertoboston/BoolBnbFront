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
		this.searchLon = this.$route.params.lon
		this.searchLat = this.$route.params.lat

		axios.get(`${this.store.baseUrl}api/apartments`).then((response) => {
			if (response.data.success) {
				this.apartments = response.data.apartments.data;
				this.filteredApartmentsByPosition();
				this.applyFilters();
				this.loading = false;
			}
		});

		axios.get(`${this.store.baseUrl}api/services`).then((response) => {
			if (response.data.success) {
				this.services = response.data.services;
			}
		})
	},
	methods: {
		filteredApartmentsByPosition() {
			this.apartmentsToShow = this.apartments.filter((apartment) => {
				console.log(this.distance(this.searchLat, this.searchLon, apartment.position.Latitudine, apartment.position.Longitudine))
				if (this.distance(this.searchLat, this.searchLon, apartment.position.Latitudine, apartment.position.Longitudine) <= this.kilometers) {
					return apartment;
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
							console.log(apartment.services[k].id)
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

			// if(this.minBeds > 0 && this.minBeds < 32555){
			// 	this.apartmentsToShow = this.apartmentsToShow.filter((apartment) => {
			// 		console.log(apartment)
			// 		if(apartment.numero_di_letti >= this.minBeds)
			// 			return apartment;
			// 	});
			// }
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
		<div class="container">
			<div class="row justify-content-center mt-4">
				<Searchbar @search="filteredApartmentsByPosition"> </Searchbar>
			</div>
			<div class="row">

				<!-- Button trigger modal -->
				<div class="d-flex justify-content-center align-items- my-4 gap-4">
					<div class="d-flex align-items-center">
						<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
							Servizi
						</button>
					</div>
					<div class="d-flex flex-column">
						<label for="customRange1" class="form-label">Raggio: {{ kilometers }}</label>
						<input type="range" id="customRange1" v-model="kilometers" @change="filteredApartmentsByPosition()"
							min="1">
					</div>
					<div class="d-flex flex-column">
						<label for="customInput1" class="form-label">Numero di bagni</label>
						<input type="text" id="customInput1" v-model="minBaths" @keyup="applyFilters">
					</div>
					<div class="d-flex flex-column">
						<label for="customRange1" class="form-label">Numero di letti</label>
						<input type="text" id="customRange1" v-model="minBeds" @keyup="applyFilters">
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
				<div class="col-12 mt-4 d-flex flex-wrap gap-5">

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
<style lang="scss"></style>