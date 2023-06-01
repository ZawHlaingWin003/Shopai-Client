<template>
    <div>
        <Label :for="id" :required="required" v-if="label">{{ label }}</Label>

        <slot v-bind="props" />

        <ErrorMessage v-if="error">
            {{ error }}
        </ErrorMessage>

        <HelperMessage id="help-password" v-if="help">
            {{ help }}
        </HelperMessage>
    </div>
</template>

<script>
import Label from "./Label.vue";
import Input from "./Input.vue";
import ErrorMessage from "./ErrorMessage.vue";
import HelperMessage from "./HelperMessage.vue";
import { computed } from "vue";
import { provide } from "vue";
export default {
    components: { Label, Input, ErrorMessage, HelperMessage },
    props: {
        id: String,
        label: String,
        required: Boolean,
        error: String,
        help: String,
    },
    computed: {
        field() {
            return {
                ...this.$props,
                invalid: !!this.error,
            };
        },
    },
    provide() {
        return {
            field: computed(() => {
                return {
                    ...this.$props,
                    invalid: !!this.error,
                };
            }),
        };
    },
};
</script>

<style>
</style>