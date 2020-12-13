<template>
    <v-card-title class="text-center d-flex ">
      <v-img
        src="../assets/logoPMO.png"
        aspect-ratio="1"
        class="mr-auto"
        max-height="60"
        max-width="270"
      >
      </v-img>
      <div v-if="isLogin" class="d-flex mx-3">
        <h3 class="mt-2">{{ user.name }}</h3>
        <div v-if="!!user.photo">
          <v-img :src="user.photo" class="rounded-circle mx-3" max-width="50">
          </v-img>
        </div>
        <div v-else>
          <v-icon color="green" x-large class="mx-3">mdi-account-circle</v-icon>
        </div>
        <v-btn
          v-if="user.role==='inmobiliaria'"
          color="green"
          outlined
          class="mx-2"
          @click="$router.replace('/myprojects')"
        >
          Quiero publicar
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          color="green"
          outlined
          class="mx-2"
          @click="$router.replace('/login')"
        >
          Inicia sesión
        </v-btn>
        <v-btn
          color="green"
          outlined
          class="mx-2"
          @click="$router.replace('/signupInmb')"
        >
          Quiero publicar
        </v-btn>
      </div>
    </v-card-title>
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
