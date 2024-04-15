<template>
  <div class="footer">
    <h3>Order #10</h3>
    <a-button class="btn-container">
      <a-badge count="5">
        <div class="img-container">
          <img src="../assets/icon/Cart.png" alt="cart" />
        </div>
      </a-badge>
      <span class="text">View orders</span>
    </a-button>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.footer {
  width: 100%;
  height: 92px;
  position: sticky;
  bottom: 0;
  left: 276px;
  padding: 20px 90px;
  background-color: #181818;
  /* box-shadow: 0.5px 0px 5px 0px #fff; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-family: Newsreader;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
  color: #fff;
}
.btn-container {
  padding: 29px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: none;
  background: #fae6bb;
}
.img-container {
  width: 32px;
  height: 32px;
}
.img-container img {
  /* width: 100%;
  height: 100%; */
  object-fit: cover;
}
.text {
  font-family: Newsreader;
  font-size: 20px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: -0.4000000059604645px;
  text-align: center;
}
</style>
