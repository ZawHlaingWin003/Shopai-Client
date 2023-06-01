<template>
    <div class="flex items-center">
        <input
            type="checkbox"
            class="appearance-none mr-2 relative w-[14px] h-[14px] inline-block border-[1.5px] border-primary-600 rounded-[2px] focus:outline-none after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:scale-0 after:transition after:bg-primary-500 after:w-[14px] after:h-[14px] after:border after:border-primary-600 after:origin-center checked:after:scale-100"
            :id="id"
            :value="modelValue"
            @input="(e) => $emit('update:modelValue', e.target.checked)"
        />
        <label :for="id" class="text-sm">
            <slot />
        </label>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        modelValue: Boolean,
    },
};
</script>

<style>
input[type="checkbox"]::after {
    clip-path: polygon(26% 48%, 38% 61%, 75% 25%, 87% 35%, 39% 83%, 14% 62%);
}
</style>