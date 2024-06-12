import Vue from "vue";
import VueRouter from "vue-router";
import {createRouter, createWebHistory} from "vue-router";
import Login from "@/views/login-page.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component:Login,
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/home-page.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated && to.path !== "/") {
    next("/");
    next();
  } else {
    next();
  }
});

export default router;
