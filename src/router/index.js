/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Courses from "../views/Courses.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Cursos",
    component: Courses,
  },
  {
    path: "/vue",
    name: "vue",
    component: Home,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
