<template>
    <molecule-auth-card>
        <template #header> Create your free account </template>
        <template #default>
            <p
                class="text-white font-bold p-2 mb-4 border dark:border-soft-dark bg-red-500 rounded"
                v-if="errors && errors.message"
            >
                {{ errors.message[0] }}
            </p>
            <form @submit.prevent="$emit('register')">
                <atom-form-group
                    id="name"
                    label="Username"
                    :hasError="errors && errors.name"
                >
                    <atom-input
                        type="text"
                        id="name"
                        v-model="user.name"
                        :hasError="errors && errors.name"
                    />
                </atom-form-group>
                <atom-form-group
                    id="email"
                    label="Email"
                    :hasError="errors && errors.email"
                >
                    <atom-input
                        type="email"
                        v-model="user.email"
                        id="email"
                        :hasError="errors && errors.email"
                    />
                </atom-form-group>
                <atom-form-group
                    id="phone"
                    label="Phone Number"
                    :hasError="errors && errors.phone"
                >
                    <atom-input
                        type="text"
                        v-model="user.phone"
                        id="phone"
                        :hasError="errors && errors.phone"
                    />
                </atom-form-group>

                <atom-form-group
                    id="password"
                    label="Password"
                    :hasError="errors && errors.password"
                >
                    <molecule-password-input
                        id="password"
                        v-model="user.password"
                        :hasError="errors && errors.password"
                    />
                </atom-form-group>
                <atom-form-group
                    id="password_confirmation"
                    label="Confirm Password"
                    :hasError="errors && errors.password_confirmation"
                >
                    <molecule-password-input
                        id="password_confirmation"
                        v-model="user.password_confirmation"
                    />
                </atom-form-group>

                <div class="flex justify-between items-center mb-8">
                    <atom-checkbox v-model="user.agree_terms" id="agree_terms">
                        I accept the Terms and Conditions
                    </atom-checkbox>
                </div>
                <atom-simple-button
                    :disabled="isButtonLoading"
                    class="block w-full justify-center"
                >
                    <atom-button-loader v-if="isButtonLoading" />
                    <i
                        class="fa-solid fa-right-to-bracket"
                        v-if="isButtonLoading == false"
                    ></i>
                    <span>Register</span>
                </atom-simple-button>
            </form>
        </template>
        <template #footer>
            Already have an account?
            <atom-link
                to="/login"
                label="Sign In Here"
                class="block lg:inline"
            />
        </template>
    </molecule-auth-card>
</template>

<script>
import AtomLink from "../atoms/AtomLink.vue";
import AtomInput from "../atoms/AtomInput.vue";
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import MoleculeAuthCard from "../molecules/MoleculeAuthCard.vue";
import MoleculePasswordInput from "../molecules/MoleculePasswordInput.vue";
import AtomCheckbox from "../atoms/AtomCheckbox.vue";
import AtomFormGroup from "../atoms/AtomFormGroup.vue";
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
export default {
    components: {
        MoleculeAuthCard,
        AtomLink,
        AtomInput,
        AtomSimpleButton,
        MoleculePasswordInput,
        AtomCheckbox,
        AtomFormGroup,
        AtomButtonLoader,
    },
    props: ["user", "errors", "isButtonLoading"],
    data() {
        return {};
    },
};
</script>

<style>
</style>