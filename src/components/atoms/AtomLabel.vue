<template>
    <label :for="id">
        <slot />
    </label>
</template>

<script>
export default {
    props: {
        id: String,
    },
};
</script>

<style>
</style>