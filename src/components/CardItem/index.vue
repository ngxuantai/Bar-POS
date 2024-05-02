<template>
  <div class="card-container" v-if="item">
    <div class="img-container" @click="navigateDeatilView">
      <img src="../../assets/image/item-card-image.png" alt="item-image" />
    </div>
    <div class="content" @click="navigateDeatilView">
      <h4>{{ item.name }}</h4>
      <div class="detail">
        <div class="first-row">
          <!-- <div v-for="attribute in item.attributes" :key="attribute.id"> -->
          <div>
            <img src="../../assets/icon/glass.png" alt="image" />
            {{ getGlassData(item)?.value }}ml {{ getGlassData(item)?.name }}
          </div>
          <div>
            <img src="../../assets/icon/bottle.png" alt="image" />
            {{ getBottleData(item)?.value }}ml {{ getBottleData(item)?.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <a-button @click="showOdering = true">
        ${{ minVolumePrice(item.attributes) }} - ${{
          maxVolumePrice(item.attributes)
        }}
        <img src="../../assets/icon/Union.png" alt="plus" />
      </a-button>
      <order-modal
        :data="item"
        :show="showOdering"
        @closeModal="showOdering = false"
        @getOrderData="getOrderData"
        @order="shwoPurchase = true"
      />
      <success-modal
        v-if="listOrderDetailProp.length > 0"
        :show="shwoPurchase"
        @closeModal="shwoPurchase = false"
        :listOrderDetailProp="listOrderDetailProp"
        :orderInforProp="orderInforProp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import OrderModal from "../../components/OrderModal/index.vue";
import SuccessModal from "../SuccessModal/index.vue";
import {
  Attribute,
  OrderDetail,
  OrderInfor,
  ProductWithAttributes,
} from "types";

export default defineComponent({
  components: {
    OrderModal,
    SuccessModal,
  },
  props: {
    data: {
      type: Object as () => ProductWithAttributes,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const showOdering = ref<boolean>(false);
    const shwoPurchase = ref<boolean>(false);
    const item = ref(props.data);
    const listOrderDetailProp = ref<OrderDetail[]>([]);
    const orderInforProp = ref<OrderInfor>({
      discount: 0,
      total_price: 0,
      total_quantity: 0,
    });

    const getBottleData = (product: ProductWithAttributes) => {
      const attribute = product.attributes.find(
        (attribute) => attribute.name === "bottle"
      );
      return attribute;
    };
    const getGlassData = (product: ProductWithAttributes) => {
      const attribute = product.attributes.find(
        (attribute) => attribute.name === "glass"
      );
      return attribute;
    };
    const minVolumePrice = (attributes: Attribute[]) => {
      return Math.min(
        ...attributes.map((attribute: Attribute) => attribute.price)
      );
    };
    const maxVolumePrice = (attributes: Attribute[]) => {
      return Math.max(
        ...attributes.map((attribute: Attribute) => attribute.price)
      );
    };
    //get order data from order modal
    const getOrderData = (
      listOrderDetail: OrderDetail[],
      orderInfor: OrderInfor
    ) => {
      listOrderDetailProp.value = listOrderDetail;
      orderInforProp.value = orderInfor;
      showOdering.value = false;
      shwoPurchase.value = true;
    };
    const navigateDeatilView = () => {
      router.push("/detail-infor/" + props.data.id);
    };
    return {
      showOdering,
      shwoPurchase,
      item,
      listOrderDetailProp,
      orderInforProp,
      getBottleData,
      getGlassData,
      minVolumePrice,
      maxVolumePrice,
      getOrderData,
      navigateDeatilView,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
