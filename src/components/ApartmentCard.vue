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
	mounted() {
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
</script>
<template>
	<div class="col-12 col-md-4 col-lg-3 mb-2">
		<div class="apartment_card rounded p-2" title="Visualizza i dettagli dell'appartamento">
			<div>
				<router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }"
					class="text-decoration-none text-black">
					<div class="card_img_container">
						<div class="price rounded-pill py-1 px-2 text-white">
							{{ apartment.prezzo }} &euro;
						</div>
						<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4='"
							class="card-img-top rounded-4" alt="...">
					</div>
					<div class="pt-3 d-flex">
						<div class="w-75">
							<h4 class="card-title fs-6">{{ apartment.descrizione }}</h4>
							<hr class="mt-1 mb-1">
							<p class="card-text">{{ apartment.position.indirizzo }} {{ apartment.position.N_civico }}, 
								{{ apartment.position.città }},  {{ apartment.position.Nazione }}</p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.apartment_card {

	.card_img_container {
		width: 100%;
		height: 220px;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}

		.price{
			position: absolute;
			top: .5rem;
			right: .5rem;
			background-color: rgba(0,0,0,0.5)
		}
	}

	&:hover {
		box-shadow: 0px 0px 19px -3px rgba(0, 0, 0, 0.58);
	}
}
</style>
