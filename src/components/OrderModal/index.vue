<template>
  <div v-if="show" class="modal">
    <div class="back-layout" @click="close"></div>
    <div class="modal-content">
      <div class="title">
        <close-outlined @click="close" />
      </div>
      <div class="content">
        <div class="infor-container">
          <div class="img-container">
            <img src="../../assets/image/img.png" alt="item-image" />
          </div>
          <div class="infor">
            <h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </div>
        <div
          class="select-container"
          v-for="attribute in attributes"
          :key="attribute.id"
        >
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox
              :status="attribute.check"
              @change="attribute.check = !attribute.check"
            />
            <div class="select-quantity">
              <div class="type flex-row-start">
                <img src="../../assets/icon/bottle-black.png" alt="bottle" />
                <span> {{ attribute.value }} ml bottle</span>
              </div>
              <p class="price">${{ attribute.price }}</p>
              <div class="btn-change">
                <a-button
                  @click="changeQuantity(attributes, -1, attribute.id)"
                  :class="{
                    'btn-disable':
                      attribute.quantity === 0 || attribute.check === false,
                    'btn-active':
                      attribute.quantity > 0 || attribute.check === true,
                  }"
                  :disabled="
                    attribute.quantity === 0 || attribute.check === false
                  "
                >
                  <minus-outlined />
                </a-button>
                <input
                  type="type"
                  inputmode="numeric"
                  id="quantityBottle"
                  :value="attribute.quantity"
                  @input="changeQuantity(attributes, 0, attribute.id, $event)"
                  :disabled="attribute.check === false"
                />
                <a-button
                  @click="changeQuantity(attributes, 1, attribute.id)"
                  :class="{
                    'btn-disable': attribute.check === false,
                    'btn-active': attribute.check === true,
                  }"
                  :disabled="attribute.check == false"
                >
                  <plus-outlined />
                </a-button>
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
        <div class="total-container">
          <div class="discount flex-row-between">
            <span>Discount</span>
            <h4>$0</h4>
          </div>
          <div class="total flex-row-between">
            <span>Total</span>
            <h3>
              ${{
                attributes.reduce(
                  (total, attribute) =>
                    total + attribute.price * attribute.quantity,
                  0
                )
              }}
            </h3>
          </div>
        </div>
        <div class="cart">
          <a-button class="add-cart" @click="addCart">Add to cart</a-button>
          <a-button class="order" @click="order">Order now</a-button>
        </div>
        <success-modal
          :show="shwoPurchase"
          @closeModal="shwoPurchase = false"
          :listOrderDetailProp="listOrderDetail"
          :orderInforProp="orderInfor"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import {
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
  EditOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import CustomCheckbox from "../CustomCheckbox/index.vue";
import SuccessModal from "../SuccessModal/index.vue";
// import { IMG_URL } from "../../constants";
import { addOrder } from "../../composables/useCollection";
import {
  changeQuantity,
  checkAttribute,
  resetAttributes,
} from "../../utils/attributeHelper";
import { createOrderDetail } from "../../utils/orderHelper";
import {
  ProductWithAttributes,
  Attribute,
  OrderDetail,
  OrderInfor,
  AttributeItem,
} from "../../../types";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object as () => ProductWithAttributes,
      required: true,
    },
  },
  components: {
    CloseOutlined,
    PlusOutlined,
    MinusOutlined,
    EditOutlined,
    GiftOutlined,
    CustomCheckbox,
    SuccessModal,
  },
  setup(props, { emit }) {
    const store = useStore();
    const attributes = ref<AttributeItem[]>([]);
    const notes = ref<string>("");
    const promoCode = ref<string>("");
    const shwoPurchase = ref<boolean>(false);
    const listOrderDetail = ref<OrderDetail[]>([]);
    const orderInfor = ref<OrderInfor>({
      discount: 0,
      total_price: 0,
      total_quantity: 0,
    });

    const getAttributeData = () => {
      props.data.attributes.map((attribute: Attribute) => {
        attributes.value.push({
          ...attribute,
          check: false,
          quantity: 0,
          error: "",
        });
      });
    };
    getAttributeData();

    const close = () => {
      emit("closeModal");
    };
    const addCart = () => {
      if (checkAttribute(attributes)) {
        const product = createOrderDetail(props.data, attributes, notes);
        store.dispatch("addCart", product);
        resetAttributes(attributes, notes, promoCode);
        emit("closeModal");
      }
    };
    const order = async () => {
      if (checkAttribute(attributes)) {
        const orderDetail = createOrderDetail(props.data, attributes, notes);
        listOrderDetail.value = [orderDetail];
        orderInfor.value = {
          discount: 0,
          total_price: orderDetail.total_price_product,
          total_quantity: orderDetail.total_quantity,
        };
        try {
          await addOrder(orderDetail, {
            discount: 0,
            total_price: orderDetail.total_price_product,
            total_quantity: orderDetail.total_quantity,
          });
          emit("getOrderData", listOrderDetail.value, orderInfor.value);
          resetAttributes(attributes, notes, promoCode);
        } catch (error) {
          console.log(error);
        }
      }
    };
    return {
      // IMG_URL,
      notes,
      promoCode,
      shwoPurchase,
      listOrderDetail,
      orderInfor,
      item: props.data,
      attributes,
      changeQuantity,
      close,
      addCart,
      order,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
