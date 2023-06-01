<template>
    <div class="relative flex items-center justify-between">
        <input
            id="name"
            placeholder="Enter Your Email ..."
            class="pl-4 pr-28 py-3 rounded-md w-full border text-dark dark:bg-black dark:border-soft-dark focus:outline-none dark:text-white"
            :value="modelValue"
            @input="
                (e) => {
                    $emit('update:modelValue', e.target.value);
                }
            "
        />
        <atom-simple-button class="absolute right-2">
            <i class="fa-solid fa-bell"></i>
            <span>Subscribe</span>
        </atom-simple-button>
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
        return {};
    },
};
</script>

<style>
</style>