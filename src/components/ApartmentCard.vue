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
	<div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-3 px-3">
		<div class="apartment_card rounded-4 bg-light" title="Visualizza i dettagli dell'appartamento">
			<div>
				<router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }"
					class="text-decoration-none text-black">
					<div class="card_img_container">
						<div class="price rounded-pill py-1 px-2 text-white">
							{{ apartment.prezzo }} &euro;
						</div>
						<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4='"
							class="card-img-top rounded-top-4" alt="...">
					</div>
					<div class="mt-3 px-3 pb-2 d-flex apartment-info rounded-4">
						<div class="w-75 bg">
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
	transition: box-shadow 0.5s ease;
	.card_img_container {
		width: 100%;
		height: 220px;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			// transition: box-shadow 0.5s ease;
		}

		.price{
			position: absolute;
			top: .5rem;
			right: .5rem;
			background-color: rgba(0,0,0,0.5)
		}
	}

	.apartment-info{
		transition: border 0.5s ease;
	}

	&:hover {
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.7);
	}
}
</style>
