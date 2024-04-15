<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="title">
        <h4>Order #10</h4>
        <close-outlined @click="close" />
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
