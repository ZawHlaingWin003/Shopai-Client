<template>
    <div
        class="flex flex-wrap gap-2 font-title border shadow p-4 rounded-md dark:border-black dark:hover:border-primary-900 transition"
        :class="{
            'items-center justify-center': isTagBoxLoading,
        }"
    >
        <template v-if="isTagBoxLoading">
            <atom-button-loader />
        </template>
        <template v-else>
            <button
                class="px-2 py-1 text-sm rounded shadow hover:bg-primary-500 hover:text-white focus:outline-none active:bg-primary-600 transition dark:bg-black dark:hover:bg-primary-500 dark:active:bg-primary-600"
                @click="$emit('filterBySubCategory', '')"
            >
                <span>
                    All
                </span>
            </button>
            <button
                class="px-2 py-1 text-sm rounded shadow hover:bg-primary-500 hover:text-white focus:outline-none active:bg-primary-600 transition dark:bg-black dark:hover:bg-primary-500 dark:active:bg-primary-600"
                v-for="tag in tags"
                :key="tag.slug"
                @click="$emit('filterBySubCategory', tag.slug)"
                :class="{
                    'bg-primary-500 dark:bg-primary-500 text-white':
                        selectedSubCategory === tag.slug,
                    'bg-white': selectedSubCategory !== tag.slug,
                }"
            >
                <span>
                    {{ tag.name }}
                </span>
            </button>
        </template>
    </div>
</template>

<script>
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
export default {
    components: { AtomButtonLoader },
    props: {
        tags: {
            type: Array,
        },
        isTagBoxLoading: {
            type: Boolean,
        },
        selectedSubCategory: {
            type: String,
        },
    },
    methods: {},
};
</script>

<style>
</style>