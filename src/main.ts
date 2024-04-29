import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "../node_modules/ant-design-vue/dist/reset.css";
import { Layout, Input, Button, Row, Col, Badge, Menu } from "ant-design-vue";

const app = createApp(App);
app.use(router);
app.use(Layout);
app.use(Input);
app.use(Button);
app.use(Row);
app.use(Col);
app.use(Badge);
app.use(Menu);
app.use(store);
app.mount("#app");
