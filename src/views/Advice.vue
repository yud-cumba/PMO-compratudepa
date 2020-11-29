<template>
  <div>
    <div v-if="!isLogin">
       <SignUp />
    </div>
    <div v-else>
      <v-btn @click="logout">
        Cerrar sesión
      </v-btn>
    </div>
  </div>
</template>

<script>
import SignUp from '../components/SignUp.vue';
import { verifyIsLogin, logout } from '../firebase/auth';

export default {
  components: {
    SignUp,
  },
  data: () => ({
    isLogin: false,
  }),
  methods: {
    logout,
    verify() {
      verifyIsLogin(() => {
        this.isLogin = true;
      }, () => {
        this.isLogin = false;
      });
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>

</style>
