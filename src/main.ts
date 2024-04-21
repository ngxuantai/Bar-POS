import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../node_modules/ant-design-vue/dist/reset.css";
import { Layout, Input, Button, Row, Col, Badge, Menu } from "ant-design-vue";
import "@/assets/styles/global.css";

const app = createApp(App);
app.use(router);
app.use(Layout);
app.use(Input);
app.use(Button);
app.use(Row);
app.use(Col);
app.use(Badge);
app.use(Menu);
app.mount("#app");
