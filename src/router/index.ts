import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import OnboardView from "../views/OnboardView/index.vue";
import HomeView from "../views/HomeView/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "onboard",
    component: OnboardView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/detail-infor/:id",
    name: "detail-infor",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/DetailInforView/index.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
