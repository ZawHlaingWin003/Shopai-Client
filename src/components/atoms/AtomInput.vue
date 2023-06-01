<template>
    <input
        class="px-2 py-[10px] rounded-md w-full border-[1.5px] focus:outline-none focus:border-primary-800 transition dark:bg-black dark:border-soft-dark dark:focus:border-primary-900 disabled:bg-gray-200 disabled:border-gray-400 dark:disabled:bg-gray-600"
        :class="{
            'border-red-500 focus:border-red-800 dark:border-red-500 dark:focus:border-red-800':
                hasError,
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script>
import AtomButtonLoader from "./AtomButtonLoader.vue";
export default {
    components: { AtomButtonLoader },
    props: {
        modelValue: {
            default: null,
        },
        hasError: {
            default: false,
        },
    },

    emits: ["update:modelValue"],
};
</script>

<style>
</style>