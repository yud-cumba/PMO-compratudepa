<template>
  <div >
    <div v-if="!isLogin">
       <WithoutLogin/>
    </div>
    <div class="px-12 mx-12 pt-5" v-else>
      <v-btn @click="logout">
        Cerrar sesión
      </v-btn>
      <!-- <h2 class="ma-6">Tips</h2> -->
      <v-tabs
      v-model="tab"
      background-color="green"
      color="black"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Credit/>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
      <v-tab-item>
      </v-tab-item>
    </v-tabs-items>
    </div>
  </div>
</template>

<script>
import WithoutLogin from '../components/WithoutLogin.vue';
import Credit from '../components/Credit.vue';

import { verifyIsLogin, logout } from '../firebase/auth';

export default {
  components: {
    Credit,
    WithoutLogin,
  },
  data: () => ({
    isLogin: false,
    tab: null,
    items: [
      '1 CRÉDITO HIPOTECARIO', '2 BUENAS PRÁCTICAS MINUTA', '3 CHECKLIST DOCUMENTACIÓN',
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
    this.$store.commit('SET_LAYOUT', 'public-layout');
    this.verify();
  },
};
</script>

<style lang="scss" scoped>

</style>
