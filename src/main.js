import "@/assets/main.css";
import { createSSRApp } from "vue";
import UI from "@/components/UI";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
// import VueSlider from "vue-slider-component";
export function createApp() {
  const app = createSSRApp(App);
  UI.forEach((component) => {
    app.component(component.name, component);
  });
  app.use(router).use(store);


  // app.component('VueSlider', VueSlider)
  
  return { app, router };
}
