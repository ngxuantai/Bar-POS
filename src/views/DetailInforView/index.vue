<template>
  <search-header :listTabs="listTabs" @selectTab="changeTab" />
  <div class="wine-container" v-if="item?.name && item">
    <div class="back">
      <p @click="navigateHome">Whisky</p>
      <p>/</p>
      <p>{{ item?.name }}</p>
    </div>
    <div class="wine-infor">
      <div class="img-container">
        <img src="../../assets/image/img.png" alt="item-image" />
      </div>
      <div class="information">
        <div class="infor">
          <h3>{{ item?.name }}</h3>
          <p>{{ item?.description }}</p>
        </div>
        <div class="select-container">
          <div
            class="select-row"
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
                <span>{{ bottle.value }} ml bottle</span>
              </div>
              <p class="price">${{ bottle.price }}</p>
              <div class="btn-change">
                <button
                  @click="changeBottle(-1)"
                  :class="{
                    'btn-active': bottle.quantity > 0,
                    'btn-disable':
                      bottle.quantity === 0 || bottle.check === false,
                  }"
                  :disabled="bottle.quantity === 0 || bottle.check === false"
                >
                  <minus-outlined />
                </button>
                <input
                  type="type"
                  inputmode="numeric"
                  id="quantityBottle"
                  :value="bottle.quantity"
                  @input="changeQuantity($event)"
                  :disabled="bottle.check === false"
                />
                <button
                  @click="changeBottle(1)"
                  :class="{
                    'btn-active': bottle.check === true,
                    'btn-disable': bottle.check === false,
                  }"
                  :disabled="bottle.check === false"
                >
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">${{ bottle.price * bottle.quantity }}</p>
            </div>
          </div>
          <div class="error">
            <p>{{ errorBottle }}</p>
          </div>
          <div
            class="select-row"
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
                <span>{{ glass.value }} ml glass</span>
              </div>
              <p class="price">${{ glass.price }}</p>
              <div class="btn-change">
                <button
                  @click="changeGlass(-1)"
                  :class="{
                    'btn-disable':
                      glass.quantity === 0 && glass.check === false,
                    'btn-active': glass.quantity > 0,
                  }"
                  :disabled="glass.quantity === 0 || glass.check === false"
                >
                  <minus-outlined />
                </button>
                <input
                  type="type"
                  inputmode="numeric"
                  id="quantityGlass"
                  :value="glass.quantity"
                  @input="changeQuantity($event)"
                  :disabled="glass.check === false"
                />
                <button
                  @click="changeGlass(1)"
                  :class="{
                    'btn-active': glass.check === true,
                    'btn-disable': glass.check === false,
                  }"
                  :disabled="glass.check === false"
                >
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">${{ glass.price * glass.quantity }}</p>
            </div>
          </div>
          <div class="error">
            <p>{{ errorGlass }}</p>
          </div>
        </div>
        <div class="add-cart">
          <button @click="addToCart">Add to cart</button>
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
      <p>{{ item.about }}</p>
    </div>
    <div class="similar">
      <h3>Other similar products</h3>
      <div class="list-items">
        <card-item v-for="item in similarItems" :key="item.id" :data="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import SearchHeader from "../../components/SearchHeader/index.vue";
import CustomCheckbox from "../../components/CustomCheckbox/index.vue";
import CardItem from "../../components/CardItem/index.vue";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons-vue";
import {
  getAllProducts,
  getProductById,
  getSimilarProducts,
} from "../../composables/useCollection";
import { DocumentData } from "firebase/firestore";
import { ProductWithAttributes, Attribute } from "../../../types";

interface Tab {
  id: number;
  title: string;
  isActive: boolean;
}

interface Item extends Attribute {
  check: boolean;
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
    const route = useRoute();
    const store = useStore();
    const listTabs = reactive<Tab[]>([
      { id: 1, title: "Today's special", isActive: true },
      { id: 2, title: "Customer Favorite", isActive: false },
      { id: 3, title: "Discounts", isActive: false },
    ]);
    const item = ref<ProductWithAttributes>();
    const similarItems = ref<ProductWithAttributes[]>([]);
    const bottle = ref<Item>({
      id: "",
      name: "",
      value: 0,
      price: 0,
      number_product: 0,
      check: false,
      quantity: 0,
    });
    const errorBottle = ref<string>("");
    const glass = ref<Item>({
      id: "",
      name: "",
      value: 0,
      price: 0,
      number_product: 0,
      check: false,
      quantity: 0,
    });
    const errorGlass = ref<string>("");

    async function getProductData() {
      const id = route.params.id;
      try {
        const data = await getProductById(id as string);
        item.value = data.product.value;
      } catch (error) {
        console.error(error);
      }
    }
    async function getSimilarProduct(item: ProductWithAttributes) {
      try {
        const data = await getSimilarProducts(item.id, item.id_category);
        console.log(data);
        similarItems.value = data?.products.value || [];
      } catch (error) {
        console.error(error);
      }
    }

    getProductData();

    watch(item, () => {
      if (item.value !== undefined) {
        getSimilarProduct(item.value);
        const bottleData = item.value.attributes.find(
          (attribute: any) => attribute.name === "bottle"
        );

        bottle.value = {
          ...bottleData,
          check: false,
          quantity: 0,
        } as Item;
        const glassData = item.value.attributes.find(
          (attribute: any) => attribute.name === "glass"
        );
        glass.value = {
          ...glassData,
          check: false,
          quantity: 0,
        } as Item;
      }
    });

    watch(
      () => route.params.id,
      () => {
        getProductData();
      }
    );

    const changeTab = (tab: Tab) => {
      listTabs.forEach((item) => {
        item.isActive = item.id === tab.id;
      });
    };
    const changeQuantity = (event: any) => {
      const newValue = parseInt(event.target.value);
      if (
        event.target.id === "quantityBottle" &&
        event.target.value !== "" &&
        !isNaN(newValue)
      )
        changeBottle(newValue - bottle.value.quantity);
      else if (
        event.target.id === "quantityGlass" &&
        event.target.value !== "" &&
        !isNaN(newValue)
      )
        changeGlass(newValue - glass.value.quantity);
    };
    const changeBottle = (number: number) => {
      bottle.value.quantity += number;
      if (bottle.value.quantity < 0) {
        bottle.value.quantity = 0;
      }
      if (bottle.value.quantity > bottle.value.number_product) {
        errorBottle.value =
          "The quantity you selected has reached the maximum capacity for this product";
      } else {
        errorBottle.value = "";
      }
    };
    const changeGlass = (number: number) => {
      glass.value.quantity += number;
      if (glass.value.quantity < 0) {
        glass.value.quantity = 0;
      }
      if (glass.value.quantity > glass.value.number_product) {
        errorGlass.value =
          "The quantity you selected has reached the maximum capacity for this product";
      } else {
        errorGlass.value = "";
      }
    };
    const navigateHome = () => {
      router.push("/home");
    };
    const resetData = () => {
      bottle.value = {
        ...bottle.value,
        check: false,
        quantity: 0,
      };
      glass.value = {
        ...glass.value,
        check: false,
        quantity: 0,
      };
    };
    const addToCart = () => {
      if (bottle.value.quantity === 0 && glass.value.quantity === 0) {
        errorBottle.value = "Please select the quantity";
        errorGlass.value = "Please select the quantity";
        return;
      } else if (item.value) {
        const product = {
          infor_product: {
            id: item.value.id,
            name: item.value.name,
            description: item.value.description,
            about: item.value.about,
            id_category: item.value.id_category,
            attributes: [
              {
                id: bottle.value.id,
                name: bottle.value.name,
                value: bottle.value.value,
                price: bottle.value.price,
                quantity: bottle.value.quantity,
              },
              {
                id: glass.value.id,
                name: glass.value.name,
                value: glass.value.value,
                price: glass.value.price,
                quantity: glass.value.quantity,
              },
            ],
          },
          notes: "",
          discount: 0,
          total_quantity: bottle.value.quantity + glass.value.quantity,
          total_price_product:
            bottle.value.price * bottle.value.quantity +
            glass.value.price * glass.value.quantity,
        };
        store.dispatch("addCart", product);
        resetData();
      }
    };
    return {
      listTabs,
      bottle,
      errorBottle,
      glass,
      errorGlass,
      item,
      similarItems,
      changeTab,
      changeQuantity,
      changeBottle,
      changeGlass,
      navigateHome,
      addToCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
