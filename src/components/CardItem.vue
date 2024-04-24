<template>
  <div class="card-container" v-if="item">
    <div class="img-container" @click="navigateDeatilView">
      <img src="../assets/image/item-card-image.png" alt="item-image" />
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
        <img src="../assets/icon/Union.png" alt="plus" />
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
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import OrderModal from "./OrderModal.vue";
import SuccessModal from "./SuccessModal.vue";
import { DocumentData } from "firebase/firestore";

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

    const minVolumePrice = (attributes: any) => {
      return Math.min(...attributes.map((attribute: any) => attribute.price));
    };
    const maxVolumePrice = (attributes: any) => {
      return Math.max(...attributes.map((attribute: any) => attribute.price));
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
.card-container {
  width: 100%;
  min-height: 397px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  .img-container {
    width: 159px;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 0;
  h4 {
    min-height: 48px;
    font-family: Newsreader;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: #fff;
    margin: 0;
  }
}

.detail {
  min-height: 46px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  .first-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div:nth-child(1) {
      border-right: 1px solid #fff;
      padding-left: 0;
    }
  }
  .first-row div,
  .second-row div {
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    padding: 0 12px;
  }
}

.btn-container {
  width: 100%;
  button {
    width: 100%;
    height: 47px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(
      268.43deg,
      #fdeec3 3.58%,
      #efdcac 49.93%,
      #dcc29e 98.97%
    );
    border-radius: 0;
    border: none;
    font-family: Newsreader;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
    color: #051a38;
    &:hover,
    &:focus-visible {
      outline: none;
      color: #051a38;
    }
  }
}

@media screen and (min-width: 1500px) {
  .content {
    padding: 0 12px;
  }
}
</style>
