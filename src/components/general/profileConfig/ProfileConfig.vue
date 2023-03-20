<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import UserService from '../../../services/user.service'

const store = useStore();
const userId = store.state.userInformation.id
const userName = store.state.userInformation.username

const state = reactive({
   userBody: {
      id: userId,
      username: userName
   },
   action: 'view'
})

const updateUserProfile = async () => {
   const body = JSON.parse(
      JSON.stringify(state.userBody)
   );
   await UserService.updateUserProfile(body).then((response) => {
      store.dispatch('userInformation')
      state.action = 'view'
   }).catch((error) => {
      alert('Fails')
      console.error(error)
   })
}
</script>

<template>
   <div class="profile-setting">
      <h1>Profile Settings</h1>
      <p style="color: rgb(134, 142, 150);">You can config your profile here</p>
      <form>
         <div class="profile-img">
            <span>Profile image</span>
            <p style="color: rgb(134, 142, 150);">Suggestion 256 x 256</p>
            <div class="text-left">
               <img src="../../../assets/profile.jpg" width="150" height="150" class="rounded" alt="...">
            </div>
            <div class="form-group">
               <label for="exampleFormControlFile1">Example file input</label>
               <input id="exampleFormControlFile1" type="file" class="form-control-file">
            </div>
         </div>
         <div class="profile-username">
            <div class="form-group">
               <label for="userNameInput">User Name</label>
               <input v-if="state.action === 'view'" id="userNameInputReadonly" readonly
                  :value="store.state.userInformation.username" type="text" class="form-control" placeholder="usename">
               <input v-else id="userNameInput" v-model="state.userBody.username" type="text" class="form-control"
                  placeholder="usename">
            </div>
         </div>
         <div class="profile-email">
            <div class="form-group">
               <label for="emailInput">Email address</label>
               <input id="emailInput" readonly :value="store.state.userInformation.email" type="email" class="form-control"
                  placeholder="name@example.com">
            </div>
         </div>
         <button v-if="state.action === 'view'" type="button" class="btn btn-primary me-2"
            @click="state.action = 'edit'">Edit</button>
         <button v-else type="button" class="btn btn-warning me-2" @click="updateUserProfile()">Save</button>
         <button v-if="state.action === 'view'" type="button" class="btn btn-secondary" @click="$router.push('main')">Back</button>
         <button v-else type="button" class="btn btn-secondary"
            @click="state.action = 'view'">Cancel</button>
      </form>
   </div>
</template>

<style lang="scss" scoped>
.profile-setting {
   background-color: white;
   padding: 2rem 2rem 4rem 2rem;
   margin-left: 480px;

   form {
      div {
         margin-bottom: 1rem;

         label {
            margin-bottom: .5rem;
         }
      }
   }
}
</style>