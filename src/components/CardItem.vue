<template>
  <div class="card-container">
    <div class="img-container">
      <img src="../assets/image/card-image.png" alt="item-image" />
    </div>
    <div class="content">
      <div class="infor">
        <h4>60 Sessantanni Limited Edition Italia champagne</h4>
        <div class="wine-capacity">
          <div>
            <img src="../assets/icon/Champagne.png" alt="champagne" />
            150ml
          </div>
          <div>
            <img src="../assets/icon/BeerBottle.png" alt="beerbottle" />
            750ml
          </div>
        </div>
      </div>
      <div class="price">
        <h3>$1000</h3>
        <div class="btn-container">
          <a-button>?</a-button>
          <a-button @click="showModal">+</a-button>
          <modal :show="visible" @closeModal="closeModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  setup() {
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const closeModal = () => {
      visible.value = false;
    };
    return {
      visible,
      showModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
.card-container {
  width: auto;
  height: 189px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.img-container {
  width: auto;
  height: 170px;
}
.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
}
.infor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.infor h4 {
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  margin: 0;
}
.wine-capacity {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.wine-capacity div {
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  padding: 0 12px;
}
.wine-capacity div:nth-child(1) {
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
  display: flex;
  gap: 20px;
}
.btn-container button:nth-child(1) {
  color: #fff;
  border: 1px solid #cacaca;
  background: #ffffff1a;
}
.btn-container button:nth-child(2) {
  background: linear-gradient(
    268.43deg,
    #fdeec3 3.58%,
    #efdcac 49.93%,
    #dcc29e 98.97%
  );
}

.ant-modal-content {
  padding: 38px 45px;
}
</style>
