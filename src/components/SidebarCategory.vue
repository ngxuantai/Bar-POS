<template>
  <div class="sidebar-category">
    <div class="logo">
      <p>Logo</p>
    </div>
    <div
      class="list-category"
      v-for="category in listCategory"
      :key="category.id"
    >
      <div class="item-category">
        <div class="img-container">
          <img src="../assets/image/wine-nav.png" alt="wine" />
        </div>
        <div class="content">
          <h4>{{ category.name }}</h4>
          <p>{{ category.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const listCategory = [
      {
        id: 1,
        name: "Red Wine",
        description: "Bold & Smooth",
      },
      {
        id: 2,
        name: "White Wine",
        description: "Light & Crisp",
      },
      {
        id: 3,
        name: "Champagne",
        description: "Bubbly & Festive",
      },
      {
        id: 4,
        name: "Sparkling",
        description: "Fizzy & Fun",
      },
      {
        id: 5,
        name: "Rosé",
        description: "Pink & Refreshing",
      },
    ];
    return {
      listCategory,
    };
  },
};
</script>

<style scoped>
.sider-category {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
}

.logo {
  width: 100%;
  height: 177px;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo p {
  font-family: Merriweather;
  font-size: 40px;
  font-weight: 400;
  background: linear-gradient(
    268.43deg,
    #fdeec3 3.58%,
    #efdcac 49.93%,
    #dcc29e 98.97%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.item-category {
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  padding: 28px 44px;
  gap: 24px;
}

.img-container {
  width: 43px;
  height: 54px;
  position: relative;
}
.img-container img {
  width: auto;
  height: 66px;
  position: relative;
  top: -12px;
  left: 4.5px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  color: #ffffff;
}
.content h4 {
  font-family: Merriweather;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  line-height: 26px;
}
.content p {
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  line-height: 16.8px;
}
</style>
