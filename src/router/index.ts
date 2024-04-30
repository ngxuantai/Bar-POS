import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import OnboardView from "../views/OnboardView/index.vue";
import HomeView from "../views/HomeView/index.vue";
import Layout from "../views/Layout/index.vue";

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
    path: "/home/:id",
    name: "home",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      // Thêm route cho "/home" để hiển thị component HomeView khi không có id
      {
        path: "/home",
        name: "homeNoId",
        component: HomeView,
      },
    ],
  },
  {
    path: "/detail-infor/:id",
    name: "detail-infor",
    component: Layout,
    children: [
      {
        path: "",
        name: "detail-infor",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../views/DetailInforView/index.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
