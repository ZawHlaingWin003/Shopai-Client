<template>
    <label
        :for="for"
        class="mb-1 inline-block text-sm font-medium text-gray-700"
    >
        <slot /> <span class="text-red-600" v-if="required">*</span>
    </label>
</template>

<script>
export default {
    props: {
        for: String,
        required: Boolean,
    },
};
</script>

<style>
</style>