<template>
    <div class="border rounded-md p-8 dark:border-soft-dark">
        <div class="header">
            <h1 class="font-big-title font-bold text-lg">
                Personal Information
            </h1>
        </div>
        <div class="my-8">
            <form @submit.prevent="$emit('userInfoUpdate', user)">
                <div class="flex gap-8">
                    <atom-form-group
                        id="username"
                        label="Username"
                        class="w-[50%]"
                    >
                        <atom-input
                            type="text"
                            id="username"
                            v-model="user.name"
                        />
                    </atom-form-group>
                    <atom-form-group
                        id="email"
                        label="Email Address"
                        class="w-[50%]"
                    >
                        <atom-input
                            type="email"
                            id="email"
                            v-model="user.email"
                        />
                    </atom-form-group>
                </div>
                <div class="flex gap-8">
                    <atom-form-group
                        id="dob"
                        label="Date of Birth"
                        class="w-[50%]"
                    >
                        <atom-input type="date" id="dob" v-model="user.dob" />
                    </atom-form-group>
                    <atom-form-group
                        id="phone"
                        label="Phone Number"
                        class="w-[50%]"
                    >
                        <atom-input
                            type="text"
                            id="phone"
                            v-model="user.phone"
                        />
                    </atom-form-group>
                </div>
                <div class="flex gap-8">
                    <atom-form-group id="job" label="Job Title" class="w-[50%]">
                        <atom-input
                            type="text"
                            id="job"
                            v-model="user.job_title"
                        />
                    </atom-form-group>
                    <atom-form-group id="gender" label="Gender" class="w-[50%]">
                        <atom-select-option
                            v-model="user.gender"
                            :options="genders"
                            label="Select Gender"
                        ></atom-select-option>
                    </atom-form-group>
                </div>

                <atom-simple-button :disabled="isButtonLoading">
                    <atom-button-loader v-if="isButtonLoading" />
                    <i class="fa-solid fa-floppy-disk"></i>
                    <span>Save</span>
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
import AtomSelectOption from "../../../components/atoms/AtomSelectOption.vue";

export default {
    components: {
        AtomSimpleButton,
        AtomInput,
        AtomFormGroup,
        AtomButtonLoader,
        AtomTextarea,
        AtomSelectOption,
    },
    props: ["user", "isButtonLoading"],
    data() {
        return {
            updateUser: {},
            genders: [
                {
                    id: "male",
                    name: "Male",
                },
                {
                    id: "female",
                    name: "Female",
                },
                {
                    id: "others",
                    name: "Others",
                },
            ],
        };
    },
};
</script>

<style>
</style>