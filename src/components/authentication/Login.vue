<script>
import AuthenticationService from "../../services/authentication.service";

export default {
  created() {
    console.log(this.$store.state.isAuthenticated)
    this.$store.dispatch("authenticate");
    if (this.$store.state.isAuthenticated === true) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      btnDisabled: true,
      isNotConfirm: false,
      errorMessage: "",
      errorMessageRegister: "",
    };
  },
  methods: {
    onLogin() {
      if (this.login.email && this.login.password) {
        let body = {
          username: this.login.email,
          password: this.login.password,
        };
        AuthenticationService.login(body)
          .then((response) => {
            console.log(response)
            this.$store.commit('authenticate', true)
            localStorage.setItem("token", response.data.data.token);
            this.errorMessage = "";
          })
          .catch((error) => {
            this.$store.commit('authenticate', false)
            console.error(error);
            this.errorMessage = error.response.data.message;
          });
      }
    },
    onRegister() {
      let email = this.register.email.split(["@"]);
      let body = {
        username: email[0],
        password: this.register.password,
        email: this.register.email,
      };
      AuthenticationService.register(body)
        .then((response) => {
          console.log(response.data);
          this.errorMessageRegister = "";
        })
        .catch((error) => {
          console.error(error.response.data.message);
          this.errorMessageRegister = error.response.data.message;
        });
    },
  },
  watch: {
    "register.email": {
      handler: function (after, before) {
        if (this.register.email) {
          if (this.isNotConfirm === false) {
            this.btnDisabled = true;
          } else {
            this.btnDisabled = false;
          }
        } else {
          this.btnDisabled = true;
        }
      },
      deep: true,
    },
    register: {
      handler: function (after, before) {
        if (this.register.password && this.register.confirmPassword) {
          if (this.register.password === this.register.confirmPassword) {
            this.isNotConfirm = false;
            if (this.register.email) this.btnDisabled = false;
          } else {
            this.isNotConfirm = true;
            this.btnDisabled = true;
          }
        } else {
          this.btnDisabled = true;
        }
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="auth-warper">
    {{ this.$store.state.isAuthenticated }}
    <div class="auth-box">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-login-tab" data-bs-toggle="tab" data-bs-target="#nav-login"
            type="button" role="tab" aria-controls="nav-login" aria-selected="true">
            LOGIN
          </button>
          <button class="nav-link" id="nav-register-tab" data-bs-toggle="tab" data-bs-target="#nav-register"
            type="button" role="tab" aria-controls="nav-register" aria-selected="false">
            REGISTER
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
          <div class="login-line">
            <form @submit.prevent="onLogin" novalidate>
              <div class="input-group mb-3">
                <span class="input-group-text" id="email">Email</span>
                <input type="email" class="form-control" aria-label="Sizing example input" aria-describedby="email"
                  autocomplete="username" v-model="login.email" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="password">Password</span>
                <input type="password" class="form-control" aria-label="Sizing example input"
                  aria-describedby="password" autocomplete="current-password" v-model="login.password" />
              </div>
              <p class="text-danger" v-if="errorMessage">{{ errorMessage }}</p>
              <div class="login-btn">
                <button type="submit" class="btn btn-primary">Login</button>
                <button type="button" class="btn btn-warning">
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="tab-pane fade" id="nav-register" role="tabpanel" aria-labelledby="nav-register-tab">
          <div class="register-line">
            <form @submit.prevent="onRegister">
              <div class="input-group mb-3">
                <span class="input-group-text" id="new-email">Email</span>
                <input type="email" class="form-control" aria-label="Sizing example input" aria-describedby="new-email"
                  autocomplete="username" v-model="register.email" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="new-password">Password</span>
                <input type="password" class="form-control" aria-label="Sizing example input"
                  aria-describedby="new-password" autocomplete="new-password" v-model="register.password" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="confirm-password">Confirm password</span>
                <input type="password" class="form-control" aria-label="Sizing example input"
                  aria-describedby="confirm-password" autocomplete="new-password" v-model="register.confirmPassword" />
              </div>
              <p class="text-danger" v-if="errorMessageRegister">
                {{ errorMessageRegister }}
              </p>
              <p class="text-danger" v-if="isNotConfirm">
                Your password and confirmation password do not match.
              </p>
              <div class="register-btn">
                <button type="submit" class="btn btn-primary" :disabled="btnDisabled">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-warper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: aliceblue;
}

.auth-warper .auth-box {
  width: 500px;
  min-height: 250px;
  background: white;

  .login-line {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 2rem;

    .login-btn {
      button {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }

  .register-line {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    padding: 2rem;

    .register-btn {
      button {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
}
</style>
