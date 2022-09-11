<script>
export default {
  created() {
    for (let index = 0; index < 3; index++) {
      let user = {
        id: index,
        message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        ipsa fuga, nulla ducimus sed, in delectus dolore ullam esse
        necessitatibus vitae repudiandae obcaecati quos reiciendis consectetur
        beatae maxime. Recusandae, corporis.`,
        profile: '../../../assets/profile.jpg',
      };
      this.userStatus.push(user);
    }
  },
  data() {
    return {
      userStatus: [],
    };
  },
};
</script>

<template>
  <div
    class="feed-news rounded-custom"
    v-for="status in userStatus"
    :key="status.id"
  >
    <div class="information mb-3">
      <img class="rounded-circle" src="../../../assets/profile.jpg" alt="" />
      <em class="bi bi-three-dots"></em>
    </div>
    <div class="feed-content">{{ status.message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.feed-news {
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
  width: 100%;
  height: 200px;
  background: white;
  padding: 13px 16px;
  font-weight: 600;
  .information {
    display: flex;
    justify-content: space-between;
  }
  .feed-content {
    line-height: 1.5rem;
  }
  img {
    width: 40px;
    height: 40px;
  }
  em {
    cursor: pointer;
  }
  em:hover {
    color: #5e9ff5;
  }
}
</style>
