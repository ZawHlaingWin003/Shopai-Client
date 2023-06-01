<template>
    <atom-section-container class="py-20">
        <div class="header text-center">
            <h1
                class="text-2xl font-big-title font-bold tracking-wider relative after:absolute after:content-[''] after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1.5 after:rounded-sm after:bg-primary-700"
            >
                Cart
            </h1>
        </div>
        <!-- <pre>
            {{ cart }}
        </pre> -->
        <div class="body my-8">
            <div class="flex gap-10">
                <div class="cart-list cart-dropdown overflow-x-auto w-[70%]">
                    <table class="w-full rounded-lg">
                        <thead
                            class="border border-primary-700 dark:border-black"
                        >
                            <tr>
                                <th class="px-6 py-3">#</th>
                                <th class="px-6 py-3">Product Name</th>
                                <th class="px-6 py-3">Quantity</th>
                                <th class="px-6 py-3">Total Price</th>
                                <th class="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody
                            class="border border-primary-700 dark:border-black text-center"
                        >
                            <template v-if="isCartLoading">
                                <tr>
                                    <td colspan="6">
                                        <atom-big-loader />
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <template v-if="cart.products?.length">
                                    <tr
                                        v-for="(
                                            product, index
                                        ) in cart.products"
                                        :key="product.id"
                                    >
                                        <td class="px-6 py-3">
                                            <img
                                                :src="product.image"
                                                alt="Product Image"
                                                class="w-20 h-20 object-contain rounded border dark:border-black hover:shadow"
                                            />
                                        </td>
                                        <td class="px-6 py-3">
                                            {{ product.name }} <br />
                                            ${{ product.actual_price }}
                                        </td>
                                        <td class="px-6 py-3">
                                            <div
                                                class="w-20 relative flex justify-center items-center"
                                            >
                                                <atom-input
                                                    type="number"
                                                    min="1"
                                                    v-model="
                                                        cart.cart_products[
                                                            index
                                                        ].pivot.quantity
                                                    "
                                                    :disabled="
                                                        isQuantityLoading &&
                                                        clickedCartProductId ==
                                                            product.id
                                                    "
                                                    class="relative"
                                                    @change="
                                                        $emit(
                                                            'updateCartProductQuantity',
                                                            product,
                                                            cart.cart_products[
                                                                index
                                                            ].pivot.quantity
                                                        )
                                                    "
                                                />
                                                <atom-button-loader
                                                    class="absolute"
                                                    v-if="
                                                        isQuantityLoading &&
                                                        clickedCartProductId ==
                                                            product.id
                                                    "
                                                />
                                            </div>
                                        </td>
                                        <td class="px-6 py-3">
                                            $
                                            {{
                                                cart.cart_products[index].pivot
                                                    .total_price
                                            }}
                                        </td>
                                        <td class="px-6 py-3">
                                            <span
                                                class="text-md hover:text-red-700 cursor-pointer transition-all"
                                                title="Remove from Cart"
                                                @click="
                                                    $emit(
                                                        'removeCartProduct',
                                                        product
                                                    )
                                                "
                                            >
                                                <i
                                                    class="fa-solid fa-trash-can"
                                                ></i>
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="5" class="py-8">
                                            <h3 class="text-center text-xl">
                                                Your cart is empty! Sounds like
                                                a good time to
                                                <router-link
                                                    :to="{
                                                        name: 'products.index',
                                                    }"
                                                    class="text-primary-700 underline"
                                                    >start shopping</router-link
                                                >.
                                            </h3>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="w-[30%]">
                    <div
                        class="border border-primary-700 rounded dark:border-black p-4"
                    >
                        <h1 class="flex justify-between text-xl font-bold mb-6">
                            <span>Subtotal</span>
                            <span>-</span>
                            <span>$ {{ cart.total_price || 0 }}</span>
                        </h1>
                        <atom-link-button
                            :to="{
                                name: 'checkout',
                            }"
                            class="w-full text-lg flex justify-center uppercase tracking-wider"
                            >Checkout</atom-link-button
                        >
                        <div class="text-center flex items-center gap-4 my-4">
                            <div
                                class="w-full h-[2px] bg-primary-700 bg-opacity-50"
                            ></div>
                            <p class="whitespace-nowrap">Or</p>
                            <div
                                class="w-full h-[2px] bg-primary-700 bg-opacity-50"
                            ></div>
                        </div>
                        <p class="text-center">
                            <router-link
                                :to="{
                                    name: 'products.index',
                                }"
                                class="text-xl font-bold text-primary-700 hover:underline"
                                >Continue Shopping</router-link
                            >
                        </p>
                    </div>
                    <span
                        class="inline-block my-4 text-lg space-x-2 hover:text-red-600 cursor-pointer transition-all"
                        v-if="cart?.products?.length"
                        @click="$emit('clearCart')"
                    >
                        <i class="fa-regular fa-circle-xmark"></i>
                        <span>Clear Cart</span>
                    </span>
                </div>
            </div>
        </div>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors.js";

import { StripeCheckout } from "@vue-stripe/vue-stripe";
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
import AtomBigLoader from "../../../components/atoms/AtomBigLoader.vue";
import AtomLinkButton from "../../../components/atoms/AtomLinkButton.vue";
import AtomInput from "../../../components/atoms/AtomInput.vue";
import AtomButtonLoader from "../../../components/atoms/AtomButtonLoader.vue";
export default {
    components: {
        StripeCheckout,
        AtomSectionContainer,
        AtomBigLoader,
        AtomLinkButton,
        AtomInput,
        AtomButtonLoader,
    },
    mounted() {
    },
    data() {
        return {
            // publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
            publishableKey:
                "pk_test_51N1qxpJppcOn388PmuZzFss9TBPbSZLonHau52lYWw5rZNM5RMp73hZUisg5wLaLlGo8Na6U4PdBtaw4cuAq4f7c00w3AsId7j",
            isCheckoutButtonLoading: false,
        };
    },
    inject: [
        "cart",
        "isCartLoading",
        "isQuantityLoading",
    ],

    methods: {
    },
};
</script>

<style>
</style>