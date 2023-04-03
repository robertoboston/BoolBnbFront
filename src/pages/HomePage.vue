<script>
import axios from 'axios';
import { store } from '../store';
import Searchbar from '../components/Searchbar.vue';
import ApartmentCard from '../components/ApartmentCard.vue';
export default {
    name: 'Homepage',
    components: {
        Searchbar,
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
    <div class="container">
            <div class="row">
                <div class="image-fluid">
                    <img src="" alt="">
                </div>
            </div>
            <div class="row justify-content-center">

                <Searchbar> </Searchbar>
            </div>

            <div class="col-12 w-100 d-flex justify-content-center">
                <div v-if="loading" class="d-flex justify-content-center">
                    <div class="spinner-border"></div>
                </div>
            </div>

            <div class="row gap-5 my-5">
                <ApartmentCard v-for="(item, index) in this.apartmentsToShow" :key="index" :apartment="item">
                </ApartmentCard>
                <!-- <div class="col-12 mt-4 d-flex flex-wrap gap-5">
                                                        <div class="card" v-for="(apartment, index) in this.apartmentsToShow" :key="index" style="width: 18rem;">
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
                                                    </div> -->
            </div>
        </div>
    </main>
</template>
<style lang="scss" scoped></style>