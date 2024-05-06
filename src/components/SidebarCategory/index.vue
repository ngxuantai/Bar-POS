<template>
  <div class="sider-category">
    <div class="logo">
      <img src="../../assets/image/logo.png" alt="logo" @click="navigateHome" />
    </div>
    <sub-menu v-if="items" :items="items" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SubMenu from "../SubMenu/index.vue";
import { getAllCategory } from "../../services/CategoryService";
import { Category } from "types";

export default {
  components: {
    SubMenu,
  },
  setup() {
    const router = useRouter();
    const items = ref<Category[]>([]);
    const getCategory = async () => {
      try {
        const data = await getAllCategory();
        items.value = data?.categories.value || [];
      } catch (error) {
        console.error(error);
      }
    };

    getCategory();

    const navigateHome = () => {
      router.push("/home");
    };
    return {
      items,
      navigateHome,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
