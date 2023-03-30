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
			indirizzo: '',
			civico: '',
			città: '',
			nazione: '',
			lat: '',
			lon: '',
			search: ''
		}	
	},
	methods: {
		//metodo per mostrare i suggerimenti nel dropdown
		getSugg(){
			axios.get(`${this.baseUrl}${this.search}.json?key=${this.key}`).then( response => {
				this.dropdown = true;
				//console.log(response.data);
				const results = response.data.results;
				this.suggerimenti = results.slice(0,5);
			})
		},
		//metodo per selezionare un suggerimento
		pickAddress(item){
			this.via = item.address.streetName;
			this.civico = item.address.streetNumber;
			this.città = item.address.countrySecondarySubdivision;
			this.nazione = item.address.country;
			this.lat = parseFloat(item.position.lat);
			this.lon = parseFloat(item.position.lon);
			this.search = item.address.freeformAddress;
			this.dropdown = false;
		}
	}
}
</script>

<template>
	<div id="search-container" class="p-0">
		<div id="searchbar" class="d-flex py-1 px-2 align-items-center rounded-5 mb-2 w-100">
			<i class="fa-solid fa-magnifying-glass mx-2" @click="$emit('search', `${search}`)"></i>
			<input type="search" class="w-100" placeholder="inserisci luogo" @keyup.enter="$emit('search', `${search}`)" v-model="search" @keyup="getSugg" id="inputSearch">
		</div>
		<!-- dropdown -->
		<ul id="dropdown-sugg" v-if="this.dropdown" class="rounded-3 bg-light list-unstyled w-100">
			<li v-for="item in suggerimenti" :key="item.id" class="p-2" @click="pickAddress(item)">
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
		border: 1px solid rgb(198, 198, 198);
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
		box-shadow: 0px 10px 10px 0px #8d8d8d;
		z-index: 2;
		li{
			cursor: pointer;
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