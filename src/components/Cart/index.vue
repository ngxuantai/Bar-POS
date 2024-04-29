<template>
  <button
    class="badgecart"
    :style="{ right: right }"
    @click="toggleShowCheckout"
  >
    <a-badge :count="orderInfor.total_quantity">
      <img src="../../assets/icon/Cart.png" alt="cart" />
    </a-badge>
  </button>
  <div class="checkout" v-if="show">
    <div class="item-container">
      <div class="title">
        <div>Order #1</div>
        <p>{{ orderInfor.total_quantity }} items in your cart</p>
      </div>
      <div
        v-for="orderDetail in listOrderDetail"
        :key="orderDetail.infor_product.name"
      >
        <div class="item">
          <div class="img-container">
            <img src="../../assets/image/img.png" alt="image" />
          </div>
          <div class="info">
            <h2>{{ orderDetail.infor_product.name }}</h2>
            <p>{{ getTextAttribute(orderDetail.infor_product) }}</p>
          </div>
        </div>
        <div class="select-container">
          <div
            class="select-row"
            v-if="getBottleData(orderDetail.infor_product).quantity > 0"
          >
            <div class="select-quantity">
              <div class="type">
                <img src="../../assets/icon/bottle-black.png" alt="bottle" />
                <span>750 ml bottle</span>
              </div>
              <p class="price">
                ${{ getBottleData(orderDetail.infor_product).price }}
              </p>
              <div class="btn-change">
                <a-button class="btn-disable">
                  <minus-outlined />
                </a-button>
                <span>{{
                  getBottleData(orderDetail.infor_product).quantity
                }}</span>
                <a-button
                  class="btn-active"
                  @click="updateBottleQuantity(orderDetail.infor_product, 1)"
                >
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">
                ${{
                  getBottleData(orderDetail.infor_product).price *
                  getBottleData(orderDetail.infor_product).quantity
                }}
              </p>
            </div>
            <delete-outlined style="color: #bfbfbf" />
          </div>
          <div
            class="select-row"
            v-if="getGlassData(orderDetail.infor_product).quantity > 0"
          >
            <div class="select-quantity">
              <div class="type">
                <img src="../../assets/icon/glass-black.png" alt="glass" />
                <span>150 ml glass</span>
              </div>
              <p class="price">
                ${{ getGlassData(orderDetail.infor_product).price }}
              </p>
              <div class="btn-change">
                <a-button class="btn-disable">
                  <minus-outlined />
                </a-button>
                <span>{{
                  getGlassData(orderDetail.infor_product).quantity
                }}</span>
                <a-button class="btn-active">
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">
                ${{
                  getGlassData(orderDetail.infor_product).price *
                  getGlassData(orderDetail.infor_product).quantity
                }}
              </p>
            </div>
            <delete-outlined style="color: #bfbfbf" />
          </div>
        </div>
      </div>
    </div>
    <div class="bill-container">
      <div class="close">
        <close-outlined @click="toggleShowCheckout" />
      </div>
      <div class="content">
        <div class="summary-container">
          <h3>Summary</h3>
          <div class="flex-row-between">
            <p>Subtotal</p>
            <p>${{ orderInfor.total_price }}</p>
          </div>
          <div class="flex-row-between">
            <p>Discount</p>
            <p>${{ orderInfor.discount }}</p>
          </div>
          <div class="notes">
            <div>
              <edit-outlined style="color: #bfbfbf; font-size: 20px" />
              <a-input
                v-model:value="notes"
                :bordered="false"
                placeholder="Add your notes"
              />
            </div>
            <div>
              <gift-outlined style="color: #bfbfbf; font-size: 20px" />
              <a-input
                v-model:value="promoCode"
                :bordered="false"
                placeholder="Add promo code"
              />
            </div>
          </div>
        </div>
        <div class="total-container">
          <div class="total">
            <h3>Total</h3>
            <p>{{ orderInfor.total_price - orderInfor.discount }}</p>
          </div>
          <p>Please make sure to review your order carefully before ordering</p>
          <a-button @click="shwoPurchaseModal">Order now</a-button>
        </div>
      </div>
    </div>
  </div>
  <success-modal :show="shwoPurchase" @closeModal="shwoPurchase = false" />
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SuccessModal from "../SuccessModal/index.vue";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  CloseOutlined,
  EditOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import { AttributeWithQuantity, ProductWithQuantity, OrderDetail } from "types";

export default {
  components: {
    MinusOutlined,
    PlusOutlined,
    DeleteOutlined,
    CloseOutlined,
    EditOutlined,
    GiftOutlined,
    SuccessModal,
  },
  setup() {
    const listProduct = ref<OrderDetail[]>([]);
    const store = useStore();
    const show = ref<boolean>(false);
    const right = ref<string>("0");
    const listOrderDetail = computed(() => {
      return store.state.list_order_detail;
    });
    const orderInfor = computed(() => {
      return store.state.order_infor;
    });
    const notes = ref<string>("");
    const promoCode = ref<string>("");
    const shwoPurchase = ref<boolean>(false);

    const getBottleData = (product: ProductWithQuantity) => {
      return product.attributes.find(
        (attr: AttributeWithQuantity) => attr.name === "bottle"
      ) as AttributeWithQuantity;
    };
    const updateBottleQuantity = (
      product: ProductWithQuantity,
      quantity: number
    ) => {
      const bottle = getBottleData(product);
      bottle.quantity += quantity;
      updateCart();
    };
    const getGlassData = (product: ProductWithQuantity) => {
      return product.attributes.find(
        (attr: AttributeWithQuantity) => attr.name === "glass"
      ) as AttributeWithQuantity;
    };
    const updateGlassQuantity = (
      product: ProductWithQuantity,
      quantity: number
    ) => {
      const glass = getGlassData(product);
      glass.quantity += quantity;
    };
    const updateCart = () => {
      orderInfor.value.total_price = 0;
      orderInfor.value.total_quantity = 0;
      listOrderDetail.value.map((orderDetail: OrderDetail) => {
        orderDetail.total_price_product = 0;
        orderDetail.total_quantity = 0;
        orderDetail.infor_product.attributes.map(
          (attr: AttributeWithQuantity) => {
            orderDetail.total_price_product += attr.price * attr.quantity;
            orderDetail.total_quantity += attr.quantity;
          }
        );
        orderInfor.value.total_price += orderDetail.total_price_product;
        orderInfor.value.total_quantity += orderDetail.total_quantity;
      });
    };
    const getTextAttribute = (product: ProductWithQuantity) => {
      let text = "";
      const bottle = getBottleData(product);
      const glass = getGlassData(product);
      if (bottle.quantity > 0) {
        text += `${bottle.value} ml ${bottle.name} x ${bottle.quantity}`;
      }
      if (glass.quantity > 0) {
        text += `, ${glass.value} ml ${glass.name} x ${glass.quantity}`;
      }
      return text;
    };
    const toggleShowCheckout = () => {
      show.value = !show.value;
      right.value = show.value ? "1146px" : "0";
    };
    const shwoPurchaseModal = () => {
      shwoPurchase.value = true;
      toggleShowCheckout();
    };
    return {
      show,
      right,
      listProduct,
      listOrderDetail,
      orderInfor,
      notes,
      promoCode,
      shwoPurchase,
      getBottleData,
      updateBottleQuantity,
      getGlassData,
      updateGlassQuantity,
      getTextAttribute,
      toggleShowCheckout,
      shwoPurchaseModal,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
