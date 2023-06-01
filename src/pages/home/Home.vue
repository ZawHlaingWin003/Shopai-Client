<template>
    <div>
        <atom-section-container>
            <home-section />
        </atom-section-container>

        <feature-section />

        <atom-section-container>
            <product-slider-section />
        </atom-section-container>

        <discount-section />

        <atom-section-container>
            <testimonial-grid-section />
        </atom-section-container>

        <news-letter-section />
    </div>
</template>

<script>
import AtomSectionContainer from "../../components/atoms/AtomSectionContainer.vue";
import HomeSection from "./sections/HomeSection.vue";
import FeatureSection from "./sections/FeatureSection.vue";
import NewsLetterSection from "./sections/NewsLetterSection.vue";
import DiscountSection from "./sections/DiscountSection.vue";
import TestimonialGridSection from "./sections/TestimonialGridSection.vue";
import ProductSliderSection from "./sections/ProductSliderSection.vue";
export default {
    components: {
        AtomSectionContainer,
        HomeSection,
        FeatureSection,
        NewsLetterSection,
        DiscountSection,
        TestimonialGridSection,
        ProductSliderSection,
    },
    mounted() {},
    data() {
        return {
            isPageLoading: false,
            newArrivalProducts: [],
            popularProducts: [],
        };
    },
    methods: {},
};
</script>

<style>
</style>