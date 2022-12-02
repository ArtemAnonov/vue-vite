import "@/assets/main.css";
import { createSSRApp } from "vue";
import UI from "@/components/UI";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";

export function createApp() {
  const app = createSSRApp(App);
  UI.forEach((component) => {
    app.component(component.name, component);
  });
  app.use(router).use(store);
  return { app, router };
}
