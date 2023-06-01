<template>
    <div
        class="border border-white bg-white dark:border-soft-dark dark:bg-soft-dark rounded-lg px-12 py-16 flex items-center gap-20"
    >
        <div class="w-full space-y-8 pr-28">
            <h1
                class="text-5xl space-y-2 font-big-title uppercase font-bold text-primary-500"
            >
                <span class="block">We bring</span>
                <span class="block">good things</span>
                <span class="block">to life</span>
            </h1>
            <p class="font-[500]">
                Shopai is a session-less concept store for electronics, clothing
                and accessories. Enablement is what we do so let's start
                shooping.
            </p>
            <div class="space-x-4">
                <atom-link-button :to="{ name: 'products.create' }">
                    <i class="fa-solid fa-cart-arrow-down"></i>
                    <span> Shop Now </span>
                </atom-link-button>
                <atom-link-button :to="{ name: 'products.categories' }">
                    Explore More
                </atom-link-button>
            </div>
        </div>
        <div class="w-full">
            <img src="@/assets/images/home3.svg" alt="" />
        </div>
    </div>
</template>

<script>
import AtomLinkButton from "../../../components/atoms/AtomLinkButton.vue";

export default {
    components: {
        AtomLinkButton,
    },
};
</script>

<style>
</style>