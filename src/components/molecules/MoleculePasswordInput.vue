<template>
    <div class="relative w-full">
        <atom-input
            :type="showPassword ? 'text' : 'password'"
            :id="id"
            :hasError="hasError"
            :modelValue="modelValue"
            @input="(e) => $emit('update:modelValue', e.target.value)"
        />
        <span
            class="absolute top-0 right-0 h-full w-12 flex items-center justify-center border-l-1 rounded-r-md bg-primary-400 hover:bg-primary-500 cursor-pointer text-white"
            @click="showPassword = !showPassword"
            ><i
                class="fa-solid"
                :class="{
                    'fa-eye': showPassword,
                    'fa-eye-slash': !showPassword,
                }"
            ></i
        ></span>
    </div>
</template>

<script>
import AtomInput from "../atoms/AtomInput.vue";
export default {
    components: { AtomInput },
    data() {
        return {
            password: "",
            showPassword: false,
        };
    },
    props: ["modelValue", "id", "label", "hasError"],

    emits: ["update:modelValue"],
};
</script>

<style>
</style>