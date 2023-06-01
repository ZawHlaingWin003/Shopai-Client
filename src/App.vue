<template>
    <div>
        <atom-page-loader />

        <organism-header
            :isAuthenticated="isAuthenticated"
            :isDarkTheme="isDarkTheme"
            :isLogoutButtonLoading="isLogoutButtonLoading"
            :isProfileLoading="isProfileLoading"
            :isCartLoading="isCartLoading"
            @logout="logout"
            @switchTheme="switchTheme"
            :user="user"
            :cart="cart"
            @removeCartProduct="removeCartProduct"
        />

        <div>
            <router-view
                @login="authenticated"
                @register="authenticated"
                @addToCart="addToCart"
                @getCartProducts="getCartProducts"
                @removeCartProduct="removeCartProduct"
                @updateCartProductQuantity="updateCartProductQuantity"
                @clearCart="clearCart"
                @updatedAuthenticatedUser="updatedAuthenticatedUser"
            ></router-view>
        </div>

        <organism-footer />
    </div>
</template>

<script>
import axios from "./axios-interceptors";
import AtomPageLoader from "./components/atoms/AtomPageLoader.vue";
import OrganismFooter from "./components/organisms/OrganismFooter.vue";
import OrganismHeader from "./components/organisms/OrganismHeader.vue";
import { computed } from "vue";

export default {
    components: {
        OrganismHeader,
        OrganismFooter,
        AtomPageLoader,
    },
    watch: {
        $route(to, from) {
            window.scrollTo(0, 0);
        },
    },
    mounted() {
        this.isAuthenticated = localStorage.getItem("API_TOKEN");
        this.isAuthenticated && this.getAuthenticatedUser();

        const savedTheme = localStorage.getItem("isDarkTheme");
        this.isDarkTheme = savedTheme === "true";
        if (this.isDarkTheme) {
            document.documentElement.classList.add("dark");
        }

        this.getCartProducts();
    },

    data() {
        return {
            loading: false,
            isLogoutButtonLoading: false,
            isAuthenticated: false,
            isDarkTheme: false,
            user: {},

            cart: {},
            cartProducts: [],

            isCartLoading: false,
            isProfileLoading: false,
            isAddToCartButtonLoading: false,

            clickedProductId: null,
            clickedCartProductId: null,

            isQuantityLoading: false,
        };
    },
    provide() {
        // use function syntax so that we can access `this`
        return {
            cart: computed(() => this.cart),
            cartProducts: computed(() => this.cartProducts),
            isAddToCartButtonLoading: computed(
                () => this.isAddToCartButtonLoading
            ),
            isCartLoading: computed(() => this.isCartLoading),
            isQuantityLoading: computed(() => this.isQuantityLoading),
            clickedProductId: computed(() => this.clickedProductId),
            clickedCartProductId: computed(() => this.clickedCartProductId),
        };
    },
    methods: {
        async getCartProducts() {
            this.isCartLoading = true;
            await axios
                .get("/api/cart/products")
                .then((response) => {
                    if (response.data.data) {
                        this.cart = response.data.data;
                        this.cartProducts = this.cart.products.map(
                            (product) => product.id
                        );
                    } else {
                        this.cart = {};
                    }
                })
                .finally(() => {
                    this.isCartLoading = false;
                });
        },

        async addToCart(product) {
            this.clickedProductId = product.id;
            this.isAddToCartButtonLoading = true;
            await axios.post("/api/cart/add", product).then((response) => {
                this.cart = response.data.data;
                this.cartProducts.push(product.id);
                this.isAddToCartButtonLoading = false;
            });
        },

        async removeCartProduct(product) {
            this.isCartLoading = true;
            await axios.delete("/api/cart/" + product.slug).then((response) => {
                this.getCartProducts();
            });
        },

        async updateCartProductQuantity(product, quantity) {
            this.isQuantityLoading = true;
            this.clickedCartProductId = product.id;
            await axios
                .put("/api/cart/" + product.slug, {
                    quantity: quantity,
                })
                .then((response) => {
                    this.getCartProducts();
                    this.isQuantityLoading = false;
                });
        },

        async clearCart() {
            this.isCartLoading = true;
            await axios.delete("/api/cart").then((response) => {
                this.getCartProducts();
            });
        },

        async logout() {
            this.isLogoutButtonLoading = true;
            await axios.post("api/logout").then((response) => {
                localStorage.removeItem("API_TOKEN");
                this.$router.replace({ name: "login" });
                this.isAuthenticated = false;
                this.isLogoutButtonLoading = false;
            });
        },

        authenticated(user) {
            this.isAuthenticated = true;
            this.user = user;
        },

        switchTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            document.documentElement.classList.toggle("dark");
            localStorage.setItem("isDarkTheme", this.isDarkTheme);
        },

        async getAuthenticatedUser() {
            this.isProfileLoading = true;
            await axios.get("/api/user").then((response) => {
                this.user = response.data.user;
                this.isProfileLoading = false;
            });
        },

        updatedAuthenticatedUser() {
            this.getAuthenticatedUser()
        },
    },
};
</script>


<style scoped>
</style>
