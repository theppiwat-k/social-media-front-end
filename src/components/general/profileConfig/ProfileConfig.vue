<script setup>
import { reactive, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import UserService from '../../../services/user.service'
import getAvartar from '../../../utils/getAvatar';
const URL = import.meta.env.VITE_API_URL;

const store = useStore();
const fileInput = ref(null)
const state = reactive({
   userBody: {
      id: store.state.userInformation.id,
      username: store.state.userInformation.username,
      avatar: `${URL}/avatars/${store.state.userInformation.id}.jpg`,
   },
   action: 'view',
   image: ''
})

const avatar = computed(() => {
   return getAvartar(store.state.userInformation)
})

const onFileChanged = ($event) => {
   const target = $event.target
   if (target && target.files) {
      fileInput.value = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileInput.value);
      reader.onload = () => {
         state.image = reader.result;
      };
   }
}

const updateUserProfile = async () => {
   let file = fileInput.value
   let formData = new FormData();
   formData.append('id', state.userBody.id)
   formData.append('username', state.userBody.username)
   if (fileInput.value) {
      formData.append('avatar', file);
   }
   await UserService.updateUserProfile(formData).then((response) => {
      store.dispatch('userInformation')
      state.image = null
      state.action = 'view'
   }).catch((error) => {
      alert('Fails')
      console.error(error)
   })
}

const onEditMode = () => {
   state.action = 'edit'
}

const onCancel = () => {
   state.image = null
   state.userBody.id = store.state.userInformation.id
   state.userBody.username = store.state.userInformation.username
   state.userBody.avatar = getAvartar(store.state.userInformation) 
   state.action = 'view'
}

watch(() => store.state.userInformation, (userInformation) => {
   // Update the userBody properties
   state.userBody.id = userInformation.id;
   state.userBody.username = userInformation.username;
   state.userBody.avatar = getAvartar(userInformation)
});



</script>

<template>
   <div class="profile-setting">
      <h1>Profile Settings</h1>
      <p style="color: rgb(134, 142, 150);">You can config your profile here</p>
      <form method="post" enctype="multipart/form-data">
         <div class="profile-img">
            <span>Profile image</span>
            <p style="color: rgb(134, 142, 150);">Suggestion 200 x 200</p>
            <div class="text-left">
               <img v-if="state.image" :src="state.image" class="img-fluid rounded profile-image" alt="profile image">
               <img v-else :src="avatar" class="img-fluid rounded profile-image" alt="profile image">
            </div>
            <div v-if="state.action === 'edit'" class="form-group">
               <label for="avatar">Image Input</label>
               <input id="avatar" type="file" class="form-control-file" name="avatar" accept="image/*"
                  @change="onFileChanged($event)">
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
            @click="onEditMode()">Edit</button>
         <button v-else type="button" class="btn btn-warning me-2" @click="updateUserProfile()">Save</button>
         <button v-if="state.action === 'view'" type="button" class="btn btn-secondary"
            @click="$router.push('main')">Back</button>
         <button v-else type="button" class="btn btn-secondary" @click="onCancel()">Cancel</button>
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

.profile-image {
   width: 200px !important;
   height: 200px !important;
}
</style>