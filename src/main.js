import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/style/main.css";

// Stripe Checkout
import { StripeCheckout } from '@vue-stripe/vue-stripe';

// Pagination
import { TailwindPagination } from "laravel-vue-pagination";

// Swiper Vue.js Components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

// Helpers
import ucFirst from "./helpers/ucFirst";
import getImageUrl from "./helpers/getImageUrl";
import autoImportComponents from "./helpers/autoImportComponents";


const app = createApp(App)
    .component("TailwindPagination", TailwindPagination)
    .component("Swiper", Swiper)
    .component("SwiperSlide", SwiperSlide)
    .component("StripeChekout", StripeCheckout)

app.use(router);

app.provide('ucFirst', ucFirst)
app.provide('getImageUrl', getImageUrl)

app.mount("#app");

app.config.unwrapInjectedRef = true
