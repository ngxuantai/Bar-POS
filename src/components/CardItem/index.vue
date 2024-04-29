<template>
  <div class="card-container" v-if="item">
    <div class="img-container" @click="navigateDeatilView">
      <img src="../../assets/image/item-card-image.png" alt="item-image" />
    </div>
    <div class="content" @click="navigateDeatilView">
      <h4>{{ item.name }}</h4>
      <div class="detail">
        <div class="first-row">
          <div v-for="attribute in item.attributes" :key="attribute.id">
            <!-- <img
              :src="'../assets/icon/' + attribute.name + '.png'"
              alt="imae"
            /> -->
            {{ attribute.value }}ml {{ attribute.name }}
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
        @order="shwoPurchase = true"
      />
      <success-modal :show="shwoPurchase" @closeModal="shwoPurchase = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import OrderModal from "../../components/OrderModal/index.vue";
import SuccessModal from "../SuccessModal/index.vue";
import { DocumentData } from "firebase/firestore";
import { Attribute } from "types";

export default defineComponent({
  components: {
    OrderModal,
    SuccessModal,
  },
  props: {
    data: {
      type: Object as () => DocumentData,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const showOdering = ref<boolean>(false);
    const shwoPurchase = ref<boolean>(false);
    const item = ref(props.data);

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
    const navigateDeatilView = () => {
      router.push("/detail-infor/" + props.data.id);
    };
    return {
      showOdering,
      shwoPurchase,
      item,
      minVolumePrice,
      maxVolumePrice,
      navigateDeatilView,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
