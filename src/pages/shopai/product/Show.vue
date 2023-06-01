<template>
    <atom-section-container class="lg:py-24">
        <template v-if="isProductLoading">
            <atom-big-loader />
        </template>
        <template v-else>
            <div class="flex gap-8">
                <div class="w-full">
                    <div
                        class="product_img w-full h-80 py-8 border border-white dark:border-soft-dark hover:shadow-md cursor-pointer rounded"
                    >
                        <img
                            :src="product.image"
                            alt="Product Image"
                            class="w-full h-full object-contain"
                        />
                    </div>
                    <div class="my-4 w-full">
                        <h1 class="uppercase font-bold font-big-title">
                            Also something for you
                        </h1>
                        <div class="flex">
                            <div class="w-20 h-20">
                                <img
                                    src="@/assets/images/Products/Mens/product1.png"
                                    alt=""
                                />
                            </div>
                            <div class="w-20 h-20">
                                <img
                                    src="@/assets/images/Products/Mens/product2.png"
                                    alt=""
                                />
                            </div>
                            <div class="w-20 h-20">
                                <img
                                    src="@/assets/images/Products/Mens/product3.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product_info w-full px-4 space-y-8">
                    <h1
                        class="text-3xl text-center font-bold relative after:content[''] after:absolute after:left-1/2 after:top-[120%] after:-translate-x-1/2 after:w-20 after:h-1 after:bg-soft-dark font-title uppercase text-primary-500"
                    >
                        {{ product.name }}
                    </h1>
                    <p>{{ product.description }}</p>
                    <p class="font-bold tracking-wider">
                        <template v-if="product.discount_percentage">
                            <span
                                class="old-price mr-2 text-2xl text-gray-500 line-through"
                            >
                                ${{ product.price }}
                            </span>
                        </template>
                        <span class="text-xl text-primary-500">
                            ${{ product.actual_price }}
                        </span>
                    </p>
                    <div class="flex justify-between">
                        <!-- <div
                            class="w-20 relative flex justify-center items-center"
                            v-if="!this.cartProducts.includes(this.product.id)"
                        >
                            <atom-input
                                type="number"
                                min="1"
                                v-model="product_quantity"
                                :disabled="isQuantityLoading"
                                class="relative"
                                @change="
                                    $emit(
                                        'updateCartProductQuantity',
                                        product,
                                        product_quantity
                                    )
                                "
                            />
                            <atom-button-loader
                                class="absolute"
                                v-if="isQuantityLoading"
                            />
                        </div> -->
                        <div class="">
                            <atom-simple-button
                                @click="addToCart(product)"
                                :disabled="
                                    this.cartProducts.includes(this.product.id)
                                "
                            >
                                <atom-button-loader
                                    v-if="isAddToCartButtonLoading"
                                />
                                <i
                                    class="fa-solid fa-cart-shopping"
                                    v-if="isAddToCartButtonLoading == false"
                                ></i>

                                <span>
                                    <template
                                        v-if="
                                            this.cartProducts.includes(
                                                this.product.id
                                            )
                                        "
                                        >Added</template
                                    >
                                    <template v-else>Add To Cart</template>
                                </span>
                            </atom-simple-button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors.js";
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
import AtomBigLoader from "../../../components/atoms/AtomBigLoader.vue";
import AtomSimpleButton from "../../../components/atoms/AtomSimpleButton.vue";
import AtomInput from "../../../components/atoms/AtomInput.vue";
import AtomButtonLoader from "../../../components/atoms/AtomButtonLoader.vue";
export default {
    components: {
        AtomSectionContainer,
        AtomBigLoader,
        AtomSimpleButton,
        AtomInput,
        AtomButtonLoader,
    },
    props: ["slug"],
    inject: [
        "cart",
        "cartProducts",
        "isAddToCartButtonLoading",
        "isQuantityLoading",
    ],
    data() {
        return {
            product: [],
            product_quantity: 1,
            isProductLoading: false,
        };
    },
    mounted() {
        this.getProduct(this.slug);
    },
    methods: {
        async getProduct(slug) {
            this.isProductLoading = true;
            await axios
                .get("/api/products/" + slug)
                .then((response) => {
                    console.log(response);
                    this.product = response.data.data;
                    this.isProductLoading = false;
                })
                .catch((error) => {
                    if ((error.response.status = 404)) {
                        this.$router.push({ name: "Error404" });
                    }
                });
        },
    },
};
</script>

<style>
</style>