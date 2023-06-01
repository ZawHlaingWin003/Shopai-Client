<template>
    <atom-section-container>
        <organism-category-modal
            :category="category"
            :isModalOpen="isCategoryModalOpen"
            :isButtonLoading="isButtonLoading"
            :isEditMode="isEditMode"
            :errors="errors"
            @closeModal="closeCategoryModal"
            @addCategory="addCategory"
            @updateCategory="updateCategory"
        />
        <organism-sub-category-modal
            :subCategory="subCategory"
            :errors="errors"
            :isModalOpen="isSubCategoryModalOpen"
            :isButtonLoading="isButtonLoading"
            :isEditMode="isEditMode"
            @addSubCategory="addSubCategory"
            @closeModal="closeSubCategoryModal"
        />
        <div
            class="shadow dark:border-soft-dark rounded py-4 md:px-6 space-y-8"
        >
            <atom-simple-button @click="openCategoryModal">
                <i class="fa-solid fa-cart-arrow-down"></i>
                <span>Add Category</span>
            </atom-simple-button>
            <div class="py-20 text-center" v-if="isCategoryLoading">
                <atom-button-loader class="mx-auto" />
            </div>
            <div
                class="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                v-else
            >
                <molecule-category-card
                    v-for="category in categories"
                    :key="category.id"
                    :category="category"
                    :subCategories="category.sub_categories"
                    @openSubCategoryModal="openSubCategoryModal"
                    @openEditCategoryModal="openEditCategoryModal"
                    @deleteCategory="deleteCategory"
                    @deleteSubCategory="deleteSubCategory"
                    :isButtonLoading="isButtonLoading"
                />
            </div>
        </div>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors";
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
import AtomLinkButton from "../../../components/atoms/AtomLinkButton.vue";
import AtomSimpleButton from "../../../components/atoms/AtomSimpleButton.vue";
import MoleculeCategoryCard from "../../../components/molecules/MoleculeCategoryCard.vue";
import OrganismCategoryModal from "../../../components/organisms/OrganismCategoryModal.vue";
import AtomButtonLoader from "../../../components/atoms/AtomButtonLoader.vue";
import OrganismSubCategoryModal from "../../../components/organisms/OrganismSubCategoryModal.vue";
export default {
    components: {
        AtomSectionContainer,
        AtomLinkButton,
        MoleculeCategoryCard,
        OrganismCategoryModal,
        AtomSimpleButton,
        AtomButtonLoader,
        OrganismSubCategoryModal,
    },
    data() {
        return {
            categories: [],

            category: {},
            subCategory: {},
            errors: null,

            isButtonLoading: false,

            isEditMode: false,

            isCategoryLoading: false,
            isCategoryModalOpen: false,

            isSubCategoryModalOpen: false,
        };
    },
    mounted() {
        this.getCategories();
    },
    methods: {
        // Set Null To Object Value
        setNullToObject(object, value) {
            Object.keys(object).forEach((i) => {
                this.category[i] = value;
            });
        },

        // Get All Categories
        async getCategories() {
            this.isCategoryLoading = true;
            await axios.get("/api/categories").then((response) => {
                this.categories = response.data.data;
                this.isCategoryLoading = false;
            });
        },

        closeCategoryModal() {
            this.isCategoryModalOpen = false;
            this.isEditMode = false;
            this.category = {};
        },

        // Open Modal and Add Category
        openCategoryModal() {
            this.isCategoryModalOpen = true;
        },
        async addCategory() {
            this.isButtonLoading = true;
            await axios
                .post("/api/categories", this.category)
                .then((response) => {
                    this.closeCategoryModal();
                    this.isButtonLoading = false;
                    this.getCategories();
                });
        },

        // Open Modal and Update Category
        async openEditCategoryModal(category_slug) {
            this.isButtonLoading = true;
            await axios
                .get("/api/categories/" + category_slug)
                .then((response) => {
                    this.category = response.data.data;
                    this.isButtonLoading = false;
                    this.isCategoryModalOpen = true;
                    this.isEditMode = true;
                });
        },
        async updateCategory() {
            this.isButtonLoading = true;
            await axios
                .put(`/api/categories/${this.category.slug}`, this.category)
                .then((response) => {
                    this.closeCategoryModal();
                    this.isButtonLoading = false;
                    this.getCategories();
                });
        },

        // Delete Category
        async deleteCategory(category) {
            if (
                confirm(
                    "Are you sure you want to delete this data? It'll also delete its sub-categories."
                )
            ) {
                await axios
                    .delete(`/api/categories/${category.slug}`)
                    .then(() => {
                        this.getCategories();
                    });
            }
        },

        closeSubCategoryModal() {
            this.isSubCategoryModalOpen = false;
            this.subCategory = {};
        },

        openSubCategoryModal(category) {
            this.isSubCategoryModalOpen = true;
            this.subCategory.category = category;
        },

        async addSubCategory() {
            this.isButtonLoading = true;
            await axios
                .post("/api/sub_categories", this.subCategory)
                .then((response) => {
                    console.log(response);
                    this.closeSubCategoryModal();
                    this.isButtonLoading = false;
                    this.getCategories();
                });
        },

        async deleteSubCategory(subCategory) {
            if (confirm("Are you sure you want to delete this data?")) {
                await axios
                    .delete(`/api/sub_categories/${subCategory.slug}`)
                    .then(() => {
                        this.getCategories();
                    });
            }
        },
    },
};
</script>

<style>
</style>