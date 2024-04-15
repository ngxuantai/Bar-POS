<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="title">
        <div>
          <h4>Order #10</h4>
        </div>
        <close-outlined @click="close" />
      </div>
      <div class="content">
        <div class="thanks">
          <span>Thank you for your purchase</span>
        </div>
        <div class="list-items">
          <div class="items flex-between">
            <div class="img-container">
              <img src="../assets/image/img.png" alt="item-image" />
            </div>
            <div class="infor">
              <h2>60 Sessantanni Limited Edition Italia champagne</h2>
              <div class="type flex-between">
                <h4>By the bottle 750ml x1</h4>
                <p>$1000</p>
              </div>
              <div class="type flex-between">
                <h4>By the glass 150ml x1</h4>
                <p>$300</p>
              </div>
              <div class="total flex-between">
                <h4>Total</h4>
                <p>$1300</p>
              </div>
            </div>
          </div>
        </div>
        <div class="new-order">
          <a-button><span>New order</span></a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    CloseOutlined,
  },
  setup(props, { emit }) {
    const close = () => {
      emit("closeModal");
    };
    return {
      close,
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
  background-color: #fff;
  border: 1px solid #888;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
}

.title {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 28px; */
}
.title > div {
  height: 40px;
  padding: 12px;
  border-radius: 3px;
  background: #f5f5f5;
  align-content: center;
}
.title > div > h4,
.title > span {
  font-family: Merriweather;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  margin: 0;
  align-content: center;
}

.content {
  width: 466px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;
}
.thanks span {
  font-family: Newsreader;
  font-size: 24px;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: -0.4000000059604645px;
}

.list-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.items {
  width: 100%;
  gap: 12px;
}

.img-container {
  width: 91px;
  height: 114px;
}
.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.infor {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.infor h2,
.infor h4,
.infor p {
  margin: 0;
}
.infor h2 {
  font-family: Newsreader;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
}

.type h4,
.type p {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  color: #afafaf;
}

.total h4,
.total p {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4000000059604645px;
  text-align: left;
  color: #4d4c4c;
}

.new-order > button {
  width: 100%;
  height: 40px;
  background: #fae6bb;
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-order > button span {
  font-family: Newsreader;
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: -0.4000000059604645px;
  color: #051a38;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
