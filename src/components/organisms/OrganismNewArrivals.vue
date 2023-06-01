<template>
    <organism-product-slider
        :products="newArrivalProducts"
        mainTitle="New Arrivals"
        bgImage="bg-new-arrivals"
        titleDescription="A Different Kind Of Company. A Different Kind Of Ecommerce.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores commodi harum consectetur eos cum omnis nesciunt
                reiciendis, nostrum quo quidem."
        :isReverse="false"
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
            newArrivalProducts: [],
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
                    this.newArrivalProducts = response.data.data;
                });
        },
    },
};
</script>
