<template>
  <label class="custom-checkbox">
    <input type="checkbox" :checked="checked" @change="check" />
    <span class="checkmark"></span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

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

    const checked = computed({
      get: () => props.status,
      set: (value) => {
        emit("update:status", value);
      },
    });

    return {
      checked,
      check,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
