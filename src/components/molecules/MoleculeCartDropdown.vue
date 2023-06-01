<template>
    <div class="relative w-fit" ref="cartDropdown">
        <button
            class="relative text-[1.2rem] w-12 flex items-center justify-center h-12 rounded-full bg-primary-600 hover:bg-primary-500 active:opacity-80 text-light dark:bg-black dark:hover:bg-soft-dark transition"
            :class="{
                'bg-primary-500 text-white dark:bg-black': isCartDropdownOpen,
            }"
            @click="isCartDropdownOpen = !isCartDropdownOpen"
        >
            <i class="fa-solid fa-cart-shopping"></i>
            <span
                class="absolute right-0 top-0 w-4 h-4 flex items-center justify-center rounded text-white bg-primary-900 hover:bg-soft-dark dark:bg-primary-500 text-sm"
            >
                <template v-if="isCartLoading">
                    <atom-button-loader />
                </template>
                <template v-else>
                    {{ cart?.products?.length || 0 }}
                </template>
            </span>
        </button>
        <div
            class="cart-dropdown bg-primary-600 text-light rounded-md shadow-md absolute z-10 right-0 top-[115%] px-4 py-2 divide-y-2 divide-gray-400 divide-opacity-30 dark:bg-black scale-0 transition duration-200 opacity-0 origin-top-right w-80 max-h-96 overflow-y-scroll"
            :class="{
                'scale-100 opacity-100': isCartDropdownOpen,
            }"
        >
            <template v-if="cart?.products?.length">
                <div>
                    <ul class="text-sm space-y-4">
                        <li
                            class="flex items-start justify-between hover:bg-primary-500 dark:hover:bg-soft-dark p-2 rounded transition gap-4"
                            v-for="(product, index) in cart.products"
                            :key="product.id"
                        >
                            <div class="flex items-start gap-4">
                                <img
                                    :src="product.image"
                                    alt="IMG"
                                    class="w-12 h-12 object-cover rounded block"
                                />
                                <div class="header-cart-item-txt flex flex-col">
                                    <span
                                        class="inline-block cursor-pointer hover:text-primary-300"
                                        @click="
                                            {
                                                $router.push({
                                                    name: 'products.show',
                                                    params: {
                                                        slug: product.slug,
                                                    },
                                                });
                                                isCartDropdownOpen = false;
                                            }
                                        "
                                    >
                                        {{ product.name }}
                                    </span>
                                    <span class="header-cart-item-info">
                                        {{
                                            cart.cart_products[index].pivot
                                                .quantity
                                        }}
                                        x ${{ product.actual_price }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="remove px-2 rounded hover:bg-dark text-red-700 cursor-pointer justify-items-end"
                                ref="removeCartBtn"
                                @click="$emit('removeCartProduct', product)"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="flex items-center justify-between py-4">
                    <p class="text-lg font-bold uppercase">Subtotal</p>
                    <p>-</p>
                    <h3 class="text-xl font-bold text-white tracking-wide">
                        $ {{ cart.total_price.toFixed(2) }}
                    </h3>
                </div>
                <div class="font-body flex justify-between pt-4 pb-2">
                    <atom-simple-button
                        @click="
                            {
                                $router.push({ name: 'cart' });
                                isCartDropdownOpen = false;
                            }
                        "
                    >
                        <i class="fa-solid fa-cart-shopping"></i>
                        View Cart
                    </atom-simple-button>
                    <atom-link-button
                        :to="{
                            name: 'checkout',
                        }"
                    >
                        Checkout</atom-link-button
                    >
                </div>
            </template>
            <template v-else>
                <p class="text-center py-4">No Products in Cart!</p>
            </template>
        </div>
    </div>
</template>

<script>
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import AtomLinkButton from "../atoms/AtomLinkButton.vue";
export default {
    components: { AtomLinkButton, AtomButtonLoader, AtomSimpleButton },
    mounted() {
        window.addEventListener("click", this.closeDropdown);
    },
    beforeUnmount() {
        window.removeEventListener("click", this.closeDropdown);
    },
    inject: ["cart", "isCartLoading"],
    data() {
        return {
            isCartDropdownOpen: false,
        };
    },
    methods: {
        closeDropdown(event) {
            if (!this.$refs.cartDropdown.contains(event.target)) {
                this.isCartDropdownOpen = false;
            }
        },
    },
};
</script>

<style>
</style>