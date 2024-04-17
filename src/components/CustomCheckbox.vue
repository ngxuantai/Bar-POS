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

<style scoped>
.custom-checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 14px;
  width: 14px;
  background-color: #fff;
  border: 0.5px solid #d9d9d9;
  border-radius: 2px;
}

.custom-checkbox input:checked ~ .checkmark {
  border: none;
  background-color: #e8b357;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 4.5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
