<template>
    <molecule-modal :isModalOpen="isModalOpen">
        <template #header> Create Sub Category </template>
        <template #default>
            <form @submit.prevent="$emit('addSubCategory')">
                <atom-form-group
                    id="name"
                    label="Sub-Category Name"
                    :hasError="errors && errors.name"
                >
                    <atom-input
                        type="text"
                        autofocus
                        v-model="subCategory.name"
                        id="name"
                        :hasError="errors && errors.name"
                    />
                </atom-form-group>

                <atom-form-group id="category_id" label="Parent Category">
                    <atom-input
                        type="text"
                        v-model="subCategory.category.name"
                        class="relative"
                        id="category_id"
                        disabled
                    />
                </atom-form-group>

                <div class="mt-8">
                    <atom-simple-button :disabled="isButtonLoading">
                        <atom-button-loader v-if="isButtonLoading" />
                        <i
                            class="fa-solid fa-cart-arrow-down"
                            v-if="isButtonLoading == false"
                        ></i>
                        <span>Add Sub-Category</span>
                    </atom-simple-button>
                </div>
            </form>
        </template>
    </molecule-modal>
</template>

<script>
import MoleculeModal from "../molecules/MoleculeModal.vue";
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
import AtomFormGroup from "../atoms/AtomFormGroup.vue";
import AtomInput from "../atoms/AtomInput.vue";
export default {
    components: {
        MoleculeModal,
        AtomSimpleButton,
        AtomButtonLoader,
        AtomFormGroup,
        AtomInput,
    },
    props: [
        "isModalOpen",
        "subCategory",
        "errors",
        "isSlugLoading",
        "isButtonLoading",
    ],
};
</script>

<style>
</style>