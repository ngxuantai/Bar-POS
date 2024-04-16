<template>
  <div class="container">
    <div class="backgroundlay"></div>
    <div class="overlay"></div>
    <div class="login-container">
      <div class="member">
        <p>Exclusive pricing benefits for our members</p>
        <a-input placeholder="Member ID" :bordered="false" class="member-id">
          <template #prefix>
            <img src="../../assets/icon/Edit.png" alt="edit" />
          </template>
        </a-input>
        <a-button><span>Continue as Member</span></a-button>
      </div>
      <div>or</div>
      <div class="guest">
        <a-button><span>Continue as Guest</span></a-button>
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

<style scoped>
@import "./style.css";
</style>
