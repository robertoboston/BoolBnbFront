<script>
import axios from 'axios';
import { store } from '../store';
// import Searchbar from '../components/Searchbar.vue'; 
import AppJumbotron from '../components/AppJumbotron.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
export default {
    name: 'Homepage',
    components: {
        AppJumbotron,
        ApartmentCard
    },
    data() {
        return {
            store,
            loading: true,
            apartments: [],
            apartmentsToShow: []
        }
    },
    mounted() {
        axios.get(`${this.store.baseUrl}api/apartments`).then((response) => {
            if (response.data.success) {
                this.apartments = response.data.apartments.data;
                this.apartmentsToShow = this.apartments
                this.loading = false;
            }
        })
    },

}

</script>
<template>
    <main>
		  <AppJumbotron> </AppJumbotron>
        <div class="container rounded-4 bg-white">
            <!-- <div class="row">
                <div class="image-fluid">
                    <img src="" alt="">
                </div>
            </div>
            <div class="row justify-content-center">

                <Searchbar> </Searchbar>
            </div> -->
            <div class="col-12 w-100 d-flex justify-content-center">
                <div v-if="loading" class="d-flex justify-content-center">
                    <div class="spinner-border"></div>
                </div>
            </div>
            <div class="row py-3">
                <ApartmentCard v-for="(item, index) in this.apartmentsToShow" :key="index" :apartment="item">
                </ApartmentCard>
            </div>
        </div>
    </main>
</template>
<style lang="scss" scoped>
</style>