<template>
    <div class="mb-8">
        <label :for="id" class="text-sm inline-block mb-2">
            {{ label }}
        </label>
        <div class="relative flex items-center">
            <slot />
            <atom-button-loader
                class="absolute right-6"
                v-if="isInputLoading"
            />
        </div>
        <span class="error text-xs text-pink-600" v-if="hasError">
            {{ hasError[0] }}
        </span>
    </div>
</template>

<script>
import AtomButtonLoader from "./AtomButtonLoader.vue";
import AtomLabel from "./AtomLabel.vue";
export default {
    components: { AtomLabel, AtomButtonLoader },
    props: ["id", "label", "hasError", "isInputLoading"],
};
</script>

<style>
</style>