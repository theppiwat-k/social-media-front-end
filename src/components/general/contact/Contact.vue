<script>
export default {
  data() {
    return {
      contacts: [
        { id: 1, name: "Theppiwat Komolwat", information: "" },
        { id: 2, name: "Koshira Omakase", information: "" },
      ],
    };
  },
};
</script>
<template>
  <div class="contacts-box">
    <div class="contacts mb-4" v-for="contact in contacts" :key="contact.id">
      <img
        class="rounded-circle"
        src="../../../assets/profile.jpg"
        alt=""
      />
      <h5 class="contact-name">{{ contact.name }}</h5>
      <em class="bi bi-three-dots"></em>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contacts-box {
  background: white;
  padding: 13px 16px;
}
.contacts {
  display: flex;
  position: relative;
  align-items: center;
  column-gap: 1rem;
  img {
    width: 40px;
    height: 40px;
  }
  .contact-name {
    display: inline-block;
  }

  em {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  em:hover {
    color: #5e9ff5;
  }
}
</style>
