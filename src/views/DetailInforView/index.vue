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
        <div
          class="select-container"
          v-for="attribute in attributes"
          :key="attribute.id"
        >
          <div
            class="select-row"
            :style="{
              background: attribute.check ? '#181818' : 'transparent',
            }"
          >
            <custom-checkbox
              :status="attribute.check"
              @change="attribute.check = !attribute.check"
            />
            <div
              class="select-quantity"
              :class="{
                'checked-text': attribute.check,
                'unchecked-text': !attribute.check,
              }"
            >
              <div class="type flex-row-start">
                <img src="../../assets/icon/bottle-white.png" alt="bottle" />
                <span>{{ attribute.value }} ml {{ attribute.name }}</span>
              </div>
              <p class="price">${{ attribute.price }}</p>
              <div class="btn-change">
                <button
                  @click="changeQuantity(attributes, -1, attribute.id)"
                  :class="{
                    'btn-active': attribute.quantity > 0,
                    'btn-disable':
                      attribute.quantity === 0 || attribute.check === false,
                  }"
                  :disabled="
                    attribute.quantity === 0 || attribute.check === false
                  "
                >
                  <minus-outlined />
                </button>
                <input
                  type="type"
                  inputmode="numeric"
                  :value="attribute.quantity"
                  @input="changeQuantity(attributes, 0, attribute.id, $event)"
                  :disabled="attribute.check === false"
                />
                <button
                  @click="changeQuantity(attributes, 1, attribute.id)"
                  :class="{
                    'btn-active': attribute.check === true,
                    'btn-disable': attribute.check === false,
                  }"
                  :disabled="attribute.check === false"
                >
                  <plus-outlined />
                </button>
              </div>
              <p class="real-price">
                ${{ attribute.price * attribute.quantity }}
              </p>
            </div>
          </div>
          <div class="error">
            <p>{{ attribute.error }}</p>
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
  getProductWithAttributes,
  getSimilarProductWithAttributes,
} from "../../services/ProductAttributeService";
import {
  changeQuantity,
  checkAttribute,
  resetAttributes,
} from "../../utils/attribute";
import { createOrderDetail } from "../../utils/order";
import {
  ProductWithAttributes,
  Attribute,
  AttributeItem,
} from "../../../types";

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
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const listTabs = reactive<Tab[]>([
      { id: 1, title: "Today's special", isActive: true },
      { id: 2, title: "Customer Favorite", isActive: false },
      { id: 3, title: "Discounts", isActive: false },
    ]);
    const item = ref<ProductWithAttributes>();
    const attributes = ref<AttributeItem[]>([]);
    const similarItems = ref<ProductWithAttributes[]>([]);

    async function getProductData() {
      const id = route.params.id;
      try {
        const data = await getProductWithAttributes(id as string);
        if (data.product.value) {
          item.value = data.product.value;
          attributes.value = data.product.value.attributes.map(
            (attribute: Attribute) => {
              return {
                ...attribute,
                check: false,
                quantity: 0,
                error: "",
              };
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function getSimilarProduct(item: ProductWithAttributes) {
      try {
        const data = await getSimilarProductWithAttributes(
          item.id,
          item.id_category.id
        );
        if (data) {
          similarItems.value = data.products.value;
        }
      } catch (error) {
        console.error(error);
      }
    }

    getProductData();

    watch(item, () => {
      if (item.value?.attributes !== undefined) {
        getSimilarProduct(item.value);
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
    const navigateHome = () => {
      router.push("/home");
    };
    const addToCart = () => {
      if (checkAttribute(attributes) && item.value) {
        const product = createOrderDetail(item.value, attributes);
        store.dispatch("addCart", product);
        resetAttributes(attributes);
      }
    };
    return {
      listTabs,
      attributes,
      item,
      similarItems,
      changeTab,
      changeQuantity,
      navigateHome,
      addToCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
