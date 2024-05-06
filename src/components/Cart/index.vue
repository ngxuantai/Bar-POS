<template>
  <button
    class="badgecart"
    :class="{ right: show }"
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
            v-for="attr in orderDetail.infor_product.attributes"
            :key="attr.id"
          >
            <div class="select-quantity" v-if="attr.quantity > 0">
              <div class="type">
                <img src="../../assets/icon/bottle-black.png" alt="bottle" />
                <span>{{ attr.value + ` ml ` + attr.name }}</span>
              </div>
              <p class="price">${{ attr.price }}</p>
              <div class="btn-change">
                <a-button
                  class="btn-disable"
                  @click="updateAttributeQuantity(attr, -1)"
                >
                  <minus-outlined />
                </a-button>
                <span>{{ attr.quantity }}</span>
                <a-button
                  class="btn-active"
                  @click="updateAttributeQuantity(attr, 1)"
                >
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">${{ attr.price * attr.quantity }}</p>
            </div>
            <delete-outlined
              style="color: #bfbfbf"
              @click="deleteAttribute(orderDetail.infor_product, attr)"
              v-if="attr.quantity > 0"
            />
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
            <p>${{ orderInfor.total_price - orderInfor.discount }}</p>
          </div>
          <p>Please make sure to review your order carefully before ordering</p>
          <a-button @click="shwoPurchaseModal">Order now</a-button>
        </div>
      </div>
    </div>
  </div>
  <success-modal
    :show="shwoPurchase"
    @closeModal="shwoPurchase = false"
    :listOrderDetailProp="listOrderDetailProp"
    :orderInforProp="orderInforProp"
  />
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { useStore } from "vuex";
import SuccessModal from "../SuccessModal/index.vue";
import { getTextAttribute } from "../../utils/attributeHelper";
import {
  AttributeWithQuantity,
  ProductWithQuantity,
  OrderDetail,
  OrderInfor,
} from "../../../types";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  CloseOutlined,
  EditOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import { addOrderWithCart } from "@/services/OrderDetailService";
// import { addOrder } from "../../composables/useCollection";

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
    const store = useStore();
    const show = ref<boolean>(false);
    const right = ref<string>("0");
    const listOrderDetail = ref<OrderDetail[]>(store.state.list_order_detail);
    const orderInfor = ref<OrderInfor>(store.state.order_infor);
    const notes = ref<string>("");
    const promoCode = ref<string>("");
    const shwoPurchase = ref<boolean>(false);
    const listOrderDetailProp = ref<OrderDetail[]>([]);
    const orderInforProp = ref<OrderInfor>({
      notes: "",
      discount: 0,
      total_price: 0,
      total_quantity: 0,
    });

    watch(
      () => store.state.list_order_detail,
      () => {
        listOrderDetail.value = store.state.list_order_detail;
      }
    );
    watch(
      () => store.state.order_infor,
      () => {
        orderInfor.value = store.state.order_infor;
      }
    );

    const updateAttributeQuantity = (
      attribute: AttributeWithQuantity,
      quantity: number
    ) => {
      attribute.quantity += quantity;
      updateCart();
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
      listOrderDetail.value = listOrderDetail.value.filter(
        (orderDetail: OrderDetail) => orderDetail.total_quantity > 0
      );
    };
    const deleteAttribute = (
      product: ProductWithQuantity,
      attribute: AttributeWithQuantity
    ) => {
      store.dispatch("deleteOrder", {
        productId: product.id,
        attributeId: attribute.id,
      });
    };
    const toggleShowCheckout = () => {
      show.value = !show.value;
      right.value = show.value ? "1146px" : "0";
    };
    const shwoPurchaseModal = async () => {
      if (orderInfor.value.total_quantity > 0) {
        try {
          await addOrderWithCart();
          shwoPurchase.value = true;
          listOrderDetailProp.value = listOrderDetail.value;
          orderInforProp.value = orderInfor.value;
          store.dispatch("clearCart");
          toggleShowCheckout();
        } catch (error) {
          console.log(error);
        }
      }
    };
    return {
      show,
      right,
      listOrderDetail,
      orderInfor,
      notes,
      promoCode,
      shwoPurchase,
      listOrderDetailProp,
      orderInforProp,
      updateAttributeQuantity,
      deleteAttribute,
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
