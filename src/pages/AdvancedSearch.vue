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
			this.searchLon = reqLon;
			this.searchLat = reqLat;

			const filters = {
				latitude: this.searchLat,
				longitude: this.searchLon,
				services: this.serviceFilters,
				range: this.kilometers,
				minBaths: this.minBaths,
				minBeds: this.minBeds
			};

			axios.get(`${this.store.baseUrl}api/get-apartments/`, { params: filters }).then((response) => {
				if (response.data.success) {
					this.apartments = response.data.apartments;

					this.apartmentsToShow = this.apartments
					// this.applyFilters();
					this.loading = false;
				}
			});
		},

		syncServiceFilter(service) {
			if (!this.serviceFilters.includes(service.nome))
				this.serviceFilters.push(service.nome)
			else
				this.serviceFilters = this.serviceFilters.filter((filter) => filter != service.nome);
		}
	}

}
</script>
<template>
	<main>
		<div class="container rounded-4 py-2 mt-4 bg-white" id="advancedContainer">
			<!-- Searchbar and filter -->
			<div class="row justify-content-center my-4">
				<!-- Searchbar -->
				<div class="col-12 col-md-5 mb-2 mb-sm-2 mb-md-0">
					<Searchbar class="searchbar" @search="filteredApartmentsByPosition"> </Searchbar>
				</div>
				<!-- Filter -->
				<div class="col-11 col-md-6">
					<div class="row services">
						<!-- Services -->
						<div class="col-2 d-flex flex-column justify-content-center border_end">
							<button class="btn p-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
								<i class="fa-solid fa-list-check fa-lg"></i>
							</button>
							<label class="services_labels text-center">Servizi</label>
						</div>
						<!-- Baths -->
						<div class="col-2 d-flex flex-column justify-content-center border_end">
							<input type="number" id="customInput1" v-model="minBaths"
								@change="filteredApartmentsByPosition(this.searchLat, this.searchLon)"
								@keyup="filteredApartmentsByPosition(this.searchLat, this.searchLon)" min="0"
								class="baths mx-auto">
							<label for="customInput1" class="services_labels text-center m-0">Bagni</label>
						</div>
						<!-- Beds -->
						<div class="col-2 d-flex flex-column justify-content-center border_end">
							<input type=" number" id="customRange1" v-model="minBeds"
								@change="filteredApartmentsByPosition(this.searchLat, this.searchLon)"
								@keyup="filteredApartmentsByPosition(this.searchLat, this.searchLon)" min="0"
								class="beds mx-auto">
							<label for="customRange1" class="services_labels text-center m-0">Letti</label>
						</div>
						<div class="col-6 d-flex">
							<div class="d-flex align-items-center justify-content-center w-25">
								<i class="fa-solid fa-route fa-2xl"></i>
							</div>
							<div class=" d-flex flex-column justify-content-center w-75">
								<label for="customRange1" class="m-0"><strong>Km:</strong> {{ kilometers
								}}</label>
								<input class="km-range m-0 w-100" type="range" id="customRange1" v-model="kilometers"
									@change="filteredApartmentsByPosition(this.searchLat, this.searchLon)" min="5" max="25">
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Modal container -->
			<div class="row">
				<!-- Modal -->
				<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
					aria-hidden="true">
					<div class="modal-dialog modal-dialog-scrollable">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5" id="exampleModalLabel">Servizi</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<div v-for="(service, index) in services" :key="index" class="my-2">
									<input type="checkbox" value="{{ service.id }}" @change="syncServiceFilter(service)"
										class="me-1">
									<label for="">{{ service.nome }}</label>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
								<button type="button" class="btn btn-primary" data-bs-dismiss="modal"
									@click="filteredApartmentsByPosition(this.searchLat, this.searchLon)">Applica
									filtri</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Apartments -->
			<div class="row">
				<div class="col-12 mt-4 d-flex flex-wrap">
					<!-- ciclio for ApartmentCard -->
					<ApartmentCard v-for="(item, index) in this.apartmentsToShow" :key="index" :apartment="item">
					</ApartmentCard>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
#advancedContainer {

	.searchbar,
	.services {
		border: 2px solid #3fa9f5;
		border-radius: 20px;
		height: 56px;

		.border_end {
			border-right: 2px solid #3fa9f5;
		}

		.services_labels {
			font-size: .8rem;
			font-weight: 600;
		}
	}

	.range {
		margin: 10px;
	}

	.service-button {
		background-color: #3fa9f5;
		border: none;
		border-radius: 5px;
	}

	.service-button:hover {
		background-color: #dd8913;
	}

	.baths {
		width: 100%;
		appearance: textfield;
		text-align: center;
		border: 0;

		&:focus-visible {
			border: 0;
			outline: 0;
		}
	}

	.beds {
		width: 100%;
		appearance: textfield;
		text-align: center;
		border: 0;

		&:focus-visible {
			border: 0;
			outline: 0;
		}
	}

	.km-range {
		cursor: pointer;
		-webkit-appearance: none;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border-radius: 0;
		height: 10px;
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
		width: 20px;
		/* 1 */
		height: 30px;
		background: #fff;
		box-shadow: -200px 0 0 200px dodgerblue;
		/* 2 */
		border: 2px solid #999;
		/* 1 */
	}

	::-moz-range-track {
		height: 30px;
		background: #ddd;
	}

	::-moz-range-thumb {
		background: #fff;
		height: 300px;
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

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

}
</style>