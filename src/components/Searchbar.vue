<script>
import axios from 'axios';
import { store } from '../store';
export default {
	name: 'Searchbar',
	emits: ["search"],
	data(){
		return{
			store,
			baseUrl : 'https://api.tomtom.com/search/2/geocode/',
			key: 'RyyEkTjOzu8ryYUL5416kcB3qFRzzpOR',
			suggerimenti: [],
			dropdown: false,
			search: ''
		}	
	},
	mounted(){
		if(this.$route.name == 'advanced-search'){
		 this.search = this.$route.params.search;
		}
	},
	methods: {
		positionClick(item){

			this.search = '';

			if(item.address.streetName)
				this.search = item.address.streetName + ", ";
			if(item.address.streetNumber)
				this.search += item.address.streetNumber + ", ";
			if(item.address.countrySecondarySubdivision)
				this.search += item.address.countrySecondarySubdivision + ", ";
			if(item.address.country)
				this.search += item.address.country;

			if(this.$route.name == 'homepage'){
				this.$router.push({ 
					name: 'advanced-search', 
					params: { search: this.search , lat: item.position.lat, lon: item.position.lon} 
				})
			}
			else if(this.$route.name == 'advanced-search'){
				this.$emit('search', item.position.lat, item.position.lon);
    	}
			
			this.dropdown = false;

		},
		//metodo per mostrare i suggerimenti nel dropdown
		getSugg(){
			axios.get(`${this.baseUrl}${this.search}.json?key=${this.key}`).then( response => {
				this.dropdown = true;
				//console.log(response.data);
				const results = response.data.results;
				this.suggerimenti = results.slice(0,5);
			})
		}
	}
}
</script>

<template>
	<div id="search-container" class="p-0">
		<div id="searchbar" class="d-flex  align-items-center rounded-5 mb-2 w-100 bg-white">
			<i class="fa-solid fa-magnifying-glass mx-2"></i>
			<input type="search" class="w-100 b-none" placeholder="inserisci luogo" v-model="search" @keyup="getSugg" id="inputSearch">
		</div>
		<!-- dropdown -->
		<ul id="dropdown-sugg" v-if="this.dropdown" class="rounded-3 bg-light list-unstyled w-100">
			<li v-for="item in suggerimenti" :key="item.id" class="p-2" @click="positionClick(item)">
				<i class="fa-solid fa-location-dot me-1"></i>
				{{ item.address.country }}  {{ item.address.countrySecondarySubdivision }} {{ item.address.countrySubdivision }} {{ item.address.freeformAddress }}
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
@use '../styles/partials/variables' as *;

#search-container{
	width: 500px;
	position: relative;
	#searchbar{
		padding: .8rem 1.2rem;
		input{
			border: none;
			outline: none;
			caret-color: $brand-yellow;
			&::placeholder{
				font-weight: 600;
			}
		}
		input[type = 'search']::-webkit-search-cancel-button{
			-webkit-appearance: none;
			cursor: pointer;
			height: .8em;
			width: .8em;
			content: url("../assets/images/delete.svg");
		}
		i{
			cursor: pointer;
			color: $brand-blue;
		}
	}
	
	#dropdown-sugg{
		position: absolute;
		font-size: .8rem;
		box-shadow: 0px 10px 10px 0px #555555;
		z-index: 2;
		li{
			cursor: pointer;
			text-align: left;
			&:hover{
				background-color: #eaeaea;
			}
			&:first-child{
				border-radius: .5rem .5rem 0 0;
			}
			&:last-child{
				border-radius: 0 0 .5rem .5rem;
			}
			.fa-location-dot{
				color: #8d8d8d;
			}
		}
	}
}
	
</style>