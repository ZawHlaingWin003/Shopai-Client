<template>
    <atom-section-container>
        <nav class="py-4">
            <div
                class="container flex flex-wrap items-center justify-between relative"
            >
                <div class="md:hidden">
                    <router-link to="/">
                        <atom-logo />
                    </router-link>
                </div>
                <div class="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <div
                        class="relative after:absolute after:content-[''] after:w-[180%] after:h-[180%] after:bg-light dark:after:bg-dark after:top-0 after:left-1/2 after:-translate-x-1/2 after:rounded-full after:-z-10"
                    >
                        <router-link to="/">
                            <atom-logo />
                        </router-link>
                    </div>
                </div>
                <div
                    class="flex items-center gap-2 md:gap-4 lg:gap-8 lg:order-3 relative py-2"
                >
                    <template v-if="isAuthenticated">
                        <molecule-cart-dropdown
                            @removeCartProduct="removeCartProduct"
                        />
                        <molecule-profile-dropdown
                            :user="user"
                            @logout="$emit('logout')"
                            @switchTheme="$emit('switchTheme')"
                            :isDarkTheme="isDarkTheme"
                            :isProfileLoading="isProfileLoading"
                            :isLogoutButtonLoading="isLogoutButtonLoading"
                        />
                    </template>
                    <template v-else>
                        <atom-link-button :to="{ name: 'login' }">
                            <span>Login</span>
                            <i class="fa-solid fa-right-to-bracket"></i>
                        </atom-link-button>
                    </template>

                    <button
                        class="p-1 rounded-md ring-2 ring-primary-500 ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
                        ref="button"
                        :class="{
                            'ring-primary-500': showMobileNav,
                        }"
                        @click="toggleMobileNav"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div
                    class="w-full bg-soft-light relative rounded-lg mt-4 lg:m-0 lg:w-auto dark:bg-black transition duration-500 opacity-0 -translate-y-80"
                    ref="dropdown"
                    :class="{
                        'opacity-100 translate-y-0': showMobileNav,
                    }"
                >
                    <ul
                        class="flex flex-col lg:flex-row px-4 py-2 space-x-0 space-y-2 lg:space-y-0 lg:space-x-4"
                    >
                        <li>
                            <router-link
                                :to="{ name: 'home' }"
                                class="nav-link-item block py-2 pl-3 pr-4 hover:bg-primary-700 hover:text-white rounded-md active:bg-primary-600"
                            >
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/books"
                                class="nav-link-item block py-2 pl-3 pr-4 hover:bg-primary-700 hover:text-white rounded-md active:bg-primary-600"
                            >
                                Blogs
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/authors"
                                class="nav-link-item block py-2 pl-3 pr-4 hover:bg-primary-700 hover:text-white rounded-md active:bg-primary-600"
                            >
                                Arrivals
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :to="{
                                    name: 'products.index',
                                    query: {
                                        search: $route.query.search,
                                        category: $route.query.search,
                                        sub_category: $route.query.search,
                                    },
                                }"
                                class="nav-link-item block py-2 pl-3 pr-4 hover:bg-primary-700 hover:text-white rounded-md active:bg-primary-600"
                            >
                                Shopai
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors";
import AtomLinkButton from "../atoms/AtomLinkButton.vue";
import AtomLogo from "../atoms/AtomLogo.vue";
import AtomSectionContainer from "../atoms/AtomSectionContainer.vue";
import MoleculeCartDropdown from "../molecules/MoleculeCartDropdown.vue";
import MoleculeProfileDropdown from "../molecules/MoleculeProfileDropdown.vue";
export default {
    components: {
        AtomLogo,
        AtomLinkButton,
        MoleculeProfileDropdown,
        AtomSectionContainer,
        MoleculeCartDropdown,
    },
    mounted() {
        window.addEventListener("click", this.closeDropdown);
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
    beforeUnmount() {
        window.removeEventListener("click", this.closeDropdown);
        window.removeEventListener("resize", this.handleResize);
    },
    data() {
        return {
            window: {
                width: 0,
                height: 0,
            },
            showMobileNav: true,
        };
    },
    props: [
        "user",
        "isAuthenticated",
        "isDarkTheme",
        "isLogoutButtonLoading",
        "isProfileLoading",
    ],
    methods: {
        removeCartProduct(product) {
            this.$emit("removeCartProduct", product);
        },
        closeDropdown(event) {
            if (this.window.width < 769) {
                // If the user clicks inside the dropdown, don't close it, but clicks outside of it, close it.
                if (
                    !this.$refs.dropdown.contains(event.target) &&
                    !this.$refs.button.contains(event.target)
                ) {
                    this.showMobileNav = false;
                }
            }
        },
        toggleMobileNav() {
            this.showMobileNav = !this.showMobileNav;
        },

        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
    },
};
</script>

<style>
</style>