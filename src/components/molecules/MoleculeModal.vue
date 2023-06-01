<template>
    <transition name="modal-animation">
        <div
            class="z-10 fixed backdrop-blur-sm inset-0 transition h-screen flex items-center"
            v-if="isModalOpen"
            @click.self="warnModalBox"
        >
            <transition name="modal-animation-inner">
                <div
                    class="w-full mx-4 md:w-1/2 md:mx-auto lg:w-1/3 px-8 py-4 space-y-4 divide-y-2 bg-white rounded transition transform dark:bg-black dark:divide-soft-dark"
                    ref="modal"
                    v-if="isModalOpen"
                >
                    <div class="header flex items-start justify-between">
                        <h1 class="font-bold text-primary-500 text-[1.3rem]">
                            <slot name="header" />
                        </h1>
                        <button
                            class="px-2 py-[.5px] rounded cursor-pointer transition hover:shadow"
                            @click="closeModal"
                        >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div class="body pt-4">
                        <slot />
                    </div>
                    <div class="footer flex justify-end pt-4">
                        <atom-simple-button @click="closeModal">
                            <span>Close</span>
                        </atom-simple-button>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import AtomSimpleButton from "../atoms/AtomSimpleButton.vue";
import AtomButtonLoader from "../atoms/AtomButtonLoader.vue";
import AtomFormGroup from "../atoms/AtomFormGroup.vue";
import AtomInput from "../atoms/AtomInput.vue";
export default {
    components: {
        AtomSimpleButton,
        AtomButtonLoader,
        AtomFormGroup,
        AtomInput,
    },
    props: ["isModalOpen"],
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },

        warnModalBox() {
            this.$refs.modal.classList.add("animate-closeModalOutside");
        },
    },
};
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}
.modal-animation-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}
.modal-animation-inner-leave-to {
    transform: scale(0.8);
}
</style>