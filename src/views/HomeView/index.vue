<template>
  <search-header
    :listTabs="listTabs"
    @changeSearch="changeSearch"
    @selectTab="changeTab"
  />
  <div v-for="tab in listTabs" :key="tab.id">
    <list-card-item
      v-if="tab.id === 1 && tab.isActive && listItems"
      :listItemsProp="listItems"
    />
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import SearchHeader from "../../components/SearchHeader/index.vue";
import ListCardItem from "../../components/ListCardItem/index.vue";
import { DocumentData } from "firebase/firestore";
import { getAllProducts } from "../../composables/useCollection";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

export default defineComponent({
  components: {
    SearchHeader,
    ListCardItem,
  },
  setup() {
    const route = useRoute();
    const searchText = ref<string>("");
    const listTabs = reactive<Tab[]>([
      { id: 1, title: "Today's special", isActive: true },
      { id: 2, title: "Customer Favorite", isActive: false },
      { id: 3, title: "Discounts", isActive: false },
    ]);
    const listItems = ref<DocumentData[]>([]);

    async function getProductsData() {
      try {
        const data = await getAllProducts(
          route.query.id as string,
          route.query.id_sub as string
        );
        listItems.value = data.products.value;
      } catch (error) {
        console.error(error);
      }
    }

    getProductsData();

    watch(
      () => route.query,
      () => {
        getProductsData();
      }
    );

    const changeSearch = (text: string) => {
      searchText.value = text;
    };
    const searchItems = computed(() => {
      if (searchText.value == "") {
        return listItems.value;
      } else {
        return listItems.value.filter((item) =>
          item.name.toLowerCase().includes(searchText.value.toLowerCase())
        );
      }
    });
    const changeTab = (tab: Tab) => {
      listTabs.forEach((item) => {
        item.isActive = item.id === tab.id;
      });
    };
    return {
      listTabs,
      listItems: searchItems,
      changeSearch,
      changeTab,
    };
  },
});
</script>

<!-- <style lang="scss" scoped>
@import "./style.scss";
</style> -->
