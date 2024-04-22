<template>
  <search-header :listTabs="listTabs" @selectTab="changeTab" />
  <div class="wine-container">
    <div class="back">
      <p @click="navigateHome">Whisky</p>
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
              background: bottle.check ? '#181818' : 'transparent',
            }"
          >
            <custom-checkbox
              :status="bottle.check"
              @change="bottle.check = !bottle.check"
            />
            <div
              class="select-quantity"
              :class="{
                'checked-text': bottle.check,
                'unchecked-text': !bottle.check,
              }"
            >
              <div class="type flex-row-start">
                <img src="../../assets/icon/bottle-white.png" alt="bottle" />
                <span>750 ml bottle</span>
              </div>
              <p class="price">${{ bottle.price }}</p>
              <div class="btn-change">
                <button
                  @click="changeBottle(-1)"
                  :class="{
                    'btn-active': bottle.quantity > 0,
                    'btn-disable': bottle.quantity === 0,
                  }"
                >
                  <minus-outlined />
                </button>
                <span>{{ bottle.quantity }}</span>
                <button
                  @click="changeBottle(1)"
                  :class="{
                    'btn-active': bottle.check === true,
                    'btn-disable': bottle.check === false,
                  }"
                >
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">${{ bottle.price * bottle.quantity }}</p>
            </div>
          </div>
          <div
            class="flex-row-start"
            style="padding: 0 16px; height: 68px"
            :style="{
              background: glass.check ? '#181818' : 'transparent',
            }"
          >
            <custom-checkbox
              :status="glass.check"
              @change="glass.check = !glass.check"
            />
            <div
              class="select-quantity"
              :class="{
                'checked-text': glass.check,
                'unchecked-text': !glass.check,
              }"
            >
              <div class="type flex-row-start">
                <img src="../../assets/icon/glass-white.png" alt="glass" />
                <span>150 ml glass</span>
              </div>
              <p class="price">${{ glass.price }}</p>
              <div class="btn-change">
                <button
                  @click="changeGlass(-1)"
                  :class="{
                    'btn-active': glass.quantity > 0,
                    'btn-disable': glass.quantity === 0,
                  }"
                >
                  <minus-outlined />
                </button>
                <span>{{ glass.quantity }}</span>
                <button
                  @click="changeGlass(1)"
                  :class="{
                    'btn-active': glass.check === true,
                    'btn-disable': glass.check === false,
                  }"
                >
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">${{ glass.price * glass.quantity }}</p>
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import SearchHeader from "../../components/SearchHeader.vue";
import CustomCheckbox from "../../components/CustomCheckbox.vue";
import CardItem from "../../components/CardItem.vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

interface Item {
  check: boolean;
  price: number;
  quantity: number;
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
    const router = useRouter();
    const listTabs = reactive<Tab[]>([
      { id: 1, title: "Today's special", isActive: true },
      { id: 2, title: "Customer Favorite", isActive: false },
      { id: 3, title: "Discounts", isActive: false },
    ]);
    const bottle = reactive<Item>({
      check: false,
      price: 1000,
      quantity: 0,
    });
    const glass = reactive<Item>({
      check: false,
      price: 300,
      quantity: 0,
    });

    const changeTab = (tab: Tab) => {
      listTabs.forEach((item) => {
        item.isActive = item.id === tab.id;
      });
    };
    const changeBottle = (number: number) => {
      bottle.quantity += number;
    };
    const changeGlass = (number: number) => {
      glass.quantity += number;
    };
    const navigateHome = () => {
      router.push("/home");
    };
    return {
      listTabs,
      bottle,
      glass,
      changeTab,
      navigateHome,
      changeBottle,
      changeGlass,
    };
  },
};
</script>

<style scoped>
@import "./style.scss";
</style>
