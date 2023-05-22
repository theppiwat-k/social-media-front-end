<script setup lang="ts">
import { reactive } from "vue"

import postService from "../../../../services/post.service";


const emit = defineEmits(['refreshmessage']);

const props = defineProps({
  postId: { type: String, required: true },
  message: { type: String, required: true },
})


const state = reactive({
  message: props.message,
  modalRef: null,
})

const editPost = async (postId) => {
  const body = {
    postId: postId,
    newMessage: state.message,
  }
  await postService.editPost(body).then((response) => {
    emit('refreshmessage', body)
    const element = document.getElementById(`closeModal${postId}`)
    element?.click()

  }).catch((error) => {
    console.error(error)
  })
}

</script>

<template>
  <!-- Modal -->
  <div :id="'staticBackdrop' + postId" :key="postId" class="modal fade" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="staticBackdropLabel" class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input v-model="state.message" type="text">
        </div>
        <div class="modal-footer">
          <button :id="'closeModal' + postId" type="button" class="btn btn-secondary"
            data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="editPost(postId)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
