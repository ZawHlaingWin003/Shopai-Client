<template>
    <div class="">
        <div class="header text-center">
            <h1
                class="font-big-title text-4xl font-bold text-primary-700 w-max mx-auto relative after:absolute after:content-[''] after:-bottom-2 after:left-1/2 after:rounded-md after:-translate-x-1/2 after:w-full after:h-1 after:bg-primary-400"
            >
                {{ mainTitle }}
            </h1>
            <p class="mt-10 w-1/2 mx-auto">
                {{ titleDescription }}
            </p>
        </div>
        <div
            class="flex gap-8 mt-12"
            :class="{
                'flex-row-reverse': isReverse,
            }"
        >
            <div
                class="border dark:border-soft-dark relative rounded-md w-[25%] bg-cover bg-center"
                :class="{
                    'bg-popular-products': bgImage == 'bg-popular-products',
                    'bg-new-arrivals': bgImage == 'bg-new-arrivals',
                }"
            >
                <div
                    class="flex items-center justify-center rounded-md w-full h-full bg-black bg-opacity-50 text-light text-center"
                >
                    <h1 class="font-big-title text-4xl font-bold">
                        {{ mainTitle }}
                    </h1>
                </div>
            </div>
            <div class="w-[75%] popular-products-swiper-container">
                <swiper
                    ref="newArrivalsSwiper"
                    :modules="modules"
                    :breakpoints="swiperOptions.breakpoints"
                    navigation
                >
                    <swiper-slide
                        v-for="(product, index) in products"
                        :key="index"
                    >
                        <molecule-product-card :product="product" />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
// import required modules for swiper
import { Navigation } from "swiper";
import "swiper/css/navigation";

import MoleculeProductCard from "../molecules/MoleculeProductCard.vue";
export default {
    components: {
        MoleculeProductCard,
    },
    props: [
        "products",
        "mainTitle",
        "titleDescription",
        "isReverse",
        "bgImage",
    ],
    data() {
        return {
            modules: [Navigation],
            swiperOptions: {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    450: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                    },
                },
            },
        };
    },
    methods: {},
};
</script>

<style>
.swiper-button-prev::after,
.swiper-button-next::after {
    font-size: 20px;
}
</style>