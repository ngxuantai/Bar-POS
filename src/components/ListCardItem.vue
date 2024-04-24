<template>
  <div class="items-container" ref="itemsContainerRef">
    <div class="sort">
      <h3>Sort by:</h3>
      <div class="custom-select" @click="toggleShow">
        {{ selected.text }}
        <down-outlined />
        <div v-if="show" class="list-option">
          <div
            class="option"
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
          >
            {{ option.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="list-items" v-if="listItems.length > 0">
      <card-item v-for="item in listItems" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
import CardItem from "./CardItem.vue";
import { getAllProducts } from "../composables/useCollection";
import { DocumentData } from "firebase/firestore";
import { ProductWithAttributes } from "types";
interface Option {
  value: string;
  text: string;
}

export default {
  components: {
    DownOutlined,
    CardItem,
  },
  setup() {
    const router = useRouter();
    const itemsContainerRef = ref<HTMLElement | null>(null);
    const colCount = ref<number>(4);
    const show = ref<boolean>(false);
    const selected = ref<Option>({
      value: "option1",
      text: "All products",
    });
    const listItems = ref<DocumentData[]>([]);
    const options = [
      { value: "option1", text: "All products" },
      { value: "option2", text: "Latest" },
      { value: "option3", text: "Price low to high" },
      { value: "option4", text: "Price hight to low" },
    ];

    async function getProductsData() {
      try {
        const data = await getAllProducts("m1ubzXQssvMhhrFT1ZDj");
        listItems.value = data.products.value;
      } catch (error) {
        console.error(error);
      }
    }

    getProductsData();

    onMounted(async () => {
      updateColCount();
      window.addEventListener("resize", updateColCount);
    });

    onBeforeUnmount(async () => {
      window.removeEventListener("resize", updateColCount);
      await getProductsData();
    });

    const toggleShow = () => {
      show.value = !show.value;
    };
    const selectOption = (option: Option) => {
      selected.value = option;
      toggleShow();
    };

    const updateColCount = () => {
      const width = itemsContainerRef.value?.clientWidth;
      const minColCount = 2;
      const maxColCount = Math.floor((width as number) / 280);
      colCount.value = Math.max(minColCount, maxColCount);
    };
    return {
      itemsContainerRef,
      colCount,
      show,
      selected,
      options,
      listItems,
      toggleShow,
      selectOption,
    };
  },
};
</script>

<style lang="scss" scoped>
.items-container {
  width: 100%;
  min-width: 516px;
  padding: 4px 70px 0 70px;
  display: flex;
  flex-direction: column;
  .sort {
    display: flex;
    height: 50px;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    h3 {
      color: #ffffff;
      font-family: Newsreader;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      text-align: center;
      margin: 0;
    }
  }
}

.custom-select {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 146px;
  height: 100%;
  background: #262626;
  text-transform: none;
  border: none;
  outline: none;
  color: #fff;
  align-content: center;
  position: relative;
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
}

.list-option {
  position: absolute;
  top: 62px;
  right: 0;
  z-index: 4;
  background: #181818;
  width: 251px;
  border-radius: 6px;
  .option {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px 24px;
    color: #fff;
    height: 54px;
    border-radius: 6px;
    &:hover {
      background: #434343;
    }
  }
}
.list-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px 48px;
}
</style>
