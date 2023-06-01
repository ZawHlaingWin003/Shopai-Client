<template>
    <div class="relative w-fit">
        <button
            class="bg-primary-600 active:opacity-80 text-light flex items-center gap-2 shadow-sm p-1 rounded-full md:px-4 md:py-2 md:rounded-md text-sm dark:bg-black"
            @click="isProfileDropdownOpen = !isProfileDropdownOpen"
        >
            <template v-if="isProfileLoading">
                <atom-button-loader />
            </template>
            <template v-else>
                <p class="hidden md:block">{{ user.name }}</p>
                <img
                    :src="user.avatar?.filepath"
                    alt="Profile"
                    class="w-8 h-8 rounded-full object-cover"
                />
            </template>
        </button>
        <div
            class="bg-primary-600 text-light rounded-md shadow-md absolute z-10 right-0 top-[115%] px-4 py-2 divide-y-2 divide-gray-400 divide-opacity-30 space-y-2 dark:bg-black scale-0 transition duration-200 opacity-0 origin-top-right"
            :class="{
                'scale-100 opacity-100': isProfileDropdownOpen,
            }"
        >
            <div
                class="py-2 px-4 hover:bg-primary-500 rounded-md cursor-pointer dark:hover:bg-soft-dark"
            >
                <div class="flex items-center">
                    <img
                        :src="user.avatar?.filepath"
                        alt="Profile"
                        class="w-12 h-12 rounded-full object-cover"
                    />
                    <div class="pl-4 pr-10 text-sm">
                        <p class="font-bold">{{ user.name }}</p>
                        <span class="text-sm">{{ user.email }}</span>
                    </div>
                </div>
            </div>
            <div class="pt-2">
                <button
                    class="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-primary-500 transition whitespace-nowrap w-full dark:hover:bg-soft-dark"
                    @click="
                        {
                            $emit('switchTheme');
                            isProfileDropdownOpen = false;
                        }
                    "
                >
                    <div
                        class="bg-primary-900 flex items-center justify-center w-8 h-8 rounded-full"
                    >
                        <i class="fa-solid fa-moon" v-if="isDarkTheme"></i>
                        <i class="fa-solid fa-sun" v-else></i>
                    </div>
                    <p class="ml-2 text-[0.8rem]">
                        Toggle Theme (
                        <template v-if="isDarkTheme">Dark</template>
                        <template v-else>Light</template>
                        )
                    </p>
                </button>
            </div>
            <div class="pt-2">
                <router-link
                    :to="{
                        name: 'user.profile',
                    }"
                    class="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-primary-500 transition whitespace-nowrap dark:hover:bg-soft-dark"
                >
                    <div
                        class="bg-primary-900 flex items-center justify-center w-8 h-8 rounded-full"
                    >
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <span class="ml-2 text-[0.8rem]">My Account</span>
                </router-link>
                <router-link
                    to="/cr"
                    class="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-primary-500 transition whitespace-nowrap dark:hover:bg-soft-dark"
                >
                    <div
                        class="bg-primary-900 flex items-center justify-center w-8 h-8 rounded-full"
                    >
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <span class="ml-2 text-[0.8rem]">Inbox</span>
                </router-link>
                <router-link
                    to="/eb"
                    class="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-primary-500 transition whitespace-nowrap dark:hover:bg-soft-dark"
                >
                    <div
                        class="bg-primary-900 flex items-center justify-center w-8 h-8 rounded-full"
                    >
                        <i class="fa-solid fa-gear"></i>
                    </div>
                    <span class="ml-2 text-[0.8rem]">Settings & Privacy</span>
                </router-link>
            </div>
            <div class="pt-2">
                <a
                    class="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-primary-500 transition cursor-pointer dark:hover:bg-soft-dark"
                    @click.prevent="logout"
                >
                    <div
                        class="bg-primary-900 flex items-center justify-center w-8 h-8 rounded-full"
                    >
                        <atom-button-loader v-if="isLogoutButtonLoading" />
                        <i
                            class="fa-solid fa-power-off"
                            v-if="isLogoutButtonLoading == false"
                        ></i>
                    </div>
                    <span class="ml-2 text-[0.8rem]">Logout</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
export default {
    components: { AtomButtonLoader },
    props: {
        user: {
            type: Object,
        },
        isDarkTheme: {
            type: Boolean,
        },
        isLogoutButtonLoading: {
            typ: Boolean,
        },
        isProfileLoading: {
            typ: Boolean,
        },
    },
    mounted() {
        window.addEventListener("click", this.closeDropdown);
    },
    beforeUnmount() {
        window.removeEventListener("click", this.closeDropdown);
    },
    data() {
        return {
            isProfileDropdownOpen: false,
        };
    },

    methods: {
        closeDropdown(event) {
            // If the user clicks inside the dropdown, don't close it, but clicks outside of it, close it.
            if (!this.$el.contains(event.target)) {
                this.isProfileDropdownOpen = false;
            }
        },
        logout() {
            if (this.isLogoutButtonLoading) {
                return false;
            } else {
                this.$emit("logout");
            }
        },
    },
};
</script>

<style>
</style>