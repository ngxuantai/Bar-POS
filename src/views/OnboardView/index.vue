<template>
  <div class="container">
    <div class="backgroundlay">
      <img src="../../assets/image/onboard.png" alt="background" />
    </div>
    <div class="overlay"></div>
    <div class="brand">
      <div class="logo">
        <img src="../../assets/image/logo.png" alt="logo" />
      </div>
      <div class="title-container">
        <h1>
          Where <span>good drinks</span> and <span>good times</span> collide
        </h1>
        <p>
          Ready for good drinks and good times?
          <br />
          We've got you covered!
        </p>
        <a-button @click="login">Order now</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const login = () => {
      router.push("/login");
    };

    return {
      login,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
