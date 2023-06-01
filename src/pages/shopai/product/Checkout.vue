<template>
    <atom-section-container class="py-16">
        <div class="border rounded-md p-8 mx-auto w-1/2 space-y-4 dark:border-soft-dark">
            <div>
                <label for="card_element" class="mb-2">Credit Card Information</label>
                <div id="card_element"></div>
            </div>
            <button
                class="border dark:border-soft-dark hover:bg-primary-500 rounded-md p-2 active:bg-primary-700 disabled:bg-gray-600"
                @click="paymentProcess"
                :disabled="paymentProcessing"
                v-text="paymentProcessing ? 'Processing...' : 'Pay Now'"
            ></button>
        </div>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors";

import { loadStripe } from "@stripe/stripe-js";
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
export default {
    components: {
        AtomSectionContainer,
    },
    data() {
        return {
            customer: {},
            stripe: {},
            cardElement: {},
            paymentProcessing: false,
        };
    },
    async mounted() {
        this.getUserInfo();

        this.stripe = await loadStripe(
            "pk_test_51N1qxpJppcOn388PmuZzFss9TBPbSZLonHau52lYWw5rZNM5RMp73hZUisg5wLaLlGo8Na6U4PdBtaw4cuAq4f7c00w3AsId7j"
        );

        const elements = this.stripe.elements();

        this.cardElement = elements.create("card", {
            classes: {
                base: "px-2 py-[10px] rounded-md w-full border focus:outline-none focus:border-primary-800 text-soft-dark transition dark:bg-black dark:text-white dark:border-soft-dark dark:focus:border-primary-900 disabled:bg-gray-200 disabled:border-gray-400 dark:disabled:bg-gray-600",
            },
        });

        this.cardElement.mount("#card_element");
    },
    methods: {
        async paymentProcess() {
            // Send the payment information to Laravel + Stripe

            this.paymentProcessing = true;

            const { paymentMethod, error } =
                await this.stripe.createPaymentMethod(
                    "card",
                    this.cardElement,
                    {
                        billing_details: {
                            name: this.customer.name,
                            email: this.customer.email,
                            address: {
                                line1: this.customer.address,
                                city: this.customer.city,
                                state: this.customer.state,
                                postal_code: this.customer.zip_code,
                            },
                        },
                    }
                );

            if (error) {
                this.paymentProcessing = false;
                alert(error);
            } else {
                this.customer.payment_method_id = paymentMethod.id;

                axios
                    .post("/api/purchase", this.customer)
                    .then((response) => {
                        this.paymentProcessing = false;

                        this.$router.push({
                            name: "order.summary",
                        });
                    })
                    .catch((error) => {
                        this.paymentProcessing = false;
                        alert(error);
                    });
            }
        },

        async getUserInfo() {
            await axios.get("/api/checkout").then((response) => {
                console.log("Get User ", response)

                this.customer.name = response.data.user.name;
                this.customer.email = response.data.user.email;
                this.customer.phone = response.data.user.phone;
                this.customer.address = response.data.user.user_address.address;
                this.customer.city = response.data.user.user_address.region.name;
                this.customer.state = response.data.user.user_address.township.name;
                this.customer.zip_code = response.data.user.user_address.zip_code;

                this.customer.amount = response.data.cart.total_price;
            });
        },
    },
};
</script>

<style>
</style>
