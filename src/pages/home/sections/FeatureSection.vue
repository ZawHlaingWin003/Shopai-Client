<template>
    <div class="relative my-40">
        <div class="bg-about-us bg-cover bg-center px-0 lg:px-0">
            <div class="cover text-center">
                <div
                    class="w-full h-full bg-black bg-opacity-60 text-white dark:text-primary-200 py-20 lg:py-28 px-4 md:px-10"
                >
                    <h1
                        class="font-big-title text-3xl font-bold mb-4 lg:text-4xl"
                    >
                        Some Features That Made Us Unique
                    </h1>
                    <p>
                        Lately it seems like we're all spending more time doing
                        chores. We provide best customer experiences to help you
                        make tedious tasks easier, less stressful.
                    </p>
                </div>
            </div>
        </div>
        <div
            class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2"
        >
            <div class="flex gap-10 justify-center">
                <div
                    class="rounded flex items-center gap-8 w-80 justify-center py-6 hover:shadow bg-white dark:bg-soft-dark cursor-pointer"
                >
                    <div>
                        <img src="@/assets/images/delivery-van.svg" alt="" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">Free Shipping</h3>
                        <p class="text-primary-400 mt-1">Order Over $200</p>
                    </div>
                </div>
                <div
                    class="rounded flex items-center gap-8 w-80 justify-center py-6 hover:shadow bg-white dark:bg-soft-dark cursor-pointer"
                >
                    <div>
                        <img src="@/assets/images/money-back.svg" alt="" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">Return Policy</h3>
                        <p class="text-primary-400 mt-1">
                            30 Days money return
                        </p>
                    </div>
                </div>
                <div
                    class="rounded flex items-center gap-8 w-80 justify-center py-6 hover:shadow bg-white dark:bg-soft-dark cursor-pointer"
                >
                    <div>
                        <img src="@/assets/images/service-hours.svg" alt="" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">24/7 Support</h3>
                        <p class="text-primary-400 mt-1">Amazing Services</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AtomSectionContainer from "../../../components/atoms/AtomSectionContainer.vue";
export default {
    components: { AtomSectionContainer },
};
</script>

<style>
</style>