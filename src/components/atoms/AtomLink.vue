<template>
    <router-link
        class="text-sm text-primary-600 underline hover:text-primary-500"
    >
        {{ label }}
    </router-link>
</template>

<script>
export default {
    props: ["label"],
};
</script>

<style>
</style>