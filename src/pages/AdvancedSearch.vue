<script>
import axios from 'axios';
import { store } from '../store.js';
import Searchbar from '../components/Searchbar.vue';
export default {
	name: 'AdvancedSearch',
	components: {
		Searchbar
	},
	data() {
		return {
			store,
			apartments: [],
			apartmentsToShow: [],
			services: [],
			serviceFilters: [],
			kilometers: 20
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
		filteredApartmentsByPosition(searchLat, searchLon) {
			axios.get(`${this.store.baseUrl}api/apartments`).then((response) => {
				if (response.data.success) {
					this.apartments = response.data.apartments.data;
					this.apartmentsToShow = this.apartments.filter((apartment) => this.distance(searchLat, searchLon, apartment.position.Latitudine, apartment.position.Longitudine) <= this.kilometers);
					this.loading = false;
				}
			});
		},
		distance(lat1, lon1, lat2, lon2) {
			let p = 0.017453292519943295;    // Math.PI / 180
			let c = Math.cos;
			let a = 0.5 - c((lat2 - lat1) * p) / 2 +
				c(lat1 * p) * c(lat2 * p) *
				(1 - c((lon2 - lon1) * p)) / 2;

			return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
		},
		filteredByService() {
			for (let serviceFilter in this.serviceFilters) {
				this.apartmentsToShow = this.apartmentsToShow.filter((apartment) => apartment.services.find((apart) => serviceFilter.id))
			}
		},
		syncServiceFilter(service) {
			if (!this.serviceFilters.find(() => service.id)) {
				this.serviceFilters.push(service.id);
			}
			else {
				this.serviceFilters.pop(service.id);
			}
			console.log(this.serviceFilters)
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
				<div class="text-center">
					<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
						Servizi
					</button>
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
								<button type="button" class="btn btn-primary" @click="filteredByService">Applica
									filtri</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 mt-4 d-flex flex-wrap gap-5">
					<div class="card" v-for="(apartment, index) in this.apartmentsToShow" :key="index"
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
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<style lang="scss"></style>