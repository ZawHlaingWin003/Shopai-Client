<template>
    <tbody class="border border-primary-700 text-center">
        <template v-if="isCartLoading">
            <tr>
                <td colspan="6">
                    <atom-big-loader />
                </td>
            </tr>
        </template>
        <template v-else>
            <template v-if="cart.products?.length">
                <tr v-for="(product, index) in cart.products" :key="product.id">
                    <td class="px-6 py-3">
                        <img
                            :src="product.image"
                            alt="Product Image"
                            class="w-20 h-20 object-contain rounded border border-black hover:shadow"
                        />
                    </td>
                    <td class="px-6 py-3">
                        {{ product.name }} <br />
                        $
                        {{ product.actual_price }}
                    </td>
                    <td class="px-6 py-3">
                        <atom-input
                            type="number"
                            v-model="cart.cart_products[index].pivot.quantity"
                            min="1"
                            @change="
                                updateProductQuantity(
                                    product,
                                    cart.cart_products[index].pivot.quantity
                                )
                            "
                        />
                    </td>
                    <td class="px-6 py-3">
                        $
                        {{
                            cart.cart_products[index].pivot.quantity *
                            product.actual_price
                        }}
                    </td>
                    <td class="px-6 py-3">
                        <span
                            class="text-xl hover:text-red-700 cursor-pointer"
                            title="Remove from Cart"
                        >
                            <i class="fa-regular fa-circle-xmark"></i>
                        </span>
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr>
                    <td colspan="5" class="py-8">
                        <h3 class="text-center text-xl">
                            Your cart is empty! Sounds like a good time to
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
</template>

<script>
export default {};
</script>

<style>
</style>