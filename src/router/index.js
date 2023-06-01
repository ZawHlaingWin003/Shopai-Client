import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home/Home.vue";
import Error404 from "../pages/errors/Error404.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/testing",
        name: "testing",
        component: () => import("../components/Testing/Registration.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/products",
        name: "products.index",
        component: () => import("../pages/shopai/product/Index.vue"),
        // props: route => ({
        //     query: {
        //         search: route.query.search,
        //         category: route.query.category,
        //         sub_category: route.query.sub_category,
        //     }
        // }),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/products/:slug",
        name: "products.show",
        component: () => import("../pages/shopai/product/Show.vue"),
        props: true,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/products/create",
        name: "products.create",
        component: () => import("../pages/shopai/product/Create.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/products/categories",
        name: "products.categories",
        component: () => import("../pages/shopai/category/Index.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/cart",
        name: "cart",
        component: () => import("../pages/shopai/product/Cart.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/checkout",
        name: "checkout",
        component: () => import("../pages/shopai/product/Checkout.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/order-summary",
        name: "order.summary",
        component: () => import("../pages/shopai/product/Summary.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/user/profile",
        name: "user.profile",
        component: () => import("../pages/profile/MyAccount.vue"),
        meta: {
            requiresAuth: true
        }
    },

    {
        path: "/login",
        name: "login",
        component: () => import("../pages/auth/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../pages/auth/Register.vue"),
    },
    {
        path: "/forget-password",
        name: "forget-password",
        component: () => import("../pages/auth/ForgetPassword.vue"),
    },

    {
        // path: "/:catchAll(.*)",
        path: "/:pathMatch(.*)*",
        component: Error404,
        name: "Error404",
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0, behavior: 'smooth' }
    }
});

// router.beforeEach((to, from, next) => {
//     ViewUI.LoadingBar.start();
//     next();
// });

// router.afterEach(route => {
//     ViewUI.LoadingBar.finish();
// });

router.beforeEach((to, from, next) => {
    const token = Boolean(localStorage.getItem("API_TOKEN"));

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Route requires authentication
        if (!token) {
            next({ name: "login" });
        } else {
            next();
        }
    } else {
        // Route does not require authentication
        if (token && (to.name == "login" || to.name == "register")) {
            next({ name: "home" });
        } else {
            next();
        }
    }
});


export default router;
