<template>
    <div class="relative flex rounded-md shadow-sm">
        <div
            class="relative border-r-1 border-gray-300 cursor-pointer dark:border-primary-300"
            ref="searchDropdown"
        >
            <div
                class="bg-white py-4 px-4 md:px-8 flex items-center gap-10 rounded-l-md border active:bg-slate-100 dark:bg-black dark:active:bg-soft-dark whitespace-nowrap dark:border-soft-dark"
                :class="{
                    'border-primary-500 dark:border-primary-500':
                        isDropdownOpen,
                }"
                @click="isDropdownOpen = !isDropdownOpen"
            >
                <span>
                    <template v-if="!selectedOption"> All </template>
                    <template v-else>
                        <template v-for="option in options">
                            <template v-if="selectedOption == option.slug">
                                {{ option.name }}
                            </template>
                        </template>
                    </template>
                </span>
                <span class="text-primary-500"
                    ><i class="fa-solid fa-caret-down"></i
                ></span>
            </div>
            <ul
                class="absolute z-10 rounded-md top-[110%] px-2 py-2 shadow-sm bg-primary-400 text-light select-none min-w-full dark:bg-black transition scale-0 opacity-0 origin-top-left duration-300"
                :class="{
                    'scale-100 opacity-100': isDropdownOpen,
                }"
            >
                <li @click="filterByCategory('')">
                    <a
                        class="p-2 md:px-6 rounded-md block hover:bg-primary-300 whitespace-nowrap dark:hover:bg-primary-500"
                    >
                        All
                    </a>
                </li>

                <li
                    class=""
                    v-for="option in options"
                    :key="option.id"
                    @click="filterByCategory(option.slug)"
                >
                    <a
                        class="p-2 md:px-6 rounded-md block hover:bg-primary-300 whitespace-nowrap dark:hover:bg-primary-500"
                    >
                        {{ option.name }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="search_input relative w-full">
            <input
                type="text"
                placeholder="Search Here ..."
                class="w-full h-full pr-12 pl-4 md:pl-8 md:pr-20 rounded-r-md border focus:outline-none focus:border-primary-500 dark:bg-black dark:border-soft-dark dark:focus:border-primary-500"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @change="$emit('searchProduct', modelValue)"
            />
            <span
                class="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 text-[1.2rem] text-primary-500 cursor-pointer"
            >
                <i class="fas fa-search"></i>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            required: true,
        },
        modelValue: {
            type: String,
        },
        selectedOption: {
            type: String,
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
            isDropdownOpen: false,
        };
    },

    methods: {
        filterByCategory(slug) {
            this.$emit("filterByCategory", slug);
            this.isDropdownOpen = !this.isDropdownOpen;
        },

        closeDropdown(event) {
            if (!this.$refs.searchDropdown.contains(event.target)) {
                this.isDropdownOpen = false;
            }
        },
    },
};
</script>

<style>
</style>