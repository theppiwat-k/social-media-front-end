<script setup>
import HeaderPage from "./HeaderPage.vue";
import "../../assets/global.css";


</script>

<template>
  <HeaderPage />
  <div class="layout-row">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.layout-row {
  display: flex;
  margin-top: 50px;
}
</style>