<template>
    <molecule-modal :isModalOpen="isModalOpen">
        <template #header>
            <span v-if="isEditMode">Edit Category</span>
            <span v-else>Create Category</span>
        </template>
        <template #default>
            <form
                @submit.prevent="
                    isEditMode ? $emit('updateCategory') : $emit('addCategory')
                "
            >
                <atom-form-group
                    id="name"
                    label="Category Name"
                    :hasError="errors && errors.name"
                >
                    <atom-input
                        type="text"
                        v-model="category.name"
                        id="name"
                        :hasError="errors && errors.name"
                    />
                </atom-form-group>

                <div class="mt-8">
                    <atom-simple-button :disabled="isButtonLoading">
                        <atom-button-loader v-if="isButtonLoading" />
                        <template v-if="isEditMode">
                            <i
                                class="fa-solid fa-pen-to-square"
                                v-if="isButtonLoading == false"
                            ></i>
                            <span>Update Category</span>
                        </template>
                        <template v-else>
                            <i
                                class="fa-solid fa-cart-arrow-down"
                                v-if="isButtonLoading == false"
                            ></i>
                            <span>Add Category</span>
                        </template>
                    </atom-simple-button>
                </div>
            </form>
        </template>
    </molecule-modal>
</template>

<script>
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
import AtomFormGroup from "../atoms/AtomFormGroup.vue";
import AtomInput from "../atoms/AtomInput.vue";
import MoleculeModal from "../molecules/MoleculeModal.vue";
export default {
    components: {
        AtomSimpleButton,
        AtomButtonLoader,
        AtomFormGroup,
        AtomInput,
        MoleculeModal,
    },
    props: [
        "isModalOpen",
        "category",
        "errors",
        "isSlugLoading",
        "isButtonLoading",
        "isEditMode",
    ],
};
</script>

<style scoped>
</style>