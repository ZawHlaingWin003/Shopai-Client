<template>
    <div class="border rounded-md p-8 dark:border-soft-dark">
        <div class="header">
            <h1 class="font-big-title font-bold text-lg">Change Password</h1>
        </div>
        <div class="my-8">
            <form @submit.prevent="$emit('changePassword')">
                <atom-form-group
                    id="old_password"
                    label="Old Password"
                    :hasError="errors && errors.old_password"
                >
                    <atom-input
                        type="text"
                        id="old_password"
                        v-model="password.old_password"
                        :hasError="errors && errors.old_password"
                    />
                </atom-form-group>
                <atom-form-group
                    id="password"
                    label="New Password"
                    :hasError="errors && errors.password"
                >
                    <atom-input
                        type="text"
                        id="password"
                        v-model="password.password"
                        :hasError="errors && errors.password"
                    />
                </atom-form-group>
                <atom-form-group
                    id="password_confirmation"
                    label="Confirm Password"
                >
                    <atom-input
                        type="text"
                        id="password_confirmation"
                        v-model="password.password_confirmation"
                    />
                </atom-form-group>

                <atom-simple-button :disabled="isButtonLoading">
                    <atom-button-loader v-if="isButtonLoading" />
                    <i class="fa-solid fa-floppy-disk" v-else></i>
                    <span>Update</span>
                </atom-simple-button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "@/axios-interceptors.js";

import AtomSimpleButton from "@/components/atoms/AtomSimpleButton.vue";
import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomFormGroup from "@/components/atoms/AtomFormGroup.vue";
import AtomButtonLoader from "@/components/atoms/AtomButtonLoader.vue";
import AtomTextarea from "@/components/atoms/AtomTextarea.vue";

export default {
    components: {
        AtomSimpleButton,
        AtomInput,
        AtomFormGroup,
        AtomButtonLoader,
        AtomTextarea,
    },
    props: ["password", "errors", "isButtonLoading"],

    data() {
        return {};
    },
    methods: {},
};
</script>

<style>
</style>