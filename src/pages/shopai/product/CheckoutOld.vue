<template>
    <atom-section-container>
        <div>
            <h1>Finally want to checkout huh?</h1>

            <div class="border p-4 my-4 rounded dark:border-soft-dark">
                <stripe-checkout ref="checkoutRef" :pk="publishableKey" :sessionId="sessionId" />
                <atom-simple-button @click="submit"> Pay Now </atom-simple-button>
            </div>
        </div>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors.js"

import { StripeCheckout } from "@vue-stripe/vue-stripe";
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
import AtomButton from "../../../components/atoms/AtomButton.vue";
import AtomSimpleButton from '../../../components/atoms/AtomSimpleButton.vue';
export default {
    components: {
        StripeCheckout,
        AtomSectionContainer,
        AtomButton,
        AtomSimpleButton,
    },
    mounted() {
        this.getSession()
    },
    data() {
        return {
            // publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
            publishableKey: "pk_test_51N1qxpJppcOn388PmuZzFss9TBPbSZLonHau52lYWw5rZNM5RMp73hZUisg5wLaLlGo8Na6U4PdBtaw4cuAq4f7c00w3AsId7j",
            sessionId: null
        };
    },
    methods: {
        async getSession() {
            await axios.get("/api/checkout")
                .then(response => {
                    console.log("Get Session", response)
                    this.sessionId = response.data.id
                })
        },
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
};
</script>

<style>
</style>