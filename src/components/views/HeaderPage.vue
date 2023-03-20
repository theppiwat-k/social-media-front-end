<script setup>

import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import { onMounted } from "vue";
import AuthenticationService from "../../services/authentication.service";

const store = useStore();
const router = useRouter();

const onLogout = async () => {
  store.dispatch('logout');
  await AuthenticationService.logout(store.state.userInformation).then(() => {
    localStorage.removeItem('token')
    router.push("/login");
  }).catch()
}

onMounted(async () => {
  await store.dispatch('userInformation')
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" @click="$router.push('main')"><img src="../../assets/logo.svg" class="img-fluid"
          alt="logo-image" width="30" /></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <h6 class="nav-link active" style="margin: 0 !important">
              Social Media
            </h6>
          </li>
        </ul>
        <h4 style="margin-right: 1rem;"> {{ store.state.userInformation.username }}</h4>
        <button type="button" class="btn btn-outline-secondary me-2" @click="onLogout()">Logout</button>
        <img src="../../assets/profile.jpg" class="img-fluid rounded-circle" alt="logo-image"
          style="margin-left: 10px;width: 30px;height: 30px;" />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background: white;
}

.navbar-brand {
  cursor: pointer;
}
</style>
