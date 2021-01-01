<template>
  <div class="d-flex justify-end green white--text pa-3">
    <h3 class="mt-1">{{ user.name }}</h3>
    <div v-if="!!user.photo">
      <v-img :src="user.photo" class="rounded-circle mx-3" max-width="50">
      </v-img>
    </div>
    <div v-else>
      <v-icon color="white" dark x-large class="mx-3">mdi-account-circle</v-icon>
    </div>
  </div>
</template>

<script>
import { verifyIsLogin, currentUser } from '../firebase/auth';
import { getUserByUid } from '../firebase/database';

export default {
  data: () => ({
    isLogin: false,
    user: {},
  }),
  methods: {
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            this.user = user;
          });
        },
        () => {
          this.isLogin = false;
        },
      );
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>
</style>
