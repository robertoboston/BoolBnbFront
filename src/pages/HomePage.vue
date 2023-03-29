<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'Homepage',
	 data(){
		return{
			store,
			loading: true,
			apartments: []
		}
	 },
	 mounted() {
			axios.get(`${this.store.baseUrl}apartments`).then((response) => {
				if(response.data.success){
		
					this.apartments = response.data.apartments;
					this.loading = false;
				}
		})
	 },
}
</script>
<template lang="">
    <main>
        <div>
            <h1 class="text-center">Homepage</h1>
        </div>
    </main>
</template>
<style lang="scss" scoped></style>