<script setup>
import { reactive, onMounted } from 'vue'
import FriendService from '../../../services/friend.service';

const state = reactive({
  requests: [
  ]
})

const emit = defineEmits(['requestCount'])

const getNewFriendRequest = async () => {
  await FriendService.getNewFriendReuest().then((response) => {
    const requestData = response.data.data
    requestData.forEach(element => {
      const requester = element.requester
      const requestBody = {
        id: element._id,
        requesterId: requester.id,
        name: requester.username.charAt(0).toUpperCase() + requester.username.slice(1),
        information: new Date(element.createdAt).toLocaleDateString()
      }
      state.requests.push(requestBody)
    });
    emit('requestCount', state.requests.length)
  }).catch((error) => {
    console.error(error);
  });
}

const acceptNewFriendRequest = async (id, requesterId) => {
  await FriendService.acceptNewFriendRequest(id, requesterId).then((respone) => {
  }).catch((error) => {
    console.error(error);
  })
}

const rejectNewFriendRequest = async (id) => {
  await FriendService.rejectNewFriendRequest(id).then((respone) => {

  }).catch((error) => {
    console.error(error);
  })
}
onMounted(() => {
  getNewFriendRequest();
})


</script>
<template>
  <div v-for="req in state.requests" :key="req.id" class="request-box mb-4">
    <div class="information mb-2">
      <img class="rounded-circle" src="../../../assets/profile.jpg" alt="" />
      <h5 class="req-name">{{ req.name }}</h5>
      <br>
      <span class="req-info">Friend Requst</span>
      <br>
      <span class="req-date">{{ req.information }}</span>
    </div>
    <div class="actions">
      <button type="button" class="btn btn-primary"
        @click="acceptNewFriendRequest(req.id, req.requesterId)">Accecpt</button>
      <button type="button" class="btn btn-outline-secondary" @click="rejectNewFriendRequest(req.id)">Decline</button>
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
      margin-right: 10px;
    }

    .req-name {
      display: inline-block;
      margin: 0 !important;
    }

    .req-info {
      font-weight: 500;
      margin-left: 5px;
    }

    .req-date {
      margin-left: 5px;

    }
  }

  .actions {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
