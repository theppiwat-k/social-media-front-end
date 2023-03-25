<script setup>
import LeftSide from "./LeftSide.vue";
import RightSide from "./RightSide.vue";
import ContentPage from "./ContentPage.vue";
import "../../assets/global.css";


</script>

<template>
    <div class="left-bar">
      <LeftSide />
    </div>
    <div class="content">
      <ContentPage />
    </div>
    <div class="right-bar">
      <RightSide />
    </div>
</template>

<style lang="scss" scoped>
  .left-bar {
    flex: 1;
  }

  .content {
    flex: 2;
  }

  .right-bar {
    flex: 1;
  }
</style>
