import Vue from "vue";
import VueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login-page.vue";
import Chat from "@/views/chat.vue";
import Photo from "@/views/photo.vue";
import addInfo from "@/views/add-info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/photo",
    name: "photo",
    component: Photo,
  },
  {
    path: "/add-info",
    name: "addInfo",
    component: addInfo,
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/home-page.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userInfo");
  if (!isAuthenticated && to.path !== "/" && to.path !== "/add-info") {
    next("/");
    next();
  } else {
    next();
  }
});

export default router;
