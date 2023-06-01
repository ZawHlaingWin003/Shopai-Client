<template>
    <div class="mt-32">
        <div
            class="flex items-center justify-between px-20 py-8 bg-primary-700 text-white dark:bg-primary-900"
        >
            <div class="flex items-center gap-4 w-[30%]">
                <img
                    src="@/assets/images/icon-email.svg"
                    alt=""
                    class="w-12 h-12"
                />
                <h3 class="text-xl font-bold">Sing up to Newsletter</h3>
            </div>
            <div class="w-[35%]">
                <p class="tracking-wider">
                    ... and receive $25 coupon for first shopping.
                </p>
            </div>
            <div class="w-[35%]">
                <molecule-subscribe-form />
            </div>
        </div>
    </div>
</template>

<script>
import MoleculeSearchForm from "../../../components/molecules/MoleculeSearchForm.vue";
import MoleculeSubscribeForm from "../../../components/molecules/MoleculeSubscribeForm.vue";
export default {
    components: { MoleculeSearchForm, MoleculeSubscribeForm },
};
</script>

<style>
</style>