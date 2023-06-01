<template>
    <div class="my-40">
        <div class="bg-discount bg-cover bg-center relative">
            <div
                class="flex items-center w-full h-full bg-black bg-opacity-30 py-10 px-52"
            >
                <div class="w-full text-light">
                    <h1
                        class="text-5xl font-big-title font-bold text-primary-400"
                    >
                        Get 5% Cash Back
                    </h1>
                    <p class="mt-2 mb-6 tracking-wider">
                        on <span class="font-bold">Shopai.com</span>. Save to
                        5%. Pass or Smash 🤑.
                    </p>
                    <atom-simple-button>
                        <span>Learn More</span>
                        <i class="fa-solid fa-circle-arrow-right"></i>
                    </atom-simple-button>
                </div>
                <div>
                    <img src="@/assets/images/cards.png" alt="" />
                </div>
            </div>
            <div class="absolute top-4 left-4">
                <div
                    class="rounded-full flex flex-col items-center justify-center w-20 h-20 bg-primary-700 text-white"
                >
                    <span class="font-big-title font-bold text-xl">5 %</span>
                    <span class="tracking-wider font-bold">off</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AtomSimpleButton from "../../../components/atoms/AtomSimpleButton.vue";
export default {
    components: {
        AtomSimpleButton,
    },
};
</script>

<style>
</style>
