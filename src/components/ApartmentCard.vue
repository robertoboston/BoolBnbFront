<script>
import axios from 'axios';
import { store } from '../store';
export default {
	name: 'ApartmentCard',
	data() {
		return {
			store
		}
	},
	props: {
		apartment: Object
	},
	methods: {
		addView() {
			axios.get('https://api.db-ip.com/v2/free/self').then((response) => {

				const data = {
					apartment_id: this.apartment.id,
					IP: response.data.ipAddress,
				}

				axios.put(`${this.store.baseUrl}api/views`, data).then((response) => {
					if (!response.data.success) {
						this.errors = response.data.errors;
						console.log(this.errors);
					}
				});
			})


		}
	}
}
</script>
<template>
	<div class="card px-0" style="width: 18rem;">
		<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'"
			class="card-img-top" alt="...">
		<div class="card-body">
			<h4 class="card-title">{{ apartment.descrizione }}</h4>
			<p class="card-text">{{ apartment.position.indirizzo }}, {{ apartment.position.città }},
				{{ apartment.position.N_civico }}, {{ apartment.position.Nazione }}</p>
			<h5 class="text-end fw-bolder">&euro; {{ apartment.prezzo }} notte</h5>
			<router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }" class="btn btn-sm btn-success"
				@click="addView">
				Vai all'appartamento
			</router-link>
		</div>
	</div>
</template>
<style lang="scss"></style>