<template>
  <search-header :listTabs="listTabs" @selectTab="changeTab" />
  <div class="wine-container">
    <div class="back">
      <p>Whisky</p>
      <p>/</p>
      <p>60 Sessantanni Limited Edition Italia champagne</p>
    </div>
    <div class="wine-infor">
      <div class="img-container">
        <img src="../../assets/image/img.png" alt="item-image" />
      </div>
      <div class="information">
        <div class="infor">
          <h3>
            60 Sessantanni Limited Edition Italia champagne (24 Karat Gold)
          </h3>
          <p>
            Full of the fragrant aroma of fruits mixed with plum and cherry jam.
            The wine has a full-bodied, balanced flavor with smooth tannins
          </p>
        </div>
        <div class="select-container">
          <div
            class="select-row"
            style="padding: 0 16px; height: 68px"
            :style="{
              background: checkBottle ? '#181818' : 'transparent',
            }"
          >
            <custom-checkbox :status="checkBottle" />
            <div
              class="select-quantity"
              :class="{
                'checked-text': checkBottle,
                'unchecked-text': !checkBottle,
              }"
            >
              <div class="type flex-row-start">
                <img src="@/assets/icon/bottle-white.png" alt="bottle" />
                <span>750 ml bottle</span>
              </div>
              <p class="price">$1000</p>
              <div class="btn-change">
                <button @click="subBottle" class="btn-disable">
                  <minus-outlined />
                </button>
                <span>{{ bottle }}</span>
                <button @click="addBottle" class="btn-active">
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">$1000</p>
            </div>
          </div>
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox />
            <div
              class="select-quantity"
              :class="{
                'checked-background': checkGlass,
                'checked-text': checkGlass,
                'unchecked-text': !checkGlass,
              }"
            >
              <div class="type flex-row-start">
                <img src="@/assets/icon/glass-white.png" alt="glass" />
                <span>150 ml glass</span>
              </div>
              <p class="price">$300</p>
              <div class="btn-change">
                <button @click="subGlass" class="btn-disable">
                  <minus-outlined />
                </button>
                <span>{{ glass }}</span>
                <button @click="addGlass" class="btn-disable">
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">$0</p>
            </div>
          </div>
        </div>
        <div class="add-cart">
          <button>Add to cart</button>
        </div>
      </div>
    </div>
    <div class="about">
      <h3>About the product</h3>
      <div class="detail">
        <div class="detail-content">
          <img src="../../assets/icon/grape-white.png" alt="grapes" />
          <span>Primitivo</span>
        </div>
        <div class="detail-content">
          <img src="../../assets/icon/mappin-white.png" alt="grapes" />
          <span>Primitivo</span>
        </div>
        <div class="detail-content">
          <img src="../../assets/icon/percent-white.png" alt="grapes" />
          <span>Primitivo</span>
        </div>
        <div class="detail-content">
          <img src="../../assets/icon/ph_factory.png" alt="grapes" />
          <span>Primitivo</span>
        </div>
        <div class="detail-content">
          <img src="../../assets/icon/bottle-white.png" alt="grapes" />
          <span>Primitivo</span>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore
      </p>
    </div>
    <div class="similar">
      <h3>About the product</h3>
      <div class="list-items">
        <card-item />
        <card-item />
        <card-item />
        <card-item />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watch } from "vue";
import SearchHeader from "@/components/SearchHeader.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";
import CardItem from "@/components/CardItem.vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

export default {
  components: {
    SearchHeader,
    CustomCheckbox,
    CardItem,
    PlusOutlined,
    MinusOutlined,
  },
  setup() {
    const listTabs = reactive<Tab[]>([
      { id: 1, title: "Today's special", isActive: true },
      { id: 2, title: "Customer Favorite", isActive: false },
      { id: 3, title: "Discounts", isActive: false },
    ]);
    const checkBottle = ref<boolean>(true);
    const bottle = ref<number>(0);
    const checkGlass = ref<boolean>(false);
    const glass = ref<number>(0);

    const changeTab = (tab: Tab) => {
      listTabs.forEach((item) => {
        item.isActive = item.id === tab.id;
      });
    };
    const subBottle = () => {
      if (bottle.value > 0) {
        bottle.value--;
      }
    };
    const addBottle = () => {
      bottle.value++;
    };
    const subGlass = () => {
      if (glass.value > 0) {
        glass.value--;
      }
    };
    const addGlass = () => {
      glass.value++;
    };
    watch(
      () => checkBottle,
      () => {
        console.log("checkBottle", checkBottle.value);
      }
    );
    return {
      listTabs,
      checkBottle,
      bottle,
      checkGlass,
      glass,
      changeTab,
      subBottle,
      addBottle,
      subGlass,
      addGlass,
    };
  },
};
</script>

<style scoped>
@import "./style.scss";
</style>
