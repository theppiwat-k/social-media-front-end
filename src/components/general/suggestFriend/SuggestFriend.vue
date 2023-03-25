<script setup>
import { onMounted, reactive } from 'vue';
import FriendService from '../../../services/friend.service';
import getAvartar from '../../../utils/getAvatar';

const state = reactive({
    suggestFriends: []
})

const emit = defineEmits(['suggestCount'])

const getSuggestFriend = async () => {
    await FriendService.getSuggestFriend().then((response) => {
        if (response.data.data.length > 0) {
            const friends = response.data.data.map(friend => {
                return { ...friend, avatar: getAvartar(friend) }
            })
            state.suggestFriends = friends
            emit('suggestCount', state.suggestFriends.length)
        } else {
            emit('suggestCount', 0)
        }
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
    <div v-if="state.suggestFriends.length > 0" class="suggest-box">
        <div v-for="friend in state.suggestFriends" :key="friend.id" class="d-flex justify-content-between mb-4">
            <img class="rounded-circle" :src="friend.avatar" alt="profile image" />
            <h5> {{ friend.username }} </h5>
            <button type="button" class="btn btn-primary" @click="sendFriendRequest(friend.id)">Send Friend</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.suggest-box {
    background: white;
    padding: 13px 16px;

    img {
        width: 40px;
        height: 40px;
    }

}
</style>