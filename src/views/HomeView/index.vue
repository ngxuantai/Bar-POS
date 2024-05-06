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
      @changeOption="changeOption"
    />
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import SearchHeader from "../../components/SearchHeader/index.vue";
import ListCardItem from "../../components/ListCardItem/index.vue";
import { getAllProductAttributes } from "../../services/ProductAttributeService";
import { Attribute, ProductWithAttributes } from "types";

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
    const listItems = ref<ProductWithAttributes[]>([]);

    async function getProductsData() {
      try {
        const data = await getAllProductAttributes(
          route.query.id as string,
          route.query.id_sub as string
        );
        if (data) {
          listItems.value = data.products.value;
        }
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
    const getBottleData = (product: ProductWithAttributes) => {
      return product.attributes.find(
        (attr) => attr.name === "bottle"
      ) as Attribute;
    };
    const getGlassData = (product: ProductWithAttributes) => {
      return product.attributes.find(
        (attr) => attr.name === "glass"
      ) as Attribute;
    };
    const changeOption = (option: string) => {
      switch (option) {
        case "option1":
          listItems.value = listItems.value.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "option2":
          listItems.value = listItems.value.sort((a, b) => {
            if (b.time_create > a.time_create) {
              return 1;
            } else {
              return -1;
            }
          });
          break;
        case "option3":
          listItems.value = listItems.value.sort((a, b) => {
            const glassA = getGlassData(a);
            const bottleA = getBottleData(a);
            const glassB = getGlassData(b);
            const bottleB = getBottleData(b);
            if (glassA.price > glassB.price) {
              return 1;
            } else if (glassA.price < glassB.price) {
              return -1;
            } else {
              if (bottleA.price > bottleB.price) {
                return 1;
              } else {
                return -1;
              }
            }
          });
          break;
        case "option4":
          listItems.value = listItems.value.sort((a, b) => {
            const glassA = getGlassData(a);
            const bottleA = getBottleData(a);
            const glassB = getGlassData(b);
            const bottleB = getBottleData(b);
            if (glassB.price > glassA.price) {
              return 1;
            } else if (glassB.price < glassA.price) {
              return -1;
            } else {
              if (bottleB.price > bottleA.price) {
                return 1;
              } else {
                return -1;
              }
            }
          });
          break;
      }
    };
    const changeTab = (tab: Tab) => {
      listTabs.forEach((item) => {
        item.isActive = item.id === tab.id;
      });
    };
    return {
      listTabs,
      listItems: searchItems,
      changeSearch,
      changeOption,
      changeTab,
    };
  },
});
</script>

<!-- <style lang="scss" scoped>
@import "./style.scss";
</style> -->
