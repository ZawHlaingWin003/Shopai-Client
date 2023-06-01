<template>
    <form
        class="mx-auto w-full max-w-md space-y-4 p-4"
        @submit.prevent="submit"
    >
        <!-- <div>
            <Label id="name" :required="true">Name</Label>

            <Input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="John Doe"
                required
                :invalid="!!errors.name"
            />

            <ErrorMessage v-if="errors.name">
                {{ errors.name }}
            </ErrorMessage>

            <HelperMessage id="help-password">
                Should be at lease 8 characters long.
            </HelperMessage>
        </div> -->

        <div>
            <FormField
                id="name"
                label="Name Field"
                :required="true"
                :error="errors.name"
                help="Focus and wait to generate slug."
            >
                <Input type="text" v-model="form.name" placeholder="John Doe"
            /></FormField>
        </div>

        <button
            class="p-2 border bg-blue-500 active:bg-blue-400 hover:bg-blue-600 text-white"
        >
            Submit
        </button>

        <pre class="p-8">
            {{ form }}
        </pre>
    </form>
</template>

<script>
import Label from "./Label.vue";
import Input from "./Input.vue";
import ErrorMessage from "./ErrorMessage.vue";
import HelperMessage from "./HelperMessage.vue";
import FormField from "./FormField.vue";
export default {
    components: { Label, Input, ErrorMessage, HelperMessage, FormField },
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
            },

            errors: {},
        };
    },
    methods: {
        submit() {
            this.errors = {
                name: "Name field is required",
                email: "Email field is required",
            };
        },
    },
};
</script>

<style>
</style>