<script setup>
import { onMounted, reactive } from 'vue';
import FriendService from '../../../services/friend.service';

const state = reactive({
    suggestFriends: []
})

const emit = defineEmits(['suggestCount'])

const getSuggestFriend = async () => {
    await FriendService.getSuggestFriend().then((response) => {
        state.suggestFriends = response.data.data
        emit('suggestCount', state.suggestFriends.length)
    }).catch((error) => {
        console.error(error)
    })
}

const sendFriendRequest = async (recipient) => {
    await FriendService.sendFriendRequest(recipient).then((response) => {
    }).catch((error) => {
        console.error(error)
    })
    getSuggestFriend();
}

onMounted(() => {
    getSuggestFriend();
})
</script>

<template>
    <div class="suggest-box">
        <div v-for="friend in state.suggestFriends" :key="friend.id" class="d-flex justify-content-between mb-4">
            <h5> {{ friend.username }} </h5>
            <button type="button" class="btn btn-primary" @click="sendFriendRequest(friend.id)">Send Friend</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.suggest-box {
    background: white;
    padding: 13px 16px;
}
</style>