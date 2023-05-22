<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import PostService from "../../../../services/post.service";

const props = defineProps({
    postId: { type: String, required: true },
    users: { type: Array, default: () => [] }
})

const store = useStore();

const users = ref(
    props.users
)
const liked = computed(() => {
    const existInUsers = users.value.find(user => user.user === store.state.userInformation.id)
    if (existInUsers) return true
    return false
})

const likePost = async (postId) => {
    const body = {
        postId: postId,
        userId: store.state.userInformation.id
    }
    await PostService.likePost(body).then((response) => {
        users.value.push({
            user: store.state.userInformation.id
        })
    }).catch((error) => {
        console.log(error)
    })
}

</script>

<template>
    <div>
        <span v-for="user in users" :key="user.id">{{ user.user }}</span>
        <button type="button" :disabled="liked" @click="likePost(props.postId)">Like</button>
    </div>
</template>

<style lang="scss" scoped></style>
