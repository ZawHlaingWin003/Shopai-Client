<template>
    <atom-section-container class="py-20">
        <organism-login-form
            :user="user"
            :errors="errors"
            :isButtonLoading="isButtonLoading"
            @login="login"
        />
    </atom-section-container>
</template>

<script>
import axios from "@/axios-interceptors";
import AtomSectionContainer from "../../components/atoms/AtomSectionContainer.vue";
import OrganismLoginForm from "../../components/organisms/OrganismLoginForm.vue";
export default {
    components: { AtomSectionContainer, OrganismLoginForm },
    data() {
        return {
            user: {
                email: "",
                password: "",
                remember_me: false,
            },
            errors: null,
            isButtonLoading: false,
        };
    },
    methods: {
        async login() {
            this.isButtonLoading = true;

            await axios.get("/sanctum/csrf-cookie").then(() => {
                axios
                    .post("/api/login", this.user)
                    .then((response) => {
                        console.log(response);

                        localStorage.setItem("API_TOKEN", response.data.token);
                        this.$emit("login", response.data.user);
                        this.$router.push({ name: "home" });
                    })
                    .catch((error) => {
                        console.log("Error => ", error);
                        if ((error.response.status = 422)) {
                            this.errors = error.response.data.errors;
                        }
                    })
                    .finally(() => {
                        this.isButtonLoading = false;
                    });
            });
        },
    },
};
</script>

<style>
</style>