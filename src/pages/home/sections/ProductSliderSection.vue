<template>
    <div class="mt-52">
        <div class="product-slider-swiper-container">
            <swiper
                class="product-slider-swiper"
                ref="productSliderSwiper"
                :modules="modules"
                navigation
            >
                <swiper-slide>
                    <organism-new-arrivals />
                </swiper-slide>
                <swiper-slide>
                    <organism-popular-products />
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import axios from "@/axios-interceptors";

import { Navigation } from "swiper";
import "swiper/css/navigation";

import OrganismNewArrivals from "../../../components/organisms/OrganismNewArrivals.vue";
import OrganismPopularProducts from "../../../components/organisms/OrganismPopularProducts.vue";

export default {
    components: {
        OrganismNewArrivals,
        OrganismPopularProducts,
    },
    mounted() {},
    data() {
        return {
            modules: [Navigation],
            swiperOptions: {},
        };
    },
    methods: {},
};
</script>

<style scoped>
</style>