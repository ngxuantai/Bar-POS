<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="title">
        <close-outlined @click="close" />
      </div>
      <div class="content">
        <div class="infor-container">
          <div class="img-container">
            <img src="../assets/image/item-card-image.png" alt="item-image" />
          </div>
          <div class="infor">
            <h2>60 Sessantanni Limited Edition Italia champagne</h2>
            <p>
              Full of the fragrant aroma of fruits mixed with plum and cherry
              jam. The wine has a full-bodied, balanced flavor...
            </p>
          </div>
        </div>
        <div class="select-container">
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox />
            <div class="select-quantity">
              <div class="type flex-row-start">
                <img src="../assets/icon/bottle-white.png" alt="bottle" />
                <span>750 ml bottle</span>
              </div>
              <p class="price">$1000</p>
              <div class="btn-change">
                <a-button @click="subBottle" class="btn-disable">
                  <minus-outlined />
                </a-button>
                <span>{{ bottle }}</span>
                <a-button @click="addBottle" class="btn-active">
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">$1000</p>
            </div>
          </div>
          <div class="flex-row-start" style="padding: 0 16px">
            <custom-checkbox />
            <div class="select-quantity">
              <div class="type flex-row-start">
                <img src="../assets/icon/glass-white.png" alt="glass" />
                <span>150 ml glass</span>
              </div>
              <p class="price">$300</p>
              <div class="btn-change">
                <a-button @click="subGlass" class="btn-disable">
                  <minus-outlined />
                </a-button>
                <span>{{ glass }}</span>
                <a-button @click="addGlass" class="btn-active">
                  <plus-outlined />
                </a-button>
              </div>
              <p class="real-price">$300</p>
            </div>
          </div>
          <!-- <div class="flex-between">
            <h3 id="total">Total</h3>
            <h3 id="toatl-price">$1000</h3>
          </div> -->
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
              v-model:value="notes"
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
            <h3>$1000</h3>
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
import { defineComponent, ref } from "vue";
import {
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
  EditOutlined,
  GiftOutlined,
} from "@ant-design/icons-vue";
import CustomCheckbox from "./CustomCheckbox.vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
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
    const checkBottle = ref<boolean>(false);
    const bottle = ref<number>(0);
    const checkGlass = ref<boolean>(false);
    const glass = ref<number>(0);
    const notes = ref<string>("");

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
    const close = () => {
      emit("closeModal");
    };
    const addCart = () => {
      emit("addCart");
      emit("closeModal");
    };
    const order = () => {
      emit("order");
      emit("closeModal");
    };
    return {
      checkBottle,
      bottle,
      checkGlass,
      glass,
      notes,
      subBottle,
      addBottle,
      subGlass,
      addGlass,
      close,
      addCart,
      order,
    };
  },
});
</script>

<style scoped>
.modal {
  /* display: none; */
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
  align-items: flex-end;
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
}

.img-container {
  width: 79px;
  height: 98px;
}
.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.infor {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  font-family: Merriweather;
  letter-spacing: -0.4000000059604645px;
}

.infor h2 {
  font-family: Newsreader;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
  margin: 0;
  color: #051a38;
}

.infor p {
  font-family: Newsreader;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  color: #595959;
}

.infor h4 span {
  font-size: 28px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #051a38;
}

.detail {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.detail div {
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail div > span {
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4000000059604645px;
  color: #7c7c7c;
}

.detail div img {
  width: 18px;
  height: 18px;
}

.detail div:nth-child(1),
.detail div:nth-child(2) {
  border-right: 1px solid #eeeded;
}

.detail div:nth-child(1) {
  padding-left: 0;
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
  width: 170px;
}
.type span {
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
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
}
.btn-change button {
  width: 26px;
  height: 26px;
  border-radius: 2px;
  padding: 0;
}
.btn-disable {
  border: 1px solid #d9d9d9;
  color: #d9d9d9;
}
.btn-active {
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}
.btn-change > span {
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

.notes {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}
.notes div {
  width: 274px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #f0f0f0;
}
.notes div input {
  padding: 0;
  font-family: Newsreader;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  color: #bfbfbf;
}

.total-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.discount,
.total {
  height: 29px;
}

.discount span,
.total span {
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  color: #484848;
}
.discount h4 {
  font-family: Newsreader;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: right;
  color: #3a3a3a;
}
.total h3 {
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
}

.add-cart,
.order {
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
}
.order {
  border: none;
  background: #051a38;
  color: #ffffff;
}
.add-cart:hover {
  color: #000000;
}
.order:hover {
  color: #ffffff;
}
</style>
