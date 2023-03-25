<script setup>
defineProps({
  username: { type: String, required: true },
  message: { type: String, required: true },
  avatar: { type: String, required: true },
})
</script>

<template>
  <div class="feed-news rounded-custom">
    <div class="information mb-3">
      <div>
        <img class="rounded-circle" :src="avatar" alt="profile image" />
        <h5> {{ username }}</h5>
      </div>
      <em class="bi bi-three-dots"></em>
    </div>
    <div class="feed-content">{{ message }}</div>
  </div>
</template>

<style lang="scss" scoped>
h5 {
  display: inline-block;
  margin-left: 1rem;
}

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
