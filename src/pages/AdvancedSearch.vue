<script>
import axios from 'axios';
import {store} from '../store.js';
import Searchbar from '../components/Searchbar.vue';
export default {
	name: 'AdvancedSearch',
	components: {
		Searchbar
	},
	data(){
		return{
			store
		}
	}
	
}
</script>
<template>
	<main>
		<div class="container">
			<Searchbar> </Searchbar>
		</div>	
	</main>
</template>
<style lang="scss">
	
</style>