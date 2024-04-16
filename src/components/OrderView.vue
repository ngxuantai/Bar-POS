<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="content">
        <div class="title">
          <div>
            <h4>Order #10</h4>
          </div>
          <close-outlined @click="close" />
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
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
