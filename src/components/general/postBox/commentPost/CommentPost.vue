<script setup>
import { reactive } from "vue"
import { useStore } from "vuex";

import CommentPostModel from '../../../../models/CommentPostModel'
import PostService from "../../../../services/post.service";

const emit = defineEmits(['refreshcomment']);

defineProps({
    postId: { type: String, required: true },
})

const store = useStore();
const state = reactive({
    message: ''
})

const getComment = async (postId) => {
    await PostService.getCommentOfPostByOne(postId).then((response) => {
        emit('refreshcomment',response.data.data)
    }).catch((error) => {
        console.error(error)
    })
}

const commentPost = async (postId) => {
    const commentBody = new CommentPostModel(state.message, store.state.userInformation.id, postId)
    await PostService.commentPost(commentBody).then((response) => {
        state.message = ''
        getComment(postId)
    }).catch((error) => {
        console.error(error)
    })
}

</script>

<template>
    <div>
        <button type="button" @click="commentPost(postId)">Comment</button>
        <input v-model="state.message" type="text">
    </div>
</template>

<style lang="scss" scoped></style>
