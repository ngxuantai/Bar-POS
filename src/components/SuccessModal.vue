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
          <div class="new-order">
            <a-button>New order</a-button>
          </div>
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
$font-family: "Newsreader";

.modal {
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
  background-color: #fff;
  border-radius: 6px;
}

.title {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
}

.content {
  margin: 0px 18px 9px 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.success {
  margin: 0 29px;
  width: 460px;
  height: 152px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.success span {
  font-family: $font-family;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-name {
  font-family: $font-family;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
}

.infor-order {
  display: flex;
  flex-direction: column;
}

.order {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.order p {
  margin: 0;
  color: #afafaf;
}

.list-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  h4,
  p {
    margin: 0;
    font-family: $font-family;
    font-weight: 400;
    text-align: left;
    color: #afafaf;
  }
  h4 {
    font-size: 14px;
    line-height: 22px;
  }
  p {
    font-size: 16px;
    line-height: 26px;
  }
}

.total {
  padding-top: 16px;
}
.total h3 {
  font-family: Newsreader;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  text-align: right;
  color: #051a38;
}

.new-order button {
  width: 100%;
  height: 52px;
  padding: 12px 16px;
  background: #051a38;
  border: none;
  border-radius: 3px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  font-family: $font-family;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  color: #fff;
  &:hover,
  &:focus {
    color: #fff;
  }
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
