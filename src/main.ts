import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../node_modules/ant-design-vue/dist/reset.css";
import {
  Layout,
  Tabs,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
} from "ant-design-vue";
import "@/assets/styles/global.css";

const app = createApp(App);
app.use(router);
app.use(Layout);
app.use(Tabs);
app.use(Input);
app.use(Button);
app.use(Row);
app.use(Col);
app.use(Checkbox);
app.mount("#app");
