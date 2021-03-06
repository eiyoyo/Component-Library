import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store";
import axios from "axios";
import $ from "jquery";
import "animate.css";

// require styles
import "./assets/less/reset.less";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$ = $;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
