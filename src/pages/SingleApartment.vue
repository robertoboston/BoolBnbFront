<script>
import axios from 'axios';
import { store } from '../store.js';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

export default {
	name: 'SingleApartment',
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			store,
			apartment: null,
			lon: '',
			lat: '',
			nome: '',
			cognome: '',
			email: '',
			messaggio: null,
			message: null,
		}

	},
	validations () {
    return {
      nome: {
				required: helpers.withMessage('This field cannot be empty', required),
      	minLength: minLength(3), maxLength: maxLength(20)
			},
      cognome: { required, minLength: minLength(3), maxLength: maxLength(20) }, 
      email: {required, email},
      messaggio: {required, minLength: minLength(5), maxLength: maxLength(200)}
		}
  },
	created() {
		axios.get(`${this.store.baseUrl}api/apartments/${this.$route.params.slug}`).then((response) => {
			this.apartment = response.data.apartment;
		})
	},
	mounted() {

		this.lon = parseFloat(this.apartment.position.Longitudine);
		this.lat = parseFloat(this.apartment.position.Latitudine);
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
	},
	methods: {
		async submitForm () {
			const isFormCorrect = await this.v$.$validate()
			// you can show some extra alert to the user or just leave the each field to show it's `$errors`.
			if (!isFormCorrect) return;

			const btn = document.getElementById('btn-close');
			btn.click();
			
			this.sendMessage();
    },
		sendMessage() {
			const data = {
				apartment_id: this.apartment.id,
				contenuto: this.messaggio,
				nome: this.nome,
				cognome: this.cognome,
				email: this.email,
			}

			axios.put(`${this.store.baseUrl}api/messages`, data).then((response) => {
				if (!response.data.success) {
					this.errors = response.data.errors;
					console.log(this.errors);
				}
				else {
					this.nome = '';
					this.cognome = '';
					this.email = '';
					this.messaggio = '';
				}
				this.message = response.data.message;
			});
		},
		deleteResponseMessage() {
			this.message = null;
		}
	}

}
</script>

<template>
	<main class="mt-5 py-4 position-relative">
		<div class="container-fluid" v-if="(this.message != null)">
			<div class="row">
				<div
					class="col-12 col-md-9 position-absolute z-3 vh-100 vw-100 d-flex justify-content-center align-items-center bg_message_container">
					<div class="alert alert-success alert-dismissible fade show mw-100  d-flex" role="alert">
						<div>
							<i class="fa-sharp fa-regular fa-circle-check fa-2xl mt-4 me-2" style="color: #0a3622;"></i>
						</div>
						<div>
							<strong class="message_content">{{ this.message }}</strong>
						</div>
						<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
							@click="deleteResponseMessage"></button>
					</div>
				</div>
			</div>
		</div>
		<div class="container mt-3">
			<div class="row justify-content-center">
				<!-- Offcanvas messaggio-->
				<div class="col-12">
					<!-- Toast -->
					<div class="toast align-items-center fade show message_toast_position border-0" role="alert"
						aria-live="assertive" aria-atomic="true">
						<div class="d-flex">
							<div class="toast-body fw-bold">
								Invia un messaggio al proprietario!
								<i class="fa-solid fa-paper-plane fa-shake ms-2" style="color: #000000;"></i>
							</div>
							<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"
								aria-label="Close"></button>
						</div>
					</div>
					<!-- Message button -->
					<button class="btn message_button_position message_button_style" type="button"
						data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
						title="Invia un messaggio al proprietario"><i class="fa-solid fa-message"></i></button>

					<div class="offcanvas offcanvas-end offcanvas_size" data-bs-backdrop="static" tabindex="-1"
						id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
						<div class="offcanvas-header">
							<h4 class="offcanvas-title" id="offcanvasRightLabel">Invia un messaggio al proprietario</h4>
							<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<!-- Form messaggio -->
						<div class="offcanvas-body">
							<div class="bg-light p-3 rounded mb-3">
								<div class="mb-2 message_cover_container">
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
											<input type="text" class="form-control" id="floatingInput" placeholder="Nome"
												v-model="nome">
											<label for="floatingInput">Nome</label>
											<div class="text-danger" v-if="v$.nome.$error">{{v$.nome.$message}}</div>
										</div>
									</div>

									<div class="col">
										<div class="form-floating mb-3">
											<input type="text" class="form-control" id="floatingInput" placeholder="Cognome"
												v-model="cognome">
											<label for="floatingInput">Cognome</label>
											<div class="text-danger" v-if="v$.cognome.$error">Campo non valido</div>
										</div>
									</div>
								</div>
								<!-- Email -->
								<div class="row">
									<div class="col">
										<div class="form-floating mb-3">
											<input type="email" class="form-control" id="floatingInput"
												placeholder="name@gmail.com" v-model="email">
											<label for="floatingInput">Indirizzo Email</label>
											<div class="text-danger" v-if="v$.email.$error">Campo non valido</div>
										</div>
									</div>
								</div>
								<!-- Messaggio -->
								<div class="row">
									<div class="col">
										<div class="form-floating">
											<textarea class="form-control message_container"
												placeholder="Leave a comment here" id="floatingTextarea2"
												v-model="messaggio"></textarea>
											<label for="floatingTextarea2">Messaggio</label>
											<div class="text-danger" v-if="v$.messaggio.$error">Campo non valido</div>
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
										<button class="btn message_form_submit_button text-white w-100" type="button"
											@click.prevent="submitForm">Invia</button>
										<button class="d-none" id="btn-close" data-bs-dismiss="offcanvas"></button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div class="col-12 col-md-9 bg-white p-4 px-md-5 rounded-5" id="apartment-card">
					<h1>{{ apartment.descrizione }}</h1>
					<div class="row mb-2">
						<div class="col-12 col-md-9 px-2 mb-2 mt-2 cover_container">
							<!-- cover -->
							<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://media.istockphoto.com/id/1147544807/it/vettoriale/la-commissione-per-la-immagine-di-anteprima-grafica-vettoriale.jpg?s=612x612&w=0&k=20&c=gsxHNYV71DzPuhyg-btvo-QhhTwWY0z4SGCSe44rvg4='"
								class="w-100 rounded-3" alt="{{apartment.descrizione}}">
						</div>
					</div>
					<!-- prezzo -->
					<h4>{{ apartment.prezzo }} &euro; <span class="fw-light fs-6 text-secondary">/Notte</span></h4>
					<hr class="w-75 my-3">
					<!-- Servizi -->
					<div class="row">
						<div class="col-12">
							<h5>Servizi</h5>
							<div>
								<ul class="list-unstyled ms-3 services_list d-flex flex-column flex-wrap">
									<li v-for="(service, index) in apartment.services" :key="index" class="fw-light"><i
											class="fa-solid fa-check me-2"></i>{{ service.nome }}</li>
								</ul>
							</div>

						</div>
					</div>
					<!-- Dettaglio appartamento -->
					<div class="row" id="border-none">
						<div class="col-6 col-md-3 text-center pt-3 border-end ">
							<div class="d-flex align-items-center border rounded p-2 mb-3 shadow">
								<img class="img-size-40 me-2" src="../assets/images/stanze.png" alt="">
								<h5 class="fw-light fs-6"> Stanze</h5>
							</div>
							<span class="fw-medium fs-4">
								{{ apartment.numero_di_stanze ? apartment.numero_di_stanze : 'Non specificato' }}
							</span>
						</div>
						<div class="col-6 col-md-3 text-center pt-3 border_end pe-3">
							<div class="d-flex align-items-center border rounded p-2 mb-3 shadow">
								<img class="img-size-40 me-2" src="../assets/images/letti.png" alt="">
								<h5 class="fw-light fs-6"> Letti</h5>
							</div>
							<span class="fw-medium fs-4">
								{{ apartment.numero_di_letti ? apartment.numero_di_letti : 'Non specificato' }}
							</span>
						</div>
						<div class="col-6 col-md-3 text-center pt-3 border-end pe-3">
							<div class="d-flex align-items-center border rounded p-2 mb-3 shadow">
								<img class="img-size-40 me-2" src="../assets/images/bagni(1).png" alt="">
								<h5 class="fw-light fs-6"> Bagni</h5>
							</div>
							<span class="fw-medium fs-4">
								{{ apartment.numero_di_bagni ? apartment.numero_di_bagni : 'Non specificato' }}
							</span>
						</div>
						<div class="col-6 col-md-3 text-center pt-3 pe-3">
							<div class="d-flex align-items-center border rounded p-2 mb-3  shadow">
								<img class="img-size-40 me-2" src="../assets/images/dimensione.png" alt="">
								<h5 class="fw-light fs-6"> Dimensione</h5>
							</div>
							<span class="fw-medium fs-4">
								{{ apartment.metri_quadri ? apartment.metri_quadri : 'Non specificato' }} mq
							</span>
						</div>
					</div>
					<hr class="my-4">
					<!-- mappa -->
					<div class="col-12 px-2 mb-2">

						<div class="">
							<h5 class="mb-3">Dove ti troverai</h5>
						</div>
						<div class="px-1 my-2" id="address">
							<img src="../assets/images/home-where.png" alt="">
							<span id="address">
								{{ apartment.position.indirizzo }} {{ apartment.position.N_civico }},
								{{ apartment.position.città }}, {{ apartment.position.Nazione }}
							</span>
						</div>
						<div id="map" class="w-100 rounded-3 mb-2"></div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;

.services_list {
	max-height: 140px;
}

.bg_message_container {
	background-color: rgba(0, 0, 0, 0.477);

	.message_content {
		font-size: 2rem;
	}
}

.offcanvas_size {
	width: 100%;
}

.message_button_position {
	margin-right: 2rem;
	margin-bottom: 2rem;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 4;
}

.message_toast_position {
	margin-right: 2rem;
	margin-bottom: 2rem;
	position: fixed;
	bottom: 0;
	right: 55px;
	z-index: 4;
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

	#map {
		height: 100%;
	}
}

.message_cover_container {
	height: 300px;

	img {
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}

.cover_container {
	max-height: 350px;

	img {
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}

.img-size-40 {
	height: 40px;
}

#address {
	img {
		height: 1.5rem;
		vertical-align: text-bottom;
	}
}

.border_end {
	border-right: 1px solid #DDE1E5;
}

@media screen and (min-width: 600px) {
	.offcanvas_size {
		width: 500px;
	}

	#apartment-card {

		#map {
			height: 250px;
		}
	}
}

@media screen and (max-width: 600px) {
	.services_list {
		max-height: 180px;
	}

	.message_toast_position {
		width: 70%;
	}

}

@media screen and (max-width: 767px) {

	.border_end {
		border: 0;
	}

}

@media screen and (max-width: 767px) {
	#apartment-card {

		#map {
			height: 200px;
		}
	}
}
</style>