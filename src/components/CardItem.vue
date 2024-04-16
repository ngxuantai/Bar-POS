<template>
  <div class="card-container">
    <div class="img-container">
      <img src="../assets/image/item-card-image.png" alt="item-image" />
    </div>
    <div class="content">
      <h4>60 Sessantanni Limited Edition Italia champagne</h4>
      <div class="detail">
        <div class="first-row">
          <div>
            <img src="../assets/icon/Glass.png" alt="glass" />
            150ml
          </div>
          <div>
            <img src="../assets/icon/Bottle.png" alt="bottle" />
            750ml
          </div>
        </div>
        <div class="second-row">
          <div>
            <img src="../assets/icon/Bottle.png" alt="bottle" />
            150ml
          </div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <a-button @click="showOdering = true">
        <span>$300 - $1000</span>
        <img src="../assets/icon/Union.png" alt="plus" />
      </a-button>
      <order-modal
        :show="showOdering"
        @closeModal="showOdering = false"
        @order="shwoPurchase = true"
      />
      <purchase-modal :show="shwoPurchase" @closeModal="shwoPurchase = false" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import OrderModal from "./OrderModal.vue";
import PurchaseModal from "./PurchaseModal.vue";

export default {
  components: {
    OrderModal,
    PurchaseModal,
  },
  setup() {
    const showOdering = ref<boolean>(false);
    const shwoPurchase = ref<boolean>(false);
    return {
      showOdering,
      shwoPurchase,
    };
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
  height: 397px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.img-container {
  width: 159px;
  height: 220px;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 0 12px;
}

.content > h4 {
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  color: #fff;
  margin: 0;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.first-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.first-row div,
.second-row div {
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  padding: 0 12px;
}

.first-row div:nth-child(1) {
  border-right: 1px solid #fff;
  padding-left: 0;
}

.price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price h3 {
  font-size: 28px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  margin: 0;
  background: linear-gradient(
    268.43deg,
    #fdeec3 3.58%,
    #efdcac 49.93%,
    #dcc29e 98.97%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-container {
  width: 100%;
}

.btn-container button {
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
  border: none;
}
.btn-container button span {
  font-family: Newsreader;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #051a38;
}
</style>
