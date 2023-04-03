<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
	name: 'SingleApartment',
	data() {
		return {
			store,
			apartment: null,
			lon: '',
			lat: ''
		}

	},
	created() {
		axios.get(`${this.store.baseUrl}api/apartments/${this.$route.params.slug}`).then((response) => {
			this.apartment = response.data.apartment;
			console.log(this.apartment.cover);
		})
	},
	mounted() {
		this.lon = parseFloat(this.apartment.position.Longitudine);
		this.lat = parseFloat(this.apartment.position.Latitudine);
		console.log(this.lat, this.lon);
		//creazione mappa
		let center = [this.lon, this.lat]
		const map = tt.map({
			key: 'RyyEkTjOzu8ryYUL5416kcB3qFRzzpOR',
			container: "map",
			center: center,
			zoom: 10
		})
		map.on('load', () => {
			new tt.Marker().setLngLat(center).addTo(map)
		})
		//
	}

}
</script>

<template>
	<main class="mt-5">
		<div class="container my-2 ">
			<div class="row justify-content-center">
				<!-- Offcanvas messaggio-->
				<div class="col-12">
					<button class="btn message_button_position message_button_style" type="button"
						data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
						title="Invia un messaggio al proprietario"><i class="fa-solid fa-message"></i></button>

					<div class="offcanvas offcanvas-end offcanvas_size" tabindex="-1" id="offcanvasRight"
						aria-labelledby="offcanvasRightLabel">
						<div class="offcanvas-header">
							<h4 class="offcanvas-title" id="offcanvasRightLabel">Invia un messaggio al proprietario</h4>
						</div>
						<!-- Form messaggio -->
						<div class="offcanvas-body">
							<div class="bg-light p-3 rounded mb-3">
								<div class="mb-2">
									<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'"
										class="w-100 rounded" alt="{{apartment.descrizione}}">
								</div>
								<p class="mb-2 fw-bold">{{ apartment.descrizione }}</p>
								<p class="m-0">{{ apartment.position.indirizzo }} {{ apartment.position.N_civico }}, {{
									apartment.position.città }}, {{ apartment.position.Nazione }}</p>
							</div>
							<form action="">
								<!-- Nome e Cognome -->
								<div class="row">
									<div class="col">
										<div class="form-floating mb-3">
											<input type="text" class="form-control" id="floatingInput" placeholder="Nome">
											<label for="floatingInput">Nome</label>
										</div>
									</div>

									<div class="col">
										<div class="form-floating mb-3">
											<input type="text" class="form-control" id="floatingInput"
												placeholder="Cognome">
											<label for="floatingInput">Cognome</label>
										</div>
									</div>
								</div>
								<!-- Email -->
								<div class="row">
									<div class="col">
										<div class="form-floating mb-3">
											<input type="email" class="form-control" id="floatingInput"
												placeholder="name@gmail.com">
											<label for="floatingInput">Indirizzo Email</label>
										</div>
									</div>
								</div>
								<!-- Messaggio -->
								<div class="row">
									<div class="col">
										<div class="form-floating">
											<textarea class="form-control message_container"
												placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
											<label for="floatingTextarea2">Messaggio</label>
										</div>
									</div>
								</div>
								<!-- Submit -->
								<div class="row mt-3">
									<div class="col">
										<button class="btn message_form_dismiss_button text-white w-100" type="button"
											data-bs-dismiss="offcanvas">Annulla</button>
									</div>
									<div class="col">
										<button class="btn message_form_submit_button text-white w-100"
											type="submit">Invia</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-9 bg-light p-4 rounded-5" id="apartment-card">
					<div class="row mb-2">
						<h1>{{ apartment.descrizione }}</h1>
						<div class="col-12 col-md-7 p-0">
							<!-- cover -->
							<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'"
								class="w-100" alt="{{apartment.descrizione}}">
						</div>
						<div class="col-12 col-md-5">
							<!-- mappa -->
							<div id="map" class="w-100 h-100"></div>
						</div>

					</div>
					<div class="row">
						<div class="col-12 col-md-7">
							<h4>{{ apartment.prezzo }}&euro;/Notte</h4>
							<h5>Bagni: {{ apartment.numero_di_bagni }}</h5>
							<h5>Stanze: {{ apartment.numero_di_stanze }}</h5>
							<h5>Metri Quadri: {{ apartment.metri_quadri }}mq</h5>
							<h5>Servizi:</h5>
							<ul v-for="(service, index) in apartment.services" :key="index">
								<li>{{ service.nome }}</li>
							</ul>

						</div>
						<div class="col-12 col-md-5">
							<div class="text-end" id="address">
								<img src="../assets/images/home-where.png" alt="">
								<span>
									{{ apartment.position.indirizzo }}, {{ apartment.position.N_civico }},
									{{ apartment.position.città }}, {{ apartment.position.Nazione }}
								</span>
							</div>

						</div>
					</div>
				</div>
			</div>

		</div>
	</main>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;


.offcanvas_size {
	width: 100%;
}

.message_button_position {
	margin-right: 2rem;
	margin-bottom: 2rem;
	position: fixed;
	bottom: 0;
	right: 0;
}

.message_button_style {
	background-color: $brand-blue;
	color: white;
	border-radius: 50%;
	padding: .75rem 1rem;

	&:hover {
		background-color: #107eb4;
	}
}

.message_container {
	height: 100px;
}

.message_form_dismiss_button {
	background-color: $brand-red;
}

.message_form_submit_button {
	background-color: $brand-blue;
}

#apartment-card {
	font-weight: 600;

	#address {
		img {
			height: 1.5rem;
			vertical-align: text-bottom;
		}
	}
}


@media screen and (min-width: 600px) {
	.offcanvas_size {
		width: 500px;
	}
}
</style>