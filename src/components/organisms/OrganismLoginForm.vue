<template>
    <molecule-auth-card>
        <template #header> Sign in to your account </template>
        <template #default>
            <p
                class="text-white font-bold p-2 mb-4 border dark:border-soft-dark bg-red-500 rounded"
                v-if="errors && errors.message"
            >
                {{ errors.message[0] }}
            </p>
            <form @submit.prevent="$emit('login')">
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

                <div class="flex justify-between items-center mb-4 md:mb-8">
                    <atom-checkbox v-model="user.remember_me" id="remember_me">
                        Remember Me
                    </atom-checkbox>
                    <div>
                        <atom-link
                            to="/forget-password"
                            label="Forget Password?"
                        />
                    </div>
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
                    <span>Login</span>
                </atom-simple-button>
            </form>
        </template>
        <template #footer>
            Don't have an account?
            <atom-link
                to="/register"
                label="Create Account"
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
    methods: {},
};
</script>

<style>
</style>