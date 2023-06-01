<template>
    <div
        class="post-item border border-soft-white hover:shadow-sm rounded-md cursor-pointer group dark:border-soft-dark"
    >
        <div class="post-img rounded-t-md relative overflow-hidden w-full h-60">
            <img
                :src="
                    product.image
                        ? product.image
                        : `https://ui-avatars.com/api/?name=${product.name}&bold=true&rounded=true`
                "
                alt="Product"
                class="w-full h-full object-contain transition group-hover:scale-110"
            />
            <div
                class="absolute px-2 py-1 bg-primary-500 text-white rounded-md text-sm top-4 left-4"
                v-if="product.discount_percentage"
            >
                <span class="hot">-{{ product.discount_percentage }}%</span>
            </div>
        </div>
        <div
            class="post-info mx-6 pt-2 pb-4 border-t-2 border-t-gray-500 border-opacity-30"
        >
            <div class="product_category text-center">
                <a
                    href="#"
                    class="text-gray-400 text-xs hover:text-gray-600 tracking-widest transition"
                >
                    <i class="fa-solid fa-folder"></i>
                    {{ product.category.name }}
                </a>
            </div>
            <div class="py-4 space-y-4">
                <div class="product_name">
                    <router-link
                        :to="{
                            name: 'products.show',
                            params: { slug: product.slug },
                        }"
                        class="font-title text-2xl font-bold text-primary-900 hover:text-primary-500 transition leading-6 dark:text-primary-600 dark:hover:text-primary-900"
                    >
                        {{ product.name }}
                    </router-link>
                </div>
                <div class="product-price tracking-wider font-bold">
                    <template v-if="product.discount_percentage">
                        <span
                            class="old-price mr-2 text-xl text-gray-500 line-through"
                        >
                            ${{ product.price }}
                        </span>
                    </template>
                    <span class="text-lg text-primary-500">
                        ${{ product.actual_price }}
                    </span>
                </div>
            </div>
            <atom-simple-button
                @click="addToCart"
                :disabled="isAddToCartButtonDisabled"
            >
                <atom-button-loader
                    v-if="
                        isAddToCartButtonLoading &&
                        clickedProductId == product.id
                    "
                />
                <i class="fa-solid fa-cart-shopping" v-else></i>

                <span>
                    <template v-if="isAddToCartButtonDisabled">Added</template>
                    <template v-else>Add To Cart</template>
                </span>
            </atom-simple-button>
        </div>
    </div>
</template>

<script>
import axios from "@/axios-interceptors";
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
export default {
    components: { AtomSimpleButton, AtomButtonLoader },
    props: [
        "product",
        "clickedProductId",
        "isAddToCartButtonDisabled",
        "isAddToCartButtonLoading",
    ],
    data() {
        return {};
    },
    mounted() {},
    methods: {
        addToCart() {
            this.$emit("addToCart", this.product);
        },
    },
};
</script>

<style>
</style>