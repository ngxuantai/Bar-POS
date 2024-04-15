<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="title">
        <h4>Order #10</h4>
        <close-outlined @click="close" />
      </div>
      <div class="content">
        <div class="infor-container">
          <div class="img-container">
            <img src="../assets/image/card-image.png" alt="item-image" />
          </div>
          <div class="infor">
            <h2>60 Sessantanni Limited Edition Italia champagne</h2>
            <div class="detail">
              <div>
                <img src="../assets/icon/Grapes.png" alt="grapes" />
                <span>Primitivo</span>
              </div>
              <div>
                <img src="../assets/icon/MapPin.png" alt="mappin" />
                <span>Italy</span>
              </div>
              <div>
                <img src="../assets/icon/Percent.png" alt="percent" />
                <span>1% ABV</span>
              </div>
            </div>
            <h4>From <span>$300</span></h4>
          </div>
        </div>
        <div class="select-container">
          <div class="flex-between">
            <div class="checkbox">
              <input type="checkbox" v-model="checkBottle" />
              <span>By the bottle 750 ml</span>
            </div>
            <div class="btn-change">
              <a-button @click="subBottle" class="btn-background-disable">
                <minus-outlined />
              </a-button>
              <span>{{ bottle }}</span>
              <a-button @click="addBottle" class="btn-background-linear">
                <plus-outlined />
              </a-button>
            </div>
          </div>
          <div class="flex-between">
            <div class="checkbox">
              <input type="checkbox" v-model="checkGlass" />
              <span>By the glass 150 ml</span>
            </div>
            <div class="btn-change">
              <a-button @click="subGlass" class="btn-background-disable">
                <minus-outlined />
              </a-button>
              <span>{{ glass }}</span>
              <a-button @click="addGlass" class="btn-background-linear">
                <plus-outlined />
              </a-button>
            </div>
          </div>
          <div class="flex-between">
            <h3 id="total">Total</h3>
            <h3 id="toatl-price">$1000</h3>
          </div>
        </div>
        <div class="notes">
          <a-input
            v-model:value="notes"
            :bordered="false"
            placeholder="Add your notes"
          />
        </div>
        <div class="cart">
          <a-button id="add-cart" @click="addCart">Add to cart</a-button>
          <a-button id="order" class="btn-background-linear" @click="order">
            Order now
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    PlusOutlined,
    MinusOutlined,
    CloseOutlined,
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
  /* margin: 15% auto; */
  padding: 38px 44px;
  width: 594px;
  background-color: #f8f8f8;
  border: 1px solid #888;
  border-radius: 6px;
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
}

.title h4,
.title span {
  font-family: Merriweather;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  margin: 0;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.infor-container {
  display: flex;
  gap: 24px;
}

.img-container {
  width: 132px;
  height: 182px;
}
.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.infor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  font-family: Merriweather;
  letter-spacing: -0.4000000059604645px;
}

.infor h2 {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
  margin: 0;
  color: #051a38;
}

.infor h4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
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
  padding: 20px;
  background: #f5f5f5;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#total,
#toatl-price {
  font-family: Merriweather;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
}
#total {
  font-size: 20px;
}
#toatl-price {
  font-size: 24px;
}

.checkbox input[type="checkbox"]::after {
  border: none;
}

.btn-change {
  display: flex;
  gap: 2px;
  align-items: center;
}
.btn-change button {
  width: 28px;
  height: 28px;
  border-radius: 2px;
  padding: 0;
}
.btn-change button:nth-child(1) {
  color: #dfdfdf;
}
.btn-change button:nth-child(2) {
  color: #4b4b4b;
}
.btn-change button:nth-child(1):hover {
  color: #dfdfdf;
}
.btn-change button:nth-child(2):hover {
  color: #4b4b4b;
}
.btn-change button:nth-child(1):hover,
.btn-background-disabled {
  border: 1px solid #e4e4e4;
  background-color: #f8f8f8;
}
.btn-background-linear {
  border: none;
  background: linear-gradient(
    268.43deg,
    #fdeec3 3.58%,
    #efdcac 49.93%,
    #dcc29e 98.97%
  );
}
.btn-change > span {
  width: 37px;
  height: 36px;
  gap: 8px;
  font-family: Newsreader;
  font-size: 18px;
  font-weight: 500;
  align-content: center;
}

.notes input {
  padding: 0;
  font-family: Inter;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  color: #626262;
}

.cart {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
}

#add-cart,
#order {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
}
#add-cart {
  background: #f2f2f2;
}
#add-cart:hover,
#order:hover {
  color: #000000;
}
</style>
