<template>
    <atom-section-container class="py-16">
        <div class="shadow border dark:border-soft-dark rounded py-4 px-6">
            <div
                class="border-b border-b-primary-300 dark:border-b-soft-dark pb-4"
            >
                <h1 class="text-2xl font-big-title font-bold text-primary-700">
                    Create New Product
                </h1>
            </div>
            <div class="py-4">
                <p
                    class="text-white font-bold p-2 mb-4 border bg-red-500 rounded"
                    v-if="errors && errors.message"
                >
                    {{ errors.message[0] }}
                </p>
                <form
                    @submit.prevent="$emit('addProduct')"
                    enctype="multipart/form-data"
                >
                    <div class="flex gap-20 my-4">
                        <div class="w-[60%]">
                            <atom-form-group
                                id="name"
                                label="Product Name"
                                :hasError="errors && errors.name"
                            >
                                <atom-input
                                    type="text"
                                    v-model="product.name"
                                    id="name"
                                    :hasError="errors && errors.name"
                                    @change="$emit('checkSlug')"
                                />
                            </atom-form-group>

                            <atom-form-group
                                id="slug"
                                label="Product Slug (This'll be generate automatically when filled up Product Name)"
                                :hasError="errors && errors.slug"
                                :isInputLoading="isSlugLoading"
                            >
                                <atom-input
                                    type="text"
                                    v-model="product.slug"
                                    class="relative"
                                    id="slug"
                                    disabled
                                    :hasError="errors && errors.slug"
                                />
                            </atom-form-group>

                            <atom-form-group
                                id="description"
                                label="Product Description"
                                :hasError="errors && errors.description"
                            >
                                <atom-textarea
                                    v-model="product.description"
                                    id="description"
                                    :hasError="errors && errors.description"
                                    rows="4"
                                />
                            </atom-form-group>
                            <div class="flex gap-8 mb-4">
                                <atom-form-group
                                    id="category"
                                    label="Product Main Category"
                                    :hasError="errors && errors.category"
                                    class="w-1/2"
                                >
                                    <atom-select-option
                                        :options="categories"
                                        v-model="product.category"
                                        id="category"
                                        label="Choose Category"
                                        @change="
                                            $emit(
                                                'getSubCategory',
                                                product.category
                                            )
                                        "
                                        :hasError="errors && errors.category"
                                    />
                                </atom-form-group>
                                <atom-form-group
                                    id="subCategory"
                                    label="Product Sub-Category"
                                    :hasError="errors && errors.subCategory"
                                    class="w-1/2"
                                    :isInputLoading="isSelectLoading"
                                >
                                    <atom-select-option
                                        :options="subCategories"
                                        v-model="product.subCategory"
                                        label="Choose Sub Category"
                                        :disabled="
                                            !product.category || isSelectLoading
                                        "
                                        id="subCategory"
                                        :hasError="errors && errors.subCategory"
                                    />
                                </atom-form-group>
                            </div>

                            <div class="flex gap-4">
                                <atom-simple-button :disabled="isButtonLoading">
                                    <atom-button-loader
                                        v-if="isButtonLoading"
                                    />
                                    <i
                                        class="fa-solid fa-cart-arrow-down"
                                        v-if="isButtonLoading == false"
                                    ></i>
                                    <span>Add Product</span>
                                </atom-simple-button>
                                <atom-simple-button>
                                    <i class="fa-solid fa-floppy-disk"></i>
                                    <span>Save Draft</span>
                                </atom-simple-button>
                            </div>
                        </div>
                        <div class="w-[40%]">
                            <div class="flex gap-8">
                                <atom-form-group
                                    id="price"
                                    label="Product Price"
                                    :hasError="errors && errors.price"
                                    class="w-[60%]"
                                >
                                    <atom-input
                                        type="text"
                                        v-model="product.price"
                                        id="price"
                                        :hasError="errors && errors.price"
                                        @change="$emit('generateDiscountPrice')"
                                    />
                                </atom-form-group>
                                <atom-form-group
                                    id="quantity"
                                    label="Product Quantity"
                                    :hasError="errors && errors.quantity"
                                    class="w-[40%]"
                                >
                                    <atom-input
                                        type="number"
                                        v-model="product.quantity"
                                        id="quantity"
                                        :hasError="errors && errors.quantity"
                                        min="0"
                                    />
                                </atom-form-group>
                            </div>
                            <div class="flex gap-8">
                                <atom-form-group
                                    id="discount_percentage"
                                    label="Discount Percentage"
                                    :hasError="
                                        errors && errors.discount_percentage
                                    "
                                    class="w-[40%]"
                                >
                                    <atom-input
                                        type="number"
                                        v-model="product.discount_percentage"
                                        id="discount_percentage"
                                        :hasError="
                                            errors && errors.discount_percentage
                                        "
                                        :disabled="isPriceFieldNull"
                                        min="0"
                                        max="100"
                                        @change="$emit('generateDiscountPrice')"
                                    />
                                </atom-form-group>
                                <atom-form-group
                                    id="discount_price"
                                    label="Discount Price"
                                    :hasError="errors && errors.discount_price"
                                    class="w-[60%]"
                                    :isInputLoading="isDiscountLoading"
                                >
                                    <atom-input
                                        type="text"
                                        v-model="product.discount_price"
                                        id="discount_price"
                                        disabled
                                        class="relative"
                                        :hasError="
                                            errors && errors.discount_price
                                        "
                                        min="0"
                                    />
                                </atom-form-group>
                            </div>

                            <div>
                                <atom-form-group
                                    id="images"
                                    label="Product Images"
                                    :hasError="errors && errors.images"
                                >
                                    <atom-input
                                        type="file"
                                        id="images"
                                        ref="product_images"
                                        multiple
                                        @change="
                                            changePreviewImages(
                                                $event.target.files
                                            )
                                        "
                                    />
                                </atom-form-group>
                                <p>
                                    {{ product.images.length }} file{{
                                        product.images.length > 1 ? "s" : ""
                                    }}
                                    Selected
                                </p>
                                <div
                                    class="grid grid-cols-2 gap-4"
                                    v-if="product.images.length > 0"
                                >
                                    <div
                                        class="relative"
                                        v-for="(src, index) in product.images"
                                        :key="index"
                                    >
                                        <img
                                            :src="src.url"
                                            alt=""
                                            class="border border-soft-dark rounded h-28 w-full object-contain"
                                        />
                                        <div
                                            class="absolute right-1 top-1 bg-soft-dark p-2 rounded-bl-lg"
                                        >
                                            <i
                                                class="fa-solid fa-trash text-red-500 hover:text-red-700 cursor-pointer"
                                                @click="
                                                    deletePreviewImage(index)
                                                "
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </atom-section-container>
</template>

<script>
import AtomLink from "../atoms/AtomLink.vue";
import AtomInput from "../atoms/AtomInput.vue";
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import MoleculeAuthCard from "../molecules/MoleculeAuthCard.vue";
import MoleculePasswordInput from "../molecules/MoleculePasswordInput.vue";
import AtomCheckbox from "../atoms/AtomCheckbox.vue";
import AtomFormGroup from "../atoms/AtomFormGroup.vue";
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
import AtomSectionContainer from "../atoms/AtomSectionContainer.vue";
import AtomTextarea from "../atoms/AtomTextarea.vue";
import AtomSelectOption from "../atoms/AtomSelectOption.vue";
export default {
    components: {
        AtomSectionContainer,
        MoleculeAuthCard,
        AtomLink,
        AtomInput,
        AtomSimpleButton,
        MoleculePasswordInput,
        AtomCheckbox,
        AtomFormGroup,
        AtomButtonLoader,
        AtomTextarea,
        AtomSelectOption,
    },
    props: [
        "product",
        "errors",
        "isButtonLoading",
        "isSelectLoading",
        "isSlugLoading",
        "isDiscountLoading",
        "hasError",
        "categories",
        "subCategories",
    ],
    mounted() {
        this.checkIsPriceFieldNull();
    },
    data() {
        return {
            isPriceFieldNull: true,
        };
    },
    watch: {
        "product.price"(newValue) {
            if (newValue.length && !isNaN(newValue)) {
                this.isPriceFieldNull = false;
            } else {
                this.isPriceFieldNull = true;
                this.product.discount_percentage = 0;
                this.product.discount_price = 0;
            }
        },
    },
    methods: {
        checkIsPriceFieldNull() {
            if (this.product.price) {
                this.isPriceFieldNull = false;
            } else {
                this.isPriceFieldNull = true;
            }
        },
        deletePreviewImage(index) {
            this.$emit("deletePreviewImage", index);
        },
        changePreviewImages(files) {
            this.$emit("changePreviewImages", files);
        },
    },
};
</script>

<style>
</style>