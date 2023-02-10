import "@/assets/main.css";
import { createSSRApp } from "vue";
import common from "@/components/common";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
export function createApp() {
  const app = createSSRApp(App);
  common.forEach((component) => {
    app.component(component.name, component);
  });
  app.use(router).use(store);
  return { app, router };
}
