<template>
    <select
        class="p-2 rounded-md w-full border focus:outline-none focus:border-primary-800 dark:bg-black dark:border-soft-dark dark:focus:border-primary-900 disabled:bg-gray-200 disabled:border-gray-400 disabled:dark:bg-gray-600"
        :class="{
            'border-red-500 focus:border-red-800 dark:border-red-500 dark:focus:border-red-800':
                hasError,
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <option value="">{{ label }}</option>
        <option v-for="option in options" :key="option.id" :value="option.id">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    props: ["modelValue", "hasError", "label", "options"],
    emits: ["update:modelValue"],
};
</script>

<style>
</style>