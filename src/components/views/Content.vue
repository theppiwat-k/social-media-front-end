<script>
import StatusService from "../../services/status.service";
import FeedBox from "../general/feedbox/FeedBox.vue";

export default {
  components: { FeedBox },
  created() {
    const token = localStorage.getItem("token");
    const parseJwt = (tokenValue) => {
      var base64Url = tokenValue.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    };
    const data = parseJwt(token);
    this.email = data.data;
    this.getStatutus();
  },
  data() {
    return {
      email: "",
      message: "",
      stories: ["1", "2", "3", "4", "5", "6", "7"],
      statuses: [],
    };
  },
  methods: {
    postStatus() {
      let body = {
        username: this.email,
        message: this.message,
      };
      StatusService.postStatus(body)
        .then((response) => {
          this.getStatutus();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getStatutus() {
      StatusService.getStatutus()
        .then((response) => {
          this.statuses = [...response.data.data].reverse();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div class="lay-out">
    <div class="stoty-control">
      <div class="story-box rounded-custom" v-for="item in stories" :key="item">
        <img class="img-profile rounded-circle" src="../../assets/profile.jpg" alt="" />
        <img class="bg rounded-custom" src="../../assets/profile.jpg" alt="" />
      </div>
      <div class="see-all">
        <em class="bi bi-arrow-right-circle-fill"></em>
      </div>
    </div>
    <div class="status-control d-flex">
      <div class="status-box rounded-custom">
        <img class="rounded-circle" src="../../assets/profile.jpg" alt="profile" />
        <div class="text-area">
          <textarea class="text-area-status" v-model="message" placeholder="what's new"></textarea>
        </div>
        <button class="btn btn-primary btn-lg" @click="postStatus()" type="submit">
          <em class="bi bi-chat-square-dots-fill"></em>
        </button>
      </div>
    </div>
    <FeedBox v-for="status in statuses" :key="status.id" :username="status.username" :message="status.message" />
  </div>
</template>

<style lang="scss" scoped>
.lay-out {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  row-gap: 2rem;
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

.stoty-control {
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
