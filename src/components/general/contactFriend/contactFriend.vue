<script setup>

import { reactive, onMounted } from 'vue';
import FriendService from '../../../services/friend.service';
import getAvartar from '../../../utils/getAvatar';

const state = reactive({
  contacts: [
  ]
})

const getFriend = async () => {
  await FriendService.getFriend().then((response) => {
    if (response.data.data.length > 0) {
      const friends = response.data.data.map(friend => {
        return { ...friend, avatar: getAvartar(friend) }
      })
      state.contacts = friends
      emit('contactCount', state.contacts.length)
    } else {
      emit('contactCount', 0)
    }
  }).catch((error) => {
    console.error(error);
  })
}


const emit = defineEmits(['contactCount'])

onMounted(() => {
  getFriend();
})
</script>
<template>
  <div v-if="state.contacts.length > 0" class="contacts-box">
    <div v-for="contact in state.contacts" :key="contact.id" class="contacts mb-4">
      <img class="rounded-circle" :src="contact.avatar" alt="profile image" />
      <h5 class="contact-name">{{ contact.username }}</h5>
      <em class="bi bi-three-dots"></em>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contacts-box {
  background: white;
  padding: 13px 16px;
}

.contacts {
  display: flex;
  position: relative;
  align-items: center;
  column-gap: 1rem;

  img {
    width: 40px;
    height: 40px;
  }

  .contact-name {
    display: inline-block;
  }

  em {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  em:hover {
    color: #5e9ff5;
  }
}
</style>
