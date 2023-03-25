<script setup>
import Request from "../general/requestFriend/RequestFriend.vue";
import ContactFriend from "../general/contactFriend/contactFriend.vue";
import Suggest from "../general/suggestFriend/SuggestFriend.vue"
import { ref } from "vue";

const request = ref(0)
const contact = ref(0)
const suggest = ref(0)
const updateRequestCount = ((requests) => {
  request.value = requests
})

const updateContactCount = ((contacts) => {
  contact.value = contacts
})

const updateSuggestCount = ((suggests) => {
  suggest.value = suggests
})


</script>

<template>
  <div class="lay-out">
    <div class="requests">
      <h6>REQUESTS</h6>
      <span v-if="request > 0" class="badge bg-primary rounded-pill">{{ request }}</span>
      <h5 v-else class="no-request">No Request</h5>
      <Request @request-count="updateRequestCount" />
    </div>
    <div class="contact">
      <h6>CONTACTS</h6>
      <h5 v-if="contact === 0" class="no-contact">No Contact</h5>
      <ContactFriend @contact-count="updateContactCount" />
    </div>
    <div class="suggest">
      <h6>SUGGEST</h6>
      <Suggest @suggest-count="updateSuggestCount" />
      <h5 v-if="suggest === 0" class="no-request">No Suggest</h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h6 {
  color: #868e96;
}

.lay-out {
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;
  row-gap: 2rem;
  background: #f8fafb;
  width: 100%;
  height: 100%;
}

.lay-out:hover {
  overflow-y: scroll;
}

.lay-out::-webkit-scrollbar {
  width: .5em;
}

.lay-out::-webkit-scrollbar-track {
  background: #f8fafb;
}

.lay-out::-webkit-scrollbar-thumb {
  background-color: rgb(215, 211, 211);
  border-radius: 10px;
}

.requests {
  position: relative;
  width: 300px;

  .badge {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.contact {
  position: relative;
  width: 300px;

  .badge {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.suggest {
  position: relative;
  width: 300px;
}

.no-request {
  display: flex;
  justify-content: center;
}

.no-contact {
  display: flex;
  justify-content: center;
}
</style>
