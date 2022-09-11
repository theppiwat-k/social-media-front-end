<script>
import Request from "../general/request/Request.vue";
import Contact from "../general/contact/Contact.vue";

export default {
  components: { Request, Contact },
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<template>
  <div class="lay-out">
    <div class="requests">
      <h6>REQUESTS</h6>
      <span class="badge bg-primary rounded-pill">2</span>
      <Request />
    </div>
    <div class="contact">
      <h6>CONTACTS</h6>
      <span class="badge bg-primary rounded-pill">2</span>
      <Contact />
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
  padding: 2rem 2rem 4rem 2rem;
  row-gap: 2rem;
  background: #f8fafb;
  width: 344px;
  height: 100vh;
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
</style>
