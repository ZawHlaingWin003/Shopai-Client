<template>
    <atom-section-container class="py-16">
        <molecule-auth-card class="lg:w-1/2">
            <template #header> Forget Password </template>
            <template #default>
                <p
                    class="text-white font-bold p-2 mb-4 border bg-red-500 rounded"
                    v-if="errors.message"
                >
                    {{ errors.message[0] }}
                </p>
                <form @submit.prevent="userLogin">
                    <atom-form-group>
                        <atom-input
                            type="email"
                            id="email"
                            label="Email"
                            v-model="user.email"
                            :hasError="errors.email"
                        />
                    </atom-form-group>
                    <atom-simple-button :disabled="isButtonLoading">
                        <i
                            class="fa-solid fa-right-to-bracket"
                            v-if="isButtonLoading == false"
                        ></i>
                        <span>Login</span>
                    </atom-simple-button>
                </form>
            </template>
            <template #footer>
                Go Back To
                <atom-link to="/login" label="Login Page?" />
            </template>
        </molecule-auth-card>
    </atom-section-container>
</template>

<script>
import AtomLink from "@/components/atoms/AtomLink.vue";
import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomSimpleButton from "@/components/atoms/AtomSimpleButton.vue";
import MoleculeAuthCard from "@/components/molecules/MoleculeAuthCard.vue";
import MoleculePasswordInput from "@/components/molecules/MoleculePasswordInput.vue";
import AtomCheckbox from "@/components/atoms/AtomCheckbox.vue";
import AtomFormGroup from "@/components/atoms/AtomFormGroup.vue";
import AtomSectionContainer from "@/components/atoms/AtomSectionContainer.vue";
export default {
    components: {
        MoleculeAuthCard,
        AtomLink,
        AtomInput,
        AtomSimpleButton,
        MoleculePasswordInput,
        AtomCheckbox,
        AtomFormGroup,
        AtomSectionContainer,
    },
    data() {
        return {
            user: {
                email: "",
            },
            isButtonLoading: false,

            errors: {},
        };
    },
};
</script>

<style>
</style>