<template>
    <div>
        <atom-section-container class="py-20">
            <div class="header">
                <h1 class="font-big-title font-bold text-2xl">
                    Account Settings
                </h1>
            </div>
            <div
                class="my-8 bg-white text-soft-dark rounded-md p-8 dark:bg-black dark:text-light"
            >
                <div class="flex gap-10">
                    <div
                        class="border py-4 px-8 whitespace-nowrap w-[30%] h-max dark:border-soft-dark"
                    >
                        <ul class="space-y-6 mb-20">
                            <li
                                v-for="tab in tabs"
                                :key="tab.name"
                                :class="[
                                    'border rounded-md p-2 hover:bg-primary-500 hover:text-white cursor-pointer transition-all active:bg-primary-600 dark:border-soft-dark',
                                    {
                                        'bg-primary-700 text-white':
                                            currentTab === tab.component,
                                    },
                                ]"
                                @click="currentTab = tab.component"
                            >
                                {{ tab.name }}
                            </li>
                        </ul>
                        <atom-simple-button
                            :disabled="isDeleteButtonLoading"
                            theme="danger"
                        >
                            <atom-button-loader v-if="isDeleteButtonLoading" />
                            <i
                                class="fa-solid fa-triangle-exclamation"
                                v-else
                            ></i>
                            <span>Delete Account</span>
                        </atom-simple-button>
                    </div>
                    <div class="border w-[70%] h-max dark:border-soft-dark">
                        <template v-if="isTabBoxLoading">
                            <atom-big-loader />
                        </template>
                        <template v-else>
                            <div>
                                <div class="body py-4 px-4 space-y-6">
                                    <div
                                        class="flex items-center gap-8 border rounded-md p-8 dark:border-soft-dark relative"
                                    >
                                        <div>
                                            <img
                                                :src="user.avatar?.filepath"
                                                alt=""
                                                class="w-20 h-20 rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p class="text-[1.1rem] font-bold">
                                                {{ user.name }}
                                            </p>
                                            <p class="mt-1">
                                                {{ user.email }}
                                            </p>
                                        </div>
                                        <p
                                            class="absolute right-1 bottom-1 text-xs text-red-500"
                                        >
                                            ** Don't forget to save on every
                                            changes!
                                        </p>
                                    </div>
                                    <transition name="zoom">
                                        <component
                                            :is="currentTab"
                                            class="tab"
                                            :user="user"
                                            :user_address="user_address"
                                            :password="password"
                                            :isButtonLoading="isButtonLoading"
                                            @changePassword="changePassword"
                                            @userInfoUpdate="userInfoUpdate"
                                            @userAddressUpdate="
                                                userAddressUpdate
                                            "
                                        ></component>
                                    </transition>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </atom-section-container>
    </div>
</template>

<script>
import axios from "@/axios-interceptors.js";
import AtomSectionContainer from "../../components/atoms/AtomSectionContainer.vue";
import AtomSimpleButton from "@/components/atoms/AtomSimpleButton.vue";
import AtomButtonLoader from "@/components/atoms/AtomButtonLoader.vue";

import PersonalInformation from "./section/PersonalInformation.vue";
import ChangePassword from "./section/ChangePassword.vue";
import UserAddress from "./section/UserAddress.vue";
import AtomBigLoader from "../../components/atoms/AtomBigLoader.vue";
export default {
    components: {
        AtomSectionContainer,
        AtomSimpleButton,
        AtomButtonLoader,
        PersonalInformation,
        ChangePassword,
        UserAddress,
        AtomBigLoader,
    },
    mounted() {
        this.getAuthenticatedUser();
    },
    data() {
        return {
            currentTab: "PersonalInformation",
            tabs: [
                {
                    name: "Personal Information",
                    component: "PersonalInformation",
                },
                {
                    name: "Address",
                    component: "UserAddress",
                },
                {
                    name: "Change Password",
                    component: "ChangePassword",
                },
            ],

            user: {},
            user_address: {
                region_id: '',
                district_id: '',
                township_id: '',
                address: '',
                zip_code: '',
            },
            errors: null,

            password: {
                old_password: "",
                password: "",
                password_confirmation: "",
            },

            isTabBoxLoading: false,
            isButtonLoading: false,
            isDeleteButtonLoading: false,
        };
    },
    methods: {
        async getAuthenticatedUser() {
            this.isTabBoxLoading = true;
            await axios.get("/api/user").then((response) => {
                this.user = response.data.user;
                this.user_address.region_id = response.data.user.user_address.region_id;
                this.user_address.district_id = response.data.user.user_address.district_id;
                this.user_address.township_id = response.data.user.user_address.township_id;
                this.user_address.address = response.data.user.user_address.address;
                this.user_address.zip_code = response.data.user.user_address.zip_code;
                this.isTabBoxLoading = false;
            });
        },

        async userInfoUpdate() {
            this.isButtonLoading = true;
            await axios
                .post("/api/profile/update/user-info", this.user)
                .then((response) => {
                    this.isButtonLoading = false;
                    this.getAuthenticatedUser();
                    this.$emit("updatedAuthenticatedUser");
                });
        },

        async userAddressUpdate() {
            this.isButtonLoading = true;
            await axios
                .post("/api/profile/update/user-address", this.user_address)
                .then((response) => {
                    console.log("User Address", response)
                    this.isButtonLoading = false;
                    this.getAuthenticatedUser();
                });
        },

        async changePassword() {
            this.isButtonLoading = true;
            await axios
                .post("/api/profile/update/user-password", this.password)
                .then((response) => {
                    this.getAuthenticatedUser();
                })
                .catch((error) => {
                    console.log("Password error", error);
                    if ((error.response.status = 422)) {
                        this.errors = error.response.data.errors
                            ? error.response.data.errors
                            : error.response.data;
                    }
                })
                .finally(() => {
                    this.isButtonLoading = false;
                });
        },
    },
    computed: {},
};
</script>

<style>
/* .fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    scale: 0;
    opacity: 0;
} */
.zoom-enter-active,
.zoom-leave-active {
    transition: transform 0.5s;
}

.zoom-enter,
.zoom-leave-to {
    transform: scale(0);
}

.zoom-enter-to,
.zoom-leave {
    transform: scale(1);
}
</style>