<template>
    <div class="border rounded-md p-8 dark:border-soft-dark">
        <div class="header">
            <h1 class="font-big-title font-bold text-lg">Address</h1>
        </div>
        <div class="my-8">
            <form @submit.prevent="$emit('userAddressUpdate')">
                <div class="flex gap-8">
                    <atom-form-group id="region" label="Region" class="w-full">
                        <atom-select-option
                            :options="regions"
                            @change="
                                getDistricts();
                                user_address.district_id = '';
                            "
                            v-model="user_address.region_id"
                            label="Select Region"
                        />
                    </atom-form-group>
                    <atom-form-group
                        id="district"
                        label="District"
                        class="w-full"
                        :isInputLoading="isDistrictSelectLoading"
                    >
                        <atom-select-option
                            :options="districts"
                            @change="
                                getTownships();
                                user_address.township_id = '';
                            "
                            v-model="user_address.district_id"
                            label="Select District"
                            :disabled="!districts.length || isDistrictSelectLoading"
                            id="subCategory"
                        />
                    </atom-form-group>
                    <atom-form-group
                        id="township"
                        label="Townnship"
                        class="w-full"
                        :isInputLoading="isTownshipSelectLoading"
                    >
                        <atom-select-option
                            :options="townships"
                            v-model="user_address.township_id"
                            label="Select Township"
                            :disabled="!townships.length || isTownshipSelectLoading"
                            id="township"
                        />
                    </atom-form-group>
                </div>
                <atom-form-group id="address" label="Complete Address">
                    <atom-textarea
                        rows="3"
                        v-model="user_address.address"
                        id="address"
                    />
                </atom-form-group>
                <atom-form-group id="zip_code" label="Zip / Postal Code">
                    <atom-input
                        type="text"
                        id="zip_code"
                        v-model="user_address.zip_code"
                    />
                </atom-form-group>

                <atom-simple-button :disabled="isButtonLoading">
                    <atom-button-loader v-if="isButtonLoading" />
                    <i class="fa-solid fa-floppy-disk"></i>
                    <span>Save</span>
                </atom-simple-button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "@/axios-interceptors.js";

import AtomSimpleButton from "@/components/atoms/AtomSimpleButton.vue";
import AtomInput from "@/components/atoms/AtomInput.vue";
import AtomFormGroup from "@/components/atoms/AtomFormGroup.vue";
import AtomButtonLoader from "@/components/atoms/AtomButtonLoader.vue";
import AtomTextarea from "@/components/atoms/AtomTextarea.vue";
import AtomSelectOption from "../../../components/atoms/AtomSelectOption.vue";

export default {
    components: {
        AtomSimpleButton,
        AtomInput,
        AtomFormGroup,
        AtomButtonLoader,
        AtomTextarea,
        AtomSelectOption,
    },
    props: ["user", "user_address", "isButtonLoading"],
    data() {
        return {
            regions: [],
            districts: [],
            townships: [],

            isDistrictSelectLoading: false,
            isTownshipSelectLoading: false,
        };
    },
    mounted() {
        this.getRegions();
        this.getDistricts();
        this.getTownships();
    },

    methods: {
        async getRegions() {
            await axios.get("/api/regions").then((response) => {
                this.regions = response.data.regions;
            });
        },

        async getDistricts() {
            this.isDistrictSelectLoading = true;
            await axios
                .get("/api/districts", {
                    params: {
                        region_id: this.user_address.region_id,
                    },
                })
                .then((response) => {
                    this.districts = response.data.districts;
                    this.isDistrictSelectLoading = false;
                });
        },

        async getTownships() {
            this.isTownshipSelectLoading = true;
            await axios
                .get("/api/townships", {
                    params: {
                        district_id: this.user_address.district_id,
                    },
                })
                .then((response) => {
                    this.townships = response.data.townships;
                    this.isTownshipSelectLoading = false;
                });
        },
    },
};
</script>

<style>
</style>