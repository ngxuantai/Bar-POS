<template>
  <a-layout class="container">
    <div class="sider-container">
      <sidebar-category />
    </div>
    <a-layout class="layout-container">
      <div class="wine-container">
        <div class="back">
          <a-button>
            <img src="../../assets/icon/ArrowLeft.png" alt="arrow-left" />
            Back
          </a-button>
        </div>
        <div class="wine-infor">
          <div class="img-container">
            <img src="../../assets/image/img.png" alt="item-image" />
          </div>
          <div class="information">
            <div class="infor">
              <h3>60 Sessantanni Limited Edition Italia champagne</h3>
            </div>
            <div class="detail">
              <a-row class="detail-row-first">
                <a-col :span="8">
                  <div class="detail-content">
                    <img src="../../assets/icon/Grapes.png" alt="grapes" />
                    <span>Primitivo</span>
                  </div>
                </a-col>
                <a-col :span="8">
                  <div class="detail-content">
                    <img src="../../assets/icon/Grapes.png" alt="grapes" />
                    <span>Primitivo</span>
                  </div>
                </a-col>
                <a-col :span="8">
                  <div class="detail-content">
                    <img src="../../assets/icon/Grapes.png" alt="grapes" />
                    <span>Primitivo</span>
                  </div>
                </a-col>
              </a-row>
              <a-row class="detail-row-second">
                <a-col :span="12">
                  <div class="detail-content">
                    <img src="../../assets/icon/Grapes.png" alt="grapes" />
                    <span>Primitivo</span>
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="detail-content">
                    <img src="../../assets/icon/Grapes.png" alt="grapes" />
                    <span>Primitivo</span>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit
              </p>
            </div>
            <div class="add-container">
              <div class="wine-capacity">
                <div>
                  <img src="../../assets/icon/Champagne.png" alt="champagne" />
                  150ml
                </div>
                <div>
                  <img
                    src="../../assets/icon/BeerBottle.png"
                    alt="beerbottle"
                  />
                  750ml
                </div>
              </div>
              <div class="add">
                <h4>From <span>$300</span></h4>
                <a-button>+</a-button>
              </div>
            </div>
          </div>
        </div>
        <div class="story">
          <h3>The story of origin</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore
          </p>
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { ref } from "vue";
import SidebarCategory from "@/components/SidebarCategory.vue";

export default {
  components: {
    SidebarCategory,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
