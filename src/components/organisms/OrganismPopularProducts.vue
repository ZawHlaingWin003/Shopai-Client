<template>
    <organism-product-slider
        :products="popularProducts"
        mainTitle="Popular Products"
        bgImage="bg-popular-products"
        titleDescription="A Different Kind Of Company. A Different Kind Of Ecommerce.
                Lorem ipsum dolor sit amet consectetur adipisicing elit."
        :isReverse="true"
    >
    </organism-product-slider>
</template>

<script>
import axios from "@/axios-interceptors";

import MoleculeProductCard from "../molecules/MoleculeProductCard.vue";
import OrganismProductSlider from "./OrganismProductSlider.vue";
export default {
    components: {
        MoleculeProductCard,
        OrganismProductSlider,
    },
    mounted() {
        this.getProducts();
    },
    data() {
        return {
            popularProducts: [],
        };
    },
    methods: {
        async getProducts(page) {
            await axios
                .get("/api/products", {
                    params: {
                        page: page,
                        search: this.search,
                        sub_category: this.selectedSubCategory,
                        category: this.selectedCategory,
                    },
                })
                .then((response) => {
                    this.popularProducts = response.data.data;
                });
        },
    },
};
</script>
