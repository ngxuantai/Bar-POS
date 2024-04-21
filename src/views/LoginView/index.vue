<template>
  <div class="container">
    <div class="backgroundlay">
      <img src="../../assets/image/onboard.png" alt="background" />
    </div>
    <div class="overlay"></div>
    <div class="login-container">
      <div class="member">
        <p>
          Exclusive pricing benefits for our
          <span class="highlight">members</span>
        </p>
        <div class="member-id">
          <img src="../../assets/icon/Edit.png" alt="edit" />
          <a-input placeholder="Member ID" :bordered="false" />
        </div>
        <a-button @click="navigateHome">Continue as Member</a-button>
      </div>
      <div>Or</div>
      <div class="guest">
        <a-button>Continue as Guest</a-button>
        <div class="register">
          <p>
            Interested in being our member?
            <br />
            Register at the receptionist or via our website
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const navigateHome = () => {
      router.push("/home");
    };

    return {
      navigateHome,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
