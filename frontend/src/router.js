import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import FixtureView from './views/FixtureView.vue'

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: '/fixture/:teamId', name: 'fixture', component: FixtureView, props: true }
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
