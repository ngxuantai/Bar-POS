<template>
  <div v-if="show" class="modal">
    <div class="back-layout" @click="close"></div>
    <div class="modal-content">
      <div class="title">
        <close-outlined @click="close" />
      </div>
      <div class="content">
        <div class="success">
          <span>
            Excellent choice!
            <br />
            Your drinks will arrive shortly.
          </span>
        </div>
        <div class="infor-order">
          <div class="order">
            <div class="flex-row-between">
              <span class="title-name">Order ID</span>
              <p class="title-name">123456</p>
            </div>
            <div class="flex-row-between">
              <span class="title-name">Time</span>
              <p class="title-name">{{ timestamp }}</p>
            </div>
          </div>
          <div class="list-items">
            <span class="title-name">Products</span>
            <div
              v-for="orderDetail in listOrderDetail"
              :key="orderDetail.infor_product.name"
              class="item"
            >
              <span class="title-name">{{
                orderDetail.infor_product.name
              }}</span>
              <div class="flex-row-between">
                <h4>{{ getTextAttribute(orderDetail.infor_product) }}</h4>
                <p>
                  ${{ getTotalPriceOrderDetail(orderDetail.infor_product) }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex-row-between total">
            <span class="title-name">Total</span>
            <h3>{{ orderInfor.total_price }}</h3>
          </div>
        </div>
        <div class="new-order">
          <a-button @click="close">New order</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  getTextAttribute,
  getTotalPriceOrderDetail,
} from "../../utils/attribute";
import { CloseOutlined } from "@ant-design/icons-vue";
import { OrderDetail, OrderInfor } from "../../../types";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    listOrderDetailProp: {
      type: Array as () => OrderDetail[],
      required: true,
    },
    orderInforProp: {
      type: Object as () => OrderInfor,
      required: true,
    },
  },
  components: {
    CloseOutlined,
  },
  setup(props, { emit }) {
    const listOrderDetail = computed(() => props.listOrderDetailProp);
    const orderInfor = computed(() => props.orderInforProp);
    const timestamp = ref<string>("");
    const getNow = () => {
      const today = new Date();
      const date =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = time + " " + date;
      timestamp.value = dateTime;
    };

    getNow();
    const resetData = () => {
      timestamp.value = "";
    };
    const close = () => {
      resetData();
      emit("closeModal");
    };
    return {
      timestamp,
      listOrderDetail,
      orderInfor,
      close,
      getTextAttribute,
      getTotalPriceOrderDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
