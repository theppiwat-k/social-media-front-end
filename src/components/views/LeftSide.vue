<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
import getAvartar from '../../utils/getAvatar';

const store = useStore();
const avatar = computed(() => {
  return getAvartar(store.state.userInformation)
})

</script>

<template>
  <div class="lay-out">
    <div class="profile-box rounded-custom shadow-sm">
      <div class="profile-img rounded-custom">
        <img :src="avatar" class="img-fluid rounded-custom" alt="proflile-image" width="30" height="30" />
      </div>
      <div class="profile-name">
        <h5>{{ store.state.userInformation.username }}</h5>
        <h6 style="color: #868e96">{{ store.state.userInformation.email }}</h6>
      </div>
    </div>
    <div class="menu-box rounded-custom shadow-sm">
      <ul>
        <li role="link" @click="$router.push('profile')">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-file-earmark-person" viewBox="0 0 16 16">
              <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
            </svg>
          </div>
          <a>Profile</a>
        </li>
        <li>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear"
              viewBox="0 0 16 16">
              <path
                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path
                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
          </div>
          <a>Settings</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.lay-out {
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 4rem 2rem;
  row-gap: 2rem;
  background: #f8fafb;
  height: 100%;
  width: 480px;
}

.lay-out:hover {
  overflow-y: scroll;
}

.lay-out::-webkit-scrollbar {
  width: .0em;
}

.lay-out::-webkit-scrollbar-track {
  background: #f8fafb;
}

.lay-out::-webkit-scrollbar-thumb {
  background-color: rgb(215, 211, 211);
  border-radius: 10px;
}

.profile-box {
  display: flex;
  justify-content: start;
  align-items: center;
  background: white;
  column-gap: 1rem;
  padding: 2rem 1rem 2rem 2rem;

  .profile-img {
    width: 30px;
    height: 30px;
  }

  .profile-name {
    display: flex;
    flex-direction: column;
  }
}

.menu-box {
  background: white;

  ul {
    margin: 0 !important;
    padding: 1rem 0rem 1rem 0rem;

    li {
      display: flex;
      list-style-type: none;
      cursor: pointer;
      column-gap: 1rem;
      padding: 1rem 0rem 1rem 2rem;
      border-bottom: 2px solid #f7f8fa;
      border-left: 3px solid transparent;
      font-weight: 600;
      align-items: center;

      svg {
        width: 30px;
        height: 30px;
      }
    }

    li:hover {
      background: #fbfbfc;
      border-left: 3px solid #5e9ff5;
      border-right: 1px solid #f7f8fa;

      a {
        color: #5e9ff5;
      }

      svg {
        color: #5e9ff5;
      }
    }

    li:last-of-type {
      border-bottom: none;
    }
  }
}
</style>
