<template>
    <div class="relative flex items-center justify-between">
        <div
            class="absolute left-6 top-1/2 -translate-y-1/2 text-[1.1rem] text-primary-500"
        >
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <input
            id="name"
            placeholder="Search Here ..."
            class="pl-16 pr-28 py-4 rounded-md w-full border dark:bg-black dark:border-soft-dark focus:outline-none focus:border-primary-500 dark:focus:border-primary-900 font-title text-[1.2rem]"
            :value="modelValue"
            @input="
                (e) => {
                    $emit('update:modelValue', e.target.value);
                    if (e.target.value.length) {
                        isShowClearText = true;
                    } else {
                        isShowClearText = false;
                    }
                }
            "
        />
        <button
            v-if="isShowClearText"
            @click="
                {
                    modelValue = '';
                    $emit('update:modelValue', '');
                    isShowClearText = false;
                }
            "
            class="absolute right-8 top-1/2 -translate-y-1/2 text-[1.2rem] text-soft-dark hover:text-pink-500 transition p-2 dark:hover:text-primary-900"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>
        <!-- <atom-simple-button class="absolute right-2">Search</atom-simple-button> -->
    </div>
</template>

<script>
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
export default {
    components: {
        AtomSimpleButton,
    },
    props: ["modelValue"],

    emits: ["update:modelValue"],

    data() {
        return {
            isShowClearText: false,
        };
    },
};
</script>

<style>
</style>