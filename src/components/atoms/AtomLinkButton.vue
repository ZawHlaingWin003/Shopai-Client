<template>
    <router-link
        class="inline-block rounded-md px-4 py-2 cursor-pointer shadow-sm text-white disabled:bg-gray-500 disabled:border-0 disabled:text-gray-100 transition delay-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-light dark:focus:ring-offset-black"
        :class="{
            'bg-primary-500 border-primary-600 hover:bg-primary-400 focus:ring-primary-500 active:bg-primary-500':
                theme == 'default',
            'bg-green-600 border-green-800 hover:bg-green-500 focus:ring-green-600 active:bg-green-600':
                theme == 'success',
            'bg-red-600 border-red-800 hover:bg-red-500 focus:ring-red-600 active:bg-red-600':
                theme == 'danger',
        }"
    >
        <span class="flex items-center gap-2">
            <slot />
        </span>
    </router-link>
</template>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: "default",
        },
    },
};
</script>

<style>
</style>