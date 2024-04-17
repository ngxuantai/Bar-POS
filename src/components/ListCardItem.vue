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
    <a-row :gutter="[48, 50]" style="margin: 50px 0">
      <a-col v-for="item in 4" :key="item.toString()" :span="24 / colCount">
        <card-item />
      </a-col>
      <a-col v-for="item in 4" :key="item.toString()" :span="24 / colCount">
        <card-item />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import CardItem from "./CardItem.vue";
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
    const itemsContainerRef = ref<HTMLElement | null>(null);
    const colCount = ref<number>(4);
    const show = ref<boolean>(false);
    const selected = ref<Option>({
      value: "option1",
      text: "Lựa chọn 1",
    });
    const options = [
      { value: "option1", text: "Lựa chọn 1" },
      { value: "option2", text: "Lựa chọn 2" },
      { value: "option3", text: "Lựa chọn 3" },
    ];

    onMounted(() => {
      updateColCount();
      window.addEventListener("resize", updateColCount);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateColCount);
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
      toggleShow,
      selectOption,
    };
  },
};
</script>

<style scoped>
.items-container {
  width: 100%;
  min-width: 516px;
  padding: 4px 70px 0 70px;
  display: flex;
  flex-direction: column;
}

.sort {
  display: flex;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.sort > h3 {
  color: #ffffff;
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  margin: 0;
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
}
.option {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 24px;
  color: #fff;
  height: 54px;
  border-radius: 6px;
}

.option:hover {
  background: #434343;
}

/* .custom-select option {
  background: #262626;
  color: #fff;
  border: none;
  width: 251px;
  height: 54px;
} */
</style>
