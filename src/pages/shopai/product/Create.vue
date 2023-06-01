<template>
    <div>
        <organism-product-form
            :product="product"
            :errors="errors"
            :isButtonLoading="isButtonLoading"
            :isSlugLoading="isSlugLoading"
            :isDiscountLoading="isDiscountLoading"
            :isSelectLoading="isSelectLoading"
            :categories="categories"
            :subCategories="subCategories"
            @addProduct="addProduct"
            @getSubCategory="getSubCategory"
            @changePreviewImages="changePreviewImages"
            @deletePreviewImage="deletePreviewImage"
            @checkSlug="checkSlug"
            @generateDiscountPrice="generateDiscountPrice"
        />
    </div>
</template>

<script>
import axios from "@/axios-interceptors";
import OrganismProductForm from "../../../components/organisms/OrganismProductForm.vue";
export default {
    components: { OrganismProductForm },
    data() {
        return {
            product: {
                name: "",
                slug: "",
                description: "",
                price: "",
                quantity: 0,
                discount_percentage: 0,
                discount_price: 0,
                category: "",
                subCategory: "",
                images: [],
            },
            errors: null,
            isButtonLoading: false,
            isSlugLoading: false,
            isDiscountLoading: false,
            isSelectLoading: false,
            categories: [],
            subCategories: [],
        };
    },
    mounted() {
        this.getCategory();
    },
    methods: {
        async checkSlug() {
            this.isSlugLoading = true;
            await axios
                .post("/api/products/check-slug", {
                    name: this.product.name,
                })
                .then((response) => {
                    this.product.slug = response.data.slug;
                    this.isSlugLoading = false;
                });
        },

        async generateDiscountPrice() {
            if (
                this.product.price &&
                this.product.discount_percentage &&
                this.product.discount_percentage <= 100
            ) {
                this.isDiscountLoading = true;
                await axios
                    .post("/api/products/generate-discount", {
                        price: this.product.price,
                        discount_percentage: this.product.discount_percentage,
                    })
                    .then((response) => {
                        this.product.discount_price =
                            response.data.discount_price;
                        this.isDiscountLoading = false;
                    });
            } else {
                console.log(
                    "Please Fill Discount Percentage Field To Generate Discount Price"
                );
            }
        },

        deletePreviewImage(index) {
            this.product.images.splice(index, 1);
        },

        changePreviewImages(files) {
            this.product.images = [];

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.product.images.push({ url: reader.result, file });
                };
            });
        },

        async addProduct() {
            this.isButtonLoading = true;
            let data = new FormData();
            data.append("name", this.product.name);
            data.append("slug", this.product.slug);
            data.append("description", this.product.description);
            data.append("price", this.product.price);
            data.append(
                "discount_percentage",
                this.product.discount_percentage
            );
            data.append("discount_price", this.product.discount_price);
            data.append("quantity", this.product.quantity);
            data.append("category_id", this.product.category);
            data.append("sub_category_id", this.product.subCategory);

            this.product.images.forEach((file) => {
                data.append("images[]", file.file);
            });
            await axios
                .post("/api/products", data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.$router.push({ name: "products.index" });
                })
                .catch((error) => {
                    if ((error.response.status = 422)) {
                        this.errors = error.response.data.errors;
                    }
                })
                .finally(() => {
                    this.isButtonLoading = false;
                });
        },

        async getCategory() {
            await axios.get("/api/categories").then((response) => {
                this.categories = response.data.data;
            });
        },

        async getSubCategory(category_id) {
            this.product.subCategory = "";
            this.isSelectLoading = true;
            await axios
                .get(`/api/sub_categories?category_id=${category_id}`)
                .then((response) => {
                    this.subCategories = response.data.data;
                    this.isSelectLoading = false;
                });
        },
    },
};
</script>

<style>
</style>