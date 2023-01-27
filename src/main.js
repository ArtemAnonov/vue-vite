import "@/assets/main.css";
import { createSSRApp } from "vue";
import common from "@/components/common";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
// import VueCookies from 'vue-cookies-reactive'
// console.log(VueCookies);
// import VueSlider from "vue-slider-component";
export function createApp() {
  const app = createSSRApp(App);
  common.forEach((component) => {
    app.component(component.name, component);
  });
  app.use(router).use(store)
    // .use(VueCookies)
    ;
  

  // app.component('VueSlider', VueSlider)
  
  return { app, router };
}
