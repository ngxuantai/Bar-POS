<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="title">
        <close-outlined @click="close" />
      </div>
      <div class="content">
        <div class="infor-container">
          <div class="img-container">
            <img src="../assets/image/img.png" alt="item-image" />
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
                <img src="../assets/icon/bottle-black.png" alt="bottle" />
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
                <span>{{ bottle.quantity }}</span>
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
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox
              :status="glass.check"
              @change="glass.check = !glass.check"
            />
            <div class="select-quantity">
              <div class="type flex-row-start">
                <img src="../assets/icon/glass-black.png" alt="glass" />
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
                <span>{{ glass.quantity }}</span>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, PropType, computed } from "vue";
import {
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
  EditOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import CustomCheckbox from "./CustomCheckbox.vue";
// import { IMG_URL } from "../../constants";
import { getAttributeById } from "../composables/useCollection";
import { useStore } from "vuex";
import { ProductWithAttributes } from "types";

interface Item extends Attribute {
  check: boolean;
  quantity: number;
}

interface Attribute {
  id: string;
  name: string;
  value: number;
  price: number;
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
  },
  setup(props, { emit }) {
    const store = useStore();
    const bottle = ref<Item>({
      id: "",
      name: "",
      value: 0,
      price: 0,
      check: false,
      quantity: 0,
    });
    const glass = ref<Item>({
      id: "",
      name: "",
      value: 0,
      price: 0,
      check: false,
      quantity: 0,
    });
    function getAttributeData() {
      props.data.attributes.map(async (attribute: any) => {
        console.log("attri", attribute.id);
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

    const notes = ref<string>("");
    const promoCode = ref<string>("");
    const changeBottle = (number: number) => {
      bottle.value.quantity += number;
    };
    const changeGlass = (number: number) => {
      glass.value.quantity += number;
    };
    const close = () => {
      emit("closeModal");
    };
    const addCart = () => {
      // emit("addCart");
      // emit("closeModal");
      if (bottle.value.quantity > 0 || glass.value.quantity > 0) {
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
          total_price:
            bottle.value.price * bottle.value.quantity +
            glass.value.price * glass.value.quantity,
        };
        store.dispatch("addCart", product);
      }
    };
    const order = () => {
      emit("order");
      emit("closeModal");
    };
    return {
      // IMG_URL,
      bottle,
      glass,
      item: props.data,
      notes,
      promoCode,
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
.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  width: 610px;
  padding: 28px;
  background-color: #f8f8f8;
  border-radius: 6px;
}

.title {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7px;
}

.content {
  margin: 0px 18px 11px 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.infor-container {
  display: flex;
  gap: 12px;
  .img-container {
    width: 79px;
    height: 98px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .infor {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    letter-spacing: -0.4000000059604645px;
    h2,
    p {
      font-family: Newsreader;
      margin: 0;
      text-align: left;
    }
    h2 {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      color: #051a38;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: #595959;
    }
  }
}

.select-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #f5f5f5;
}

.flex-row-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-quantity {
  display: flex;
  gap: 20px;
  align-items: center;
}

.type {
  margin-left: 26px;
  width: 170px;
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

.notes {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  div {
    width: 274px;
    height: 40px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #f0f0f0;
    input {
      padding: 0;
      font-family: Newsreader;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: left;
      color: #bfbfbf;
    }
  }
}

.total-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.discount,
.total {
  height: 29px;
  span {
    font-family: Newsreader;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: left;
    color: #484848;
  }
}

.discount h4 {
  margin: 0;
  font-family: Newsreader;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: right;
  color: #3a3a3a;
}
.total h3 {
  margin: 0;
  font-family: Newsreader;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: right;
  color: #051a38;
}

.cart {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
  button {
    width: 247px;
    height: 52px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Newsreader;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
  }
  .add-cart {
    border: 1px solid #051a38;
    background: transparent;
    &:hover {
      color: #000000;
    }
  }
  .order {
    border: none;
    background: #051a38;
    color: #ffffff;
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
