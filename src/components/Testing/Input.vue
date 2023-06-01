<template>
    <input
        :id="field.id"
        :value="modelValue"
        @input="($event) => $emit('update:modelValue', $event.target.value)"
        :required="field.required"
        :class="[
            'p-2 w-full rounded-md shadow-md border focus:outline-none focus:border focus:border-blue-500 focus:ring-blue-500',
            field.invalid ? 'border-red-500' : 'border-gray-300',
        ]"
    />
</template>

<script>
import { inject } from "vue";
export default {
    mounted() {
        // Inject the entire props object provided by the parent component
        const parentProps = inject("field", {});

        // Merge the parent props object with the child props object
        const mergedProps = { ...parentProps, ...this.$props };

        // Do something with the merged props object
        console.log(mergedProps, this.field);
    },
    props: {
        id: String,
        modelValue: [String, Number],
        required: Boolean,
        invalid: Boolean,
        ariaDescribedBy: String,
    },
    inject: {
        field: {
            from: "field",
            default: {},
        },
    },
    emits: ["update:modelValue"],
};
</script>

<style>
</style>