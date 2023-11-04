// import Vue from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
// Vue.use(Router);
const routes = [
  {
    path: "/",
    redirect: "/home",
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
// const createRouter = () =>
//   new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: route,
//   });

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// const router = createRouter();
export default router;
