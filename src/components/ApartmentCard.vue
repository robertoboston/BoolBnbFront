<script>
import { store } from '../store';
export default {
	name: 'ApartmentCard',
	data(){
		return{
			store
		}
	},
	props:{
      apartment: Object
    },
}
</script>
<template>
	<div class="card px-0" style="width: 18rem;">
		<img :src="apartment.cover ? `${this.store.baseUrl}storage/${apartment.cover}` : 'https://picsum.photos/300/200'" class="card-img-top" alt="...">
		<div class="card-body">
				<h4 class="card-title">{{ apartment.descrizione }}</h4>
				<p class="card-text">{{ apartment.position.indirizzo }}, {{ apartment.position.città }}, {{apartment.position.N_civico }}, {{apartment.position.Nazione}}</p>
				<h5 class="text-end fw-bolder">&euro; {{apartment.prezzo}} notte</h5>
				<router-link :to="{name: 'single-apartment', params: {slug: apartment.slug} }" class="btn btn-sm btn-success">
					Vai all'appartamento
				</router-link>
		</div>
	</div>

</template>
<style lang="scss">
	
</style>