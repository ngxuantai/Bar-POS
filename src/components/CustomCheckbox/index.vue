<template>
  <label class="custom-checkbox">
    <input type="checkbox" :checked="checked" @change="check" />
    <span class="checkmark"></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const check = () => {
      emit("check");
    };

    return {
      checked: props.status,
      check,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
