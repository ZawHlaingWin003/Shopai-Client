<template>
    <atom-section-container class="py-20">
        <organism-register-form
            :user="user"
            :errors="errors"
            :isButtonLoading="isButtonLoading"
            @register="register"
        />
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors";
import AtomSectionContainer from "../../components/atoms/AtomSectionContainer.vue";
import OrganismRegisterForm from "../../components/organisms/OrganismRegisterForm.vue";
export default {
    components: { AtomSectionContainer, OrganismRegisterForm },
    data() {
        return {
            user: {
                name: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
                agree_terms: false,
            },
            errors: null,
            isButtonLoading: false,
        };
    },
    methods: {
        async register() {
            this.isButtonLoading = true;

            await axios
                .post("/api/register", this.user)
                .then((response) => {
                    console.log(response);

                    localStorage.setItem("API_TOKEN", response.data.token);
                    this.$emit("register", response.data.user);

                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    console.log("Error => ", error);
                    if ((error.response.status = 422)) {
                        this.errors = error.response.data.errors
                            ? error.response.data.errors
                            : error.response.data;
                    }
                })
                .finally(() => {
                    this.isButtonLoading = false;
                });
        },
    },
};
</script>

<style>
</style>