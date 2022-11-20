<script>
import LeftSide from "./LeftSide.vue";
import RigthSide from "./RigthSide.vue";
import Content from "./Content.vue";
import Header from "./Header.vue";
import "../../assets/global.css";

export default {
  components: { LeftSide, Content, RigthSide, Header },
  created() {
  },
  computed: {
  },
  data() {
    return {
      information: "",
    };
  },
};
</script>

<template>
  <Header />
  <div class="layout-row">
    <div class="left-bar">
      <LeftSide />
    </div>
    <div class="content">
      <Content />
    </div>
    <div class="rigth-bar">
      <RigthSide />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-row {
  display: flex;
  background: #f8fafb;
  margin-top: 50px;

  .left-bar {
    flex: 1;
  }

  .content {
    flex: 2;
  }

  .rigth-bar {
    flex: 1;
  }
}
</style>
