<script setup>
import PostBoxModel from "../../../models/PostBoxModel";
import postService from "../../../services/post.service";
import Comment from "./commentPost/CommentPost.vue"
import Like from "./likePost/LikePost.vue"
import EditPost from "./editPost/EditPost.vue"

const emit = defineEmits(['getpost', 'refreshComment','refreshMessage']);

defineProps({
  postBox: PostBoxModel
})

const refreshComment = (value) => {
  emit('refreshComment', value)
}

const refreshMessage = (value) => {
  emit('refreshMessage', value)
}

const getPosts = () => {
  emit('getpost');
}

const deletePost = async (postId) => {
  await postService.deletePost(postId).then((response) => {
    getPosts();
  }).catch((error) => {
    console.error(error)
  })
}


</script>

<template>
  <div class="feed-news rounded-custom">
    <div class="information mb-3">
      <div>
        <img class="rounded-circle" :src="postBox.authorAvatar" alt="profile image" />
        <h5> {{ postBox.authorUsername }}</h5>
        {{ postBox.date.split('T') }}
      </div>
      <em v-if="postBox.access" id="dropdownAction" class="bi bi-three-dots" data-bs-toggle="dropdown"
        aria-expanded="false"></em>
      <ul class="dropdown-menu" aria-labelledby="dropdownAction">
        <li><a class="dropdown-item" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop' + postBox.id">Edit</a></li>
        <li><a class="dropdown-item" @click="deletePost(postBox.id)">Delete</a></li>
      </ul>
    </div>
    <div class="feed-content">{{ postBox.message }}</div>
    <div v-for="comment in postBox.comments" :key="comment.id"> {{ comment.message }} </div>
    <div class="feed-action">
      <Comment :post-id="postBox.id" @refreshcomment="refreshComment" />
      <Like :post-id="postBox.id" :users="postBox.likes" />
    </div>
    <EditPost :post-id="postBox.id" :message="postBox.message" @refreshmessage="refreshMessage" />
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
  justify-content: space-between;
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

  .feed-action {
    display: flex;
    column-gap: 1rem;
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

  .dropdown-item {
    cursor: pointer;
  }
}
</style>
