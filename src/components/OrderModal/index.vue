<template>
  <div v-if="show" class="modal">
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
        <div class="select-container">
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox
              :status="bottle.check"
              @change="bottle.check = !bottle.check"
            />
            <div class="select-quantity">
              <div class="type flex-row-start">
                <img src="../../assets/icon/bottle-black.png" alt="bottle" />
                <span> {{ bottle.value }} ml bottle</span>
              </div>
              <p class="price">${{ bottle.price }}</p>
              <div class="btn-change">
                <a-button
                  @click="changeBottle(-1)"
                  :class="{
                    'btn-disable':
                      bottle.quantity === 0 || bottle.check === false,
                    'btn-active': bottle.quantity > 0 || bottle.check === true,
                  }"
                  :disabled="bottle.quantity === 0 || bottle.check === false"
                >
                  <minus-outlined />
                </a-button>
                <input
                  type="type"
                  inputmode="numeric"
                  id="quantityBottle"
                  :value="bottle.quantity"
                  @input="changeQuantity($event)"
                  :disabled="bottle.check === false"
                />
                <a-button
                  @click="changeBottle(1)"
                  :class="{
                    'btn-disable': bottle.check === false,
                    'btn-active': bottle.check === true,
                  }"
                  :disabled="bottle.check == false"
                >
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">${{ bottle.price * bottle.quantity }}</p>
            </div>
          </div>
          <div class="error">
            <p>{{ errorBottle }}</p>
          </div>
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox
              :status="glass.check"
              @change="glass.check = !glass.check"
            />
            <div class="select-quantity">
              <div class="type flex-row-start">
                <img src="../../assets/icon/glass-black.png" alt="glass" />
                <span>{{ glass.value }} ml glass</span>
              </div>
              <p class="price">${{ glass.price }}</p>
              <div class="btn-change">
                <a-button
                  @click="changeGlass(-1)"
                  :class="{
                    'btn-disable':
                      glass.quantity === 0 || glass.check === false,
                    'btn-active': glass.quantity > 0 && glass.check === true,
                  }"
                  :disabled="glass.quantity === 0 || glass.check === false"
                >
                  <minus-outlined />
                </a-button>
                <input
                  type="type"
                  inputmode="numeric"
                  id="quantityGlass"
                  :value="glass.quantity"
                  @input="changeQuantity($event)"
                  :disabled="glass.check === false"
                />
                <a-button
                  @click="changeGlass(1)"
                  :class="{
                    'btn-disable': glass.check === false,
                    'btn-active': glass.check === true,
                  }"
                  :disabled="glass.check === false"
                >
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">${{ glass.price * glass.quantity }}</p>
            </div>
          </div>
          <div class="error">
            <p>{{ errorGlass }}</p>
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
                bottle.price * bottle.quantity + glass.price * glass.quantity
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
import { getAttributeById, addOrder } from "../../composables/useCollection";
import { Attribute, OrderDetail, OrderInfor } from "../../../types";

interface Item extends Attribute {
  check: boolean;
  quantity: number;
}

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
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
    const notes = ref<string>("");
    const promoCode = ref<string>("");
    const shwoPurchase = ref<boolean>(false);
    const listOrderDetail = ref<OrderDetail[]>([]);
    const orderInfor = ref<OrderInfor>({
      discount: 0,
      total_price: 0,
      total_quantity: 0,
    });

    function getAttributeData() {
      props.data.attributes.map(async (attribute: any) => {
        const data = await getAttributeById(attribute.id as string);
        attribute.name = data;
      });
      const bottleData: Attribute = props.data.attributes.find(
        (attribute: any) => attribute.name === "bottle"
      );

      bottle.value = {
        ...bottleData,
        check: false,
        quantity: 0,
      };
      const glassData = props.data.attributes.find(
        (attribute: any) => attribute.name === "glass"
      );
      glass.value = {
        ...glassData,
        check: false,
        quantity: 0,
      };
    }
    getAttributeData();

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
      notes.value = "";
      promoCode.value = "";
    };
    const close = () => {
      emit("closeModal");
    };
    const createOrderDetail = () => {
      const orderDetail = {
        infor_product: {
          id: props.data.id,
          name: props.data.name,
          description: props.data.description,
          about: props.data.about,
          id_category: props.data.id_category,
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
        notes: notes.value,
        discount: 0,
        total_quantity: bottle.value.quantity + glass.value.quantity,
        total_price_product:
          bottle.value.price * bottle.value.quantity +
          glass.value.price * glass.value.quantity,
      } as OrderDetail;
      return orderDetail;
    };
    const addCart = () => {
      // emit("addCart");
      // emit("closeModal");
      if (
        (bottle.value.quantity > 0 || glass.value.quantity > 0) &&
        errorBottle.value === "" &&
        errorGlass.value === ""
      ) {
        const product = {
          infor_product: {
            id: props.data.id,
            name: props.data.name,
            description: props.data.description,
            about: props.data.about,
            id_category: props.data.id_category,
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
          notes: notes.value,
          discount: 0,
          total_quantity: bottle.value.quantity + glass.value.quantity,
          total_price_product:
            bottle.value.price * bottle.value.quantity +
            glass.value.price * glass.value.quantity,
        };
        store.dispatch("addCart", product);
        // addStore();
        resetData();
        emit("closeModal");
      }
    };
    const order = async () => {
      emit("order");
      const orderDetail = createOrderDetail();
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
        resetData();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      // IMG_URL,
      bottle,
      errorBottle,
      glass,
      errorGlass,
      notes,
      promoCode,
      shwoPurchase,
      listOrderDetail,
      orderInfor,
      item: props.data,
      changeQuantity,
      changeBottle,
      changeGlass,
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
