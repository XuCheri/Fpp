import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/todo",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/index/index.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/about/index.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import("@/views/todo/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
