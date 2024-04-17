<template>
  <div class="container">
    <div class="backgroundlay"></div>
    <div class="overlay"></div>
    <div class="login-container">
      <div class="member">
        <p>Exclusive pricing benefits for our members</p>
        <div class="member-id">
          <img src="../../assets/icon/Edit.png" alt="edit" />
          <a-input placeholder="Member ID" :bordered="false" />
        </div>
        <a-button>Continue as Member</a-button>
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

<style lang="scss" scoped>
@import "./style.scss";
</style>
