<script>
import axios from 'axios';
import {store} from '../store.js';
export default {
	name: 'SingleApartment',
	data(){
		return{
				store,
				apartment: null,
				lon: '',
				lat: ''
		}

	},
	created(){
		axios.get(`${this.store.baseUrl}api/apartments/${this.$route.params.slug}`).then((response) => {
				this.apartment = response.data.apartment;
				console.log(this.apartment.cover);
			})	
		},
	mounted(){
		this.lon = parseFloat(this.apartment.position.Longitudine);
		this.lat = parseFloat(this.apartment.position.Latitudine);
		console.log(this.lat, this.lon);
		//creazione mappa
		let center = [ this.lon, this.lat]
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
					<div class="col-12 col-md-9 bg-light p-4 rounded-5" id="apartment-card">
						<div class="row mb-2">
							<h1>{{apartment.descrizione}}</h1>
							<div class="col-12 col-md-7 p-0">
								<!-- cover -->
								<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'" class="w-100" alt="{{apartment.descrizione}}">					
							</div>
							<div class="col-12 col-md-5">
								<!-- mappa -->
								<div id="map" class="w-100 h-100"></div>
							</div>
							
						</div>
						<div class="row">
							<div class="col-12 col-md-7">
								<h4>{{apartment.prezzo}}&euro;/Notte</h4>
								<h5>Stanze: {{apartment.numero_di_stanze}}</h5>
								<h5>Bagni: {{apartment.numero_di_bagni}}</h5>
								<h5>Metri Quadri: {{apartment.metri_quadri}}mq</h5>				
								<h5>Servizi:</h5>
								<ul v-for="(service, index) in apartment.services" :key="index">
									<li>{{service.nome}}</li>
								</ul>
								
							</div>
							<div class="col-12 col-md-5">
								<div class="text-end" id="address">
									<img src="../assets/images/home-where.png" alt="">
									<span>
										{{ apartment.position.indirizzo }}, {{ apartment.position.N_civico}}, {{apartment.position.città}}, {{apartment.position.Nazione}}
									</span>
								</div> 

							</div>
						</div>
					</div>
            </div>
            <div class="mt-5">
                <router-link :to="{name: 'homepage'}" class="btn btn-success">
                    Homepage
                </router-link>
            </div>
            
        </div>
    </main>
</template>

<style lang="scss" scoped>
   #apartment-card{
		font-weight: 600;

		#address{
			img{
				height: 1.5rem;
				vertical-align:text-bottom;
			}
		}
	}
</style>