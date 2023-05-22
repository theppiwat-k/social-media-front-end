<script setup>
import { reactive, watch, onMounted } from "vue"
import { useStore } from "vuex";
import PostService from "../../services/post.service";
import getAvartar from "../../utils/getAvatar";
import PostBox from "../general/postBox/PostBox.vue";
import PostBoxModel from "../../models/PostBoxModel"


const store = useStore();
const state = reactive({
  id: store.state.userInformation.id,
  message: "",
  stories: ["1", "2", "3", "4", "5", "6", "7"],
  posts: [],
  avatar: getAvartar(store.state.userInformation)
})

const getPost = async () => {
  const body = {
    id: store.state.userInformation.id
  }
  await PostService.getPost(body)
    .then((response) => {
      state.message = ''
      if (response.data.data.length > 0) {
        state.posts = []
        response.data.data.forEach(postvalue => {
          const post = new PostBoxModel(postvalue, state.id)
          state.posts.push(post)
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const refreshComment = async (data) => {
  const { commentofpost, id } = data
  const postIndex = state.posts.findIndex(post => post.id === id)
  state.posts[postIndex].comments = commentofpost
}

const refreshMessage = async (data) => {
  const { newMessage, postId } = data
  const postIndex = state.posts.findIndex(post => post.id === postId)
  state.posts[postIndex].message = newMessage
}

const createPost = async () => {
  const body = {
    author: state.id,
    message: state.message,
  };
  await PostService.createPost(body)
    .then(() => {
      getPost();
    })
    .catch((error) => {
      console.error(error);
    });
}

watch(() => store.state.userInformation, (userInformation) => {
  state.id = userInformation.id;
  state.avatar = getAvartar(store.state.userInformation)
  if (state.id) {
    getPost();
  }
}, { deep: true });

onMounted(() => {
  if (state.id) {
    getPost();
  }
})

</script>

<template>
  <div class="lay-out">
    <div class="story-control">
      <div v-for="item in state.stories" :key="item" class="story-box rounded-custom">
        <img class="img-profile rounded-circle" src="../../assets/profile.jpg" alt="" />
        <img class="bg rounded-custom" src="../../assets/profile.jpg" alt="" />
      </div>
      <div class="see-all">
        <em class="bi bi-arrow-right-circle-fill"></em>
      </div>
    </div>
    <div class="status-control d-flex">
      <div class="status-box rounded-custom">
        <img class="rounded-circle" :src="state.avatar" alt="profile image" />
        <div class="text-area">
          <textarea v-model="state.message" class="text-area-status" placeholder="what's new"></textarea>
        </div>
        <button class="btn btn-primary btn-lg" type="submit" @click="createPost()">
          <em class="bi bi-chat-square-dots-fill"></em>
        </button>
      </div>
    </div>
    <template v-if="state.posts.length > 0">
      <PostBox v-for="post in state.posts" :key="post.id" :post-box="post" @getpost="getPost"
        @refresh-comment="refreshComment" @refresh-message="refreshMessage" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.lay-out {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  row-gap: 2rem;
  background: #f8fafb;
}

.status-box {
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  width: 100%;
  height: 70px;
  background: white;
  padding: 13px 16px;
  font-weight: 600;

  img {
    width: 30px;
    height: 30px;
  }

  .text-area {
    flex: 2;
  }

  .text-area-status {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: white;
    font-size: 16px;
    resize: none;
  }

  em {
    font-size: 1.25rem;
  }
}

.story-control {
  display: flex;
  column-gap: 2rem;
  max-width: 875px;
  position: relative;
}

.story-box {
  width: 120px;
  height: 170px;
  background: rgba(128, 128, 128, 0.426);
  position: relative;
  cursor: pointer;
  overflow-x: hidden;
  overflow-y: hidden;

  .img-profile {
    position: absolute;
    object-fit: cover;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    border: 3px solid #5e9ff5;
    z-index: 2;
  }

  .bg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition-duration: 0.8s;
    z-index: 1;
  }
}

.story-box:hover {
  .bg {
    transform: scale(1.02);
    opacity: 0.7;
  }
}

.see-all {
  position: absolute;
  right: -32px;
  top: 40%;

  em {
    cursor: pointer;
    font-size: 30px;
    transition: 0.1s;
  }

  em:hover {
    color: #5e9ff5;
    font-size: 31px;
  }
}
</style>
