<script>

export default {
  created() {
    this.$store.dispatch('userInformation')
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    onLogout() {
      console.log(this.$store.state.userInformation)
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light border-bottom fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="../../assets/logo.svg" class="img-fluid" alt="logo-image"
          width="30" /></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <h6 class="nav-link active" style="margin: 0 !important">
              Social Media
            </h6>
          </li>
        </ul>
        <button type="button" class="btn btn-outline-secondary me-2" @click="onLogout()">Logout</button>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-primary" type="submit">Search</button>
        </form>
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
</style>
