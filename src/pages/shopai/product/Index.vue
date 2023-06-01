<template>
    <atom-section-container class="py-16 space-y-8">
        <div class="w-2/3 mx-auto space-y-4">
            <div class="space-x-4">
                <atom-link-button :to="{ name: 'products.create' }">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                    <span> Create Product </span>
                </atom-link-button>
                <atom-link-button :to="{ name: 'products.categories' }">
                    Product Category Management
                </atom-link-button>
            </div>
            <molecule-search-dropdown
                :options="categories"
                v-model="search"
                @searchProduct="getProducts"
                :selectedOption="selectedCategory"
                @filterByCategory="getCategories"
            />
        </div>
        <div class="w-1/2 mx-auto">
            <molecule-tag-cloud
                :tags="subCategories"
                :selectedSubCategory="selectedSubCategory"
                :isTagBoxLoading="isTagBoxLoading"
                @filterBySubCategory="filterBySubCategory"
            />
        </div>
        <div>
            <template v-if="isProductLoading">
                <atom-big-loader />
            </template>
            <template v-else>
                <template v-if="products.data?.length">
                    <div class="grid grid-cols-3 gap-8 my-4">
                        <molecule-product-card
                            v-for="product in products.data"
                            :key="product.id"
                            :product="product"
                            :clickedProductId="clickedProductId"
                            :isAddToCartButtonDisabled="
                                cartProducts.includes(product.id)
                            "
                            :isAddToCartButtonLoading="isAddToCartButtonLoading"
                            @addToCart="addToCart"
                        />
                    </div>
                </template>
                <template v-else>
                    <div class="text-center py-8">
                        <span class="text-3xl text-primary-500 font-bold"
                            >Product Not Found :(</span
                        >
                    </div>
                </template>
            </template>
            <!-- Pagination -->
            <div class="flex justify-between items-center mt-12">
                <TailwindPagination
                    :data="products"
                    :limit="1"
                    :item-classes="[
                        'h-8 md:h-10 flex items-center px-3 md:px-5 text-dark bg-white hover:bg-primary-500 hover:text-white text-gray-600 dark:bg-soft-dark dark:text-white dark:hover:bg-black dark:border-none rounded border border-primary-700 disabled:bg-gray-300 disabled:border-opacity-30 dark:disabled:bg-gray-600',
                    ]"
                    :active-classes="[
                        'h-8 md:h-10 flex items-center px-3 md:px-5 bg-primary-700 text-white rounded border border-r-0 border-gray-600',
                    ]"
                    @pagination-change-page="getProducts"
                    class="flex flex-wrap gap-2"
                >
                    <template #prev-nav>
                        <span class="rounded">Prev</span>
                    </template>
                    <template #next-nav>
                        <span class="rounded">Next</span>
                    </template>
                </TailwindPagination>
                <p>Total Items - {{ paginations.total }}</p>
            </div>
        </div>
    </atom-section-container>
</template>


<script>
import axios from "@/axios-interceptors";

import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
import AtomLinkButton from "../../../components/atoms/AtomLinkButton.vue";
import MoleculeProductCard from "../../../components/molecules/MoleculeProductCard.vue";
import MoleculeSearchDropdown from "../../../components/molecules/MoleculeSearchDropdown.vue";
import MoleculeSearchForm from "../../../components/molecules/MoleculeSearchForm.vue";
import MoleculeTagCloud from "../../../components/molecules/MoleculeTagCloud.vue";
import AtomBigLoader from "../../../components/atoms/AtomBigLoader.vue";
export default {
    components: {
        AtomSectionContainer,
        MoleculeSearchForm,
        MoleculeProductCard,
        MoleculeSearchDropdown,
        MoleculeTagCloud,
        AtomLinkButton,
        AtomBigLoader,
    },
    mounted() {
        this.search = this.$route.query.search || "";
        this.selectedCategory = this.$route.query.category || "";
        this.selectedSubCategory = this.$route.query.sub_category || "";
        this.page = this.$route.query.page;

        this.getCategories(this.selectedCategory);
        this.getProducts();
    },
    inject: [
        "cart",
        "cartProducts",
        "isAddToCartButtonLoading",
        "clickedProductId",
    ],
    data() {
        return {
            categories: [],
            subCategories: [],
            products: [],

            paginations: {},

            search: "",
            selectedCategory: "",
            selectedSubCategory: "",

            isTagBoxLoading: false,
            isProductLoading: false,

            isAddToCartButtonDisabled: false,
        };
    },
    methods: {
        getFilterQuery() {
            if (this.page) {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        page: this.page,
                    },
                });
            }

            if (
                this.search == "" ||
                this.selectedCategory == "" ||
                this.selectedSubCategory == ""
            ) {
                this.$router.replace({
                    name: "products.index",
                });
            }

            if (
                this.search &&
                this.selectedSubCategory &&
                this.selectedCategory
            ) {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        search: this.search,
                        sub_category: this.selectedSubCategory,
                        category: this.selectedCategory,
                    },
                });
            } else if (this.search && this.selectedCategory) {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        search: this.search,
                        category: this.selectedCategory,
                    },
                });
            } else if (this.search && this.selectedSubCategory) {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        search: this.search,
                        sub_category: this.selectedSubCategory,
                    },
                });
            } else if (this.search) {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        search: this.search,
                    },
                });
            }
        },

        async getProducts(page = 1, perPage = 3) {
            this.isProductLoading = true;
            await axios
                .get("/api/products", {
                    params: {
                        page: page,
                        perPage: perPage,
                        search: this.search,
                        sub_category: this.selectedSubCategory,
                        category: this.selectedCategory,
                    },
                })
                .then((response) => {
                    console.log(response)
                    this.products = response.data;
                    this.paginations = response.data.meta;
                    this.isProductLoading = false;
                });

            this.getFilterQuery();
        },
        async getCategories(selectedCategory) {
            this.selectedSubCategory = "";
            this.search = "";
            this.isTagBoxLoading = true;

            await axios.get("/api/categories").then((response) => {
                this.categories = response.data.data;
            });

            if (!selectedCategory) {
                this.selectedCategory = selectedCategory;
                this.getProducts();

                this.categories.forEach((category) => {
                    category.sub_categories.forEach((sub_category) => {
                        if (
                            !this.subCategories.some(
                                (item) => item.name === sub_category.name
                            )
                        ) {
                            this.subCategories.push(sub_category);
                        }
                    });
                });

                this.$router.replace({
                    name: "products.index",
                });
            } else {
                this.selectedCategory = selectedCategory;
                this.getProducts();

                await axios
                    .get(`/api/categories/${selectedCategory}`)
                    .then((response) => {
                        this.subCategories = [];
                        response.data.data.sub_categories.forEach(
                            (sub_category) => {
                                this.subCategories.push(sub_category);
                            }
                        );
                    });
                this.$router.replace({
                    name: "products.index",
                    query: {
                        category: this.selectedCategory,
                    },
                });
            }

            this.subCategories.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            this.isTagBoxLoading = false;
        },

        async filterBySubCategory(tag) {
            this.selectedSubCategory = tag;
            this.search = "";

            this.getProducts();

            if (this.selectedCategory) {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        sub_category: this.selectedSubCategory,
                        category: this.selectedCategory,
                    },
                });
            } else {
                this.$router.replace({
                    name: "products.index",
                    query: {
                        sub_category: this.selectedSubCategory,
                    },
                });
            }
        },

        addToCart(product) {
            // console.log("Index => ", product);
            this.$emit("addToCart", product);
        },
    },
};
</script>

<style>
</style>