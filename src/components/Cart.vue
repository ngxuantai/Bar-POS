<template>
  <button
    class="badgecart"
    :style="{ right: right }"
    @click="toggleShowCheckout"
  >
    <a-badge :count="orderInfor.total_quantity">
      <img src="../assets/icon/Cart.png" alt="cart" />
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
            <img src="../assets/image/img.png" alt="image" />
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
                <img src="../assets/icon/bottle-black.png" alt="bottle" />
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
                <img src="../assets/icon/glass-black.png" alt="glass" />
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
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import SuccessModal from "./SuccessModal.vue";
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
      console.log("Change bottle quantity", listOrderDetail.value);
      console.log("Change bottle quantity", store.state.order_detail);
      updateCart(product);
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
    const updateCart = (product: ProductWithQuantity) => {
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
      console.log("Order now");
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
.badgecart {
  width: 72px;
  height: 56px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 113px;
  right: 0;
}
.checkout {
  width: 1146px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  display: flex;
}
.item-container {
  width: 786px;
  height: 100%;
  padding: 74px 53px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      padding: 4px 12px;
      font-family: Newsreader;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      background-color: #f5ebda;
    }
    p {
      margin: 0;
      font-family: Newsreader;
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
      color: #262626;
    }
  }
  .item {
    display: flex;
    gap: 12px;
    align-items: center;
    .img-container {
      width: 75px;
      height: 94px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      h2 {
        margin: 0;
        font-family: Newsreader;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        text-align: left;
        color: #434343;
      }
      p {
        margin: 0;
        font-family: Newsreader;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        text-align: left;
        color: #595959;
      }
    }
  }
}
.select-container {
  display: flex;
  flex-direction: column;
}

.select-row {
  display: flex;
  align-items: center;
  gap: 48px;
}

.select-quantity {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 16px 12px;
}

.type {
  width: 149px;
  text-align: left;
  span {
    font-family: Newsreader;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #595959;
  }
}

.price,
.real-price {
  width: 70px;
  margin: 0;
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
}
.price {
  color: #595959;
}
.real-price {
  color: #262626;
}

.btn-change {
  display: flex;
  align-items: center;
  button {
    width: 26px;
    height: 26px;
    border-radius: 2px;
    padding: 0;
  }
  > span {
    width: 37px;
    height: 36px;
    padding: 12px 14px;
    font-family: Newsreader;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    align-content: center;
    color: #5b5b5b;
  }
}

.btn-disable {
  border: 1px solid #d9d9d9;
  color: #d9d9d9;
  &:hover,
  &:active {
    border: 1px solid #d9d9d9;
    color: #d9d9d9;
  }
}
.btn-active {
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
  &:hover,
  &:active {
    border: 1px solid #8c8c8c;
    color: #8c8c8c;
  }
}

.bill-container {
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  .close {
    display: flex;
    justify-content: flex-end;
    margin-top: 29px;
    margin-right: 30px;
  }
  .content {
    height: 100%;
    margin: 29px 35px 48px 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .summary-container {
      h3 {
        margin: 0;
        font-family: Newsreader;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        color: #262626;
        text-align: left;
      }
      .flex-row-between {
        display: flex;
        justify-content: space-between;
        margin: 16px 0;
        p {
          margin: 0;
          font-family: Newsreader;
          font-weight: 400;
          line-height: 26px;
          &:nth-child(1) {
            font-size: 16px;
            color: #484848;
          }
          &:nth-child(2) {
            font-size: 20px;
            color: #3a3a3a;
          }
        }
      }
      .notes {
        display: flex;
        flex-direction: column;
        gap: 16px;
        div {
          height: 48px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid #d9d9d9;
          input {
            width: 100%;
            font-family: Newsreader;
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            color: #8c8c8c;
          }
        }
      }
    }
    .total-container {
      display: flex;
      flex-direction: column;
      gap: 28px;
      .total {
        height: 60px;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #f0f0f0;
        h3 {
          margin: 0;
          font-family: Newsreader;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          color: #262626;
        }
        p {
          margin: 0;
          font-family: Newsreader;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          color: #262626;
        }
      }
      p {
        font-family: Newsreader;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        text-align: center;
      }
      button {
        height: 48px;
        font-family: Newsreader;
        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
        color: #fff;
        background-color: #051a38;
        border-radius: 0;
        border: none;
        &:hover,
        &:active {
          outline: none;
          background-color: #051a38;
        }
      }
    }
  }
}
</style>
