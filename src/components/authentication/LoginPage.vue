<script>
import AuthenticationService from '../../services/authentication.service';

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      register: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      btnDisabled: true,
      isNotConfirm: false,
      errorMessage: '',
      errorMessageRegister: '',
      responseMessage: '',
    };
  },
  watch: {
    'register.email': {
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
  created() {
    this.$store.dispatch('authenticate');
    if (this.$store.state.isAuthenticated === true) {
      this.$router.push('/');
    }
  },
  methods: {
    onLogin() {
      if (this.login.email && this.login.password) {
        const body = {
          email: this.login.email,
          password: this.login.password,
        };
        AuthenticationService.login(body)
          .then((response) => {
            localStorage.setItem('token', response.data.data.token);
            this.$store.commit('authenticate', true);
            this.$store.dispatch('userInformation');
            this.$router.push('/');
          })
          .catch((error) => {
            this.$store.commit('authenticate', false);
            console.error(error);
            this.errorMessage = error.response.data.message;
          });
      }
    },
    onRegister() {
      const username = this.register.email.split(['@'])[0];
      const body = {
        username: username,
        password: this.register.password,
        email: this.register.email,
      };
      this.btnDisabled = true
      AuthenticationService.register(body)
        .then((response) => {
          const navLoginTap = this.$refs.navLoginTap
          navLoginTap.click();
          const message = response.data.message;
          this.responseMessage = message;
          this.errorMessageRegister = '';
          Object.assign(this.register, {
            email: '',
            password: '',
            confirmPassword: '',
          });
          this.btnDisabled = false
        })
        .catch((error) => {
          this.btnDisabled = false
          console.error(error);
          this.responseMessage = '';
          this.errorMessageRegister = error.response.data.message;
        });
    },
  },
};
</script>

<template>
  <div class="auth-warper">
    <div class="auth-box">
      <nav>
        <div id="nav-tab" class="nav nav-tabs" role="tablist">
          <button id="nav-login-tab" ref="navLoginTap" class="nav-link active" data-bs-toggle="tab"
            data-bs-target="#nav-login" type="button" role="tab" aria-controls="nav-login" aria-selected="true">
            LOGIN
          </button>
          <button id="nav-register-tab" ref="navRegisterTap" class="nav-link" data-bs-toggle="tab"
            data-bs-target="#nav-register" type="button" role="tab" aria-controls="nav-register" aria-selected="false">
            REGISTER
          </button>
        </div>
      </nav>
      <div id="nav-tabContent" class="tab-content">
        <div id="nav-login" class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-login-tab">
          <div class="login-line">
            <form novalidate @submit.prevent="onLogin">
              <div class="input-group mb-3">
                <span id="email" class="input-group-text">Email</span>
                <input v-model="login.email" type="email" class="form-control" aria-label="Sizing example input"
                  aria-describedby="email" autocomplete="username" />
              </div>
              <div class="input-group mb-3">
                <span id="password" class="input-group-text">Password</span>
                <input v-model="login.password" type="password" class="form-control" aria-label="Sizing example input"
                  aria-describedby="password" autocomplete="current-password" />
              </div>
              <p v-if="responseMessage" class="text-success">
                {{ responseMessage }}
              </p>
              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
              <div class="login-btn">
                <button type="submit" class="btn btn-primary">Login</button>
                <button type="button" class="btn btn-warning">
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="nav-register" class="tab-pane fade" role="tabpanel" aria-labelledby="nav-register-tab">
          <div class="register-line">
            <form @submit.prevent="onRegister">
              <div class="input-group mb-3">
                <span id="new-email" class="input-group-text">Email</span>
                <input v-model="register.email" type="email" class="form-control" aria-label="Sizing example input"
                  aria-describedby="new-email" autocomplete="username" />
              </div>
              <div class="input-group mb-3">
                <span id="new-password" class="input-group-text">Password</span>
                <input v-model="register.password" type="password" class="form-control"
                  aria-label="Sizing example input" aria-describedby="new-password" autocomplete="new-password" />
              </div>
              <div class="input-group mb-3">
                <span id="confirm-password" class="input-group-text">Confirm password</span>
                <input v-model="register.confirmPassword" type="password" class="form-control"
                  aria-label="Sizing example input" aria-describedby="confirm-password" autocomplete="new-password" />
              </div>
              <p v-if="errorMessageRegister" class="bs-light text-danger">
                {{ errorMessageRegister }}
              </p>
              <p v-if="isNotConfirm" class="bs-light text-danger">
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
