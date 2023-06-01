<template>
    <atom-section-container class="py-16 mx-auto text-center">
        <div class="flex justify-center">
            <img src="@/assets/images/404.svg" alt="" />
        </div>
        <div>
            <atom-link-button to="/" class="my-8">
                Go Back To Home Page
            </atom-link-button>
        </div>
    </atom-section-container>
</template>

<script>
import AtomLinkButton from "../../components/atoms/AtomLinkButton.vue";
import AtomSectionContainer from "../../components/atoms/AtomSectionContainer.vue";
import AtomSimpleButton from "../../components/atoms/AtomSimpleButton.vue";
export default {
    components: {
        AtomSectionContainer,
        AtomSimpleButton,
        AtomLinkButton,
    },
};
</script>

<style>
</style>
