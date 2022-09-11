<script>
export default {
  data() {
    return {
      request: [
        { id: 1, name: "Theppiwat Komolwat", information: "" },
        { id: 2, name: "Koshira Omakase", information: "" },
      ],
    };
  },
};
</script>
<template>
  <div class="request-box mb-4" v-for="req in request" :key="req.id">
    <div class="information mb-2">
      <img class="rounded-circle" src="../../../assets/profile.jpg" alt="" />
      <h5 class="req-name">{{ req.name }}</h5>
      <span class="req-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vero,
        eos saepe laudantium animi quisquam corrupti, facere cupiditate
        asperiores ea maiores blanditiis, pariatur mollitia laboriosam. Minus
        aliquam id nisi excepturi?</span>
    </div>
    <div class="actions">
      <button type="button" class="btn btn-primary">Accecpt</button>
      <button type="button" class="btn btn-outline-secondary">Decline</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.request-box {
  background: white;
  padding: 13px 16px;

  .information {
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }

    .req-name {
      display: inline-block;
      margin: 0 !important;
    }

    .req-info {
      margin-left: 5px;
    }
  }

  .actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
