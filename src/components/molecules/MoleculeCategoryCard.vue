<template>
    <div
        class="border rounded hover:shadow py-2 px-6 group/item dark:border-soft-dark"
    >
        <h1
            class="py-2 text-[1.2rem] border-b-2 flex items-center justify-between group dark:border-b-soft-dark"
        >
            <div
                class="font-bold text-primary-500 hover:text-primary-700 cursor-pointer"
            >
                {{ category.name }}
            </div>
            <div
                class="space-x-2 opacity-0 flex transition group-hover/item:opacity-100 text-lg w-fit"
            >
                <span
                    class="border px-2 py-1 rounded hover:shadow text-green-500 hover:text-green-600 cursor-pointer dark:border-soft-dark flex items-center"
                    @click="$emit('openEditCategoryModal', category.slug)"
                >
                    <atom-button-loader v-if="isButtonLoading" />
                    <i
                        class="fa-solid fa-pen-to-square"
                        v-if="isButtonLoading == false"
                    ></i>
                </span>
                <span
                    class="border px-2 py-1 rounded hover:shadow text-red-500 hover:text-red-600 cursor-pointer dark:border-soft-dark"
                    @click="$emit('deleteCategory', category)"
                >
                    <i class="fa-solid fa-trash"></i>
                </span>
            </div>
        </h1>
        <ul class="flex flex-wrap gap-2 my-4">
            <li
                v-for="subCategory in subCategories"
                :key="subCategory.id"
                class="border rounded p-2 relative cursor-pointer group dark:border-soft-dark"
            >
                <span>
                    {{ subCategory.name }}
                </span>
                <span
                    class="absolute inset-0 scale-0 flex items-center justify-center transition text-light rounded group-hover:scale-100 group-hover:bg-red-500"
                    @click="$emit('deleteSubCategory', subCategory)"
                >
                    <i class="fa-solid fa-trash"></i>
                </span>
            </li>
            <li
                class="border rounded px-8 py-2 relative cursor-pointer hover:bg-primary-300 dark:border-soft-dark dark:hover:bg-primary-500"
                @click="$emit('openSubCategoryModal', category)"
            >
                <span>
                    <i class="fa-solid fa-square-plus"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
export default {
    components: { AtomButtonLoader },
    props: ["category", "subCategories", "isButtonLoading"],
    methods: {},
};
</script>

<style>
</style>