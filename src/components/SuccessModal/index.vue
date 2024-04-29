<template>
  <div v-if="show" class="modal">
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
            </div>
            <div class="flex-row-between">
              <span class="title-name">Time</span>
              <p class="title-name">22:00 p.m; 4th 4/ 2024</p>
            </div>
          </div>
          <div class="list-items">
            <span class="title-name">Products</span>
            <div class="item">
              <span class="title-name">
                60 Sessantanni Limited Edition Italia champagne
              </span>
              <div class="flex-row-between">
                <h4>750ml bottle x2</h4>
                <p>$1000</p>
              </div>
            </div>
          </div>
          <div class="flex-row-between total">
            <span class="title-name">Total</span>
            <h3>$2000</h3>
          </div>
        </div>
        <div class="new-order">
          <a-button>New order</a-button>
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

<style lang="scss" scoped>
@import "./style.scss";
</style>
