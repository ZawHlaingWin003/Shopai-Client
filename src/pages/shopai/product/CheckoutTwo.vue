<template>
    <atom-section-container>
        <div>
            <stripe-element-card ref="elementRef" :pk="publishableKey" />
        </div>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors.js";

import { StripeElementCard } from "@vue-stripe/vue-stripe";
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
import AtomButton from "../../../components/atoms/AtomButton.vue";
import AtomSimpleButton from "../../../components/atoms/AtomSimpleButton.vue";
export default {
    components: {
        StripeElementCard,
        AtomSectionContainer,
        AtomButton,
        AtomSimpleButton,
    },
    mounted() {
        // this.stripe = new Stripe(this.publishableKey);
    },
    data() {
        return {
            publishableKey:
                "pk_test_51N1qxpJppcOn388PmuZzFss9TBPbSZLonHau52lYWw5rZNM5RMp73hZUisg5wLaLlGo8Na6U4PdBtaw4cuAq4f7c00w3AsId7j",
            token: null,
        };
    },

    methods: {
        submit() {
            // this will trigger the process
            this.$refs.elementRef.submit();
        },
    },
};
</script>

<style>
</style>