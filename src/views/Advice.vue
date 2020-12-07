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
        <Stepper/>
      </v-tab-item>
      <v-tab-item>
        <Stepper/>
      </v-tab-item>
      <v-tab-item>
        <Stepper/>
      </v-tab-item>
    </v-tabs-items>
    </div>
  </div>
</template>

<script>
import WithoutLogin from '../components/WithoutLogin.vue';

import { verifyIsLogin, logout } from '../firebase/auth';
import Stepper from '../components/Stepper.vue';

export default {
  components: {
    WithoutLogin,
    Stepper,
  },
  data: () => ({
    isLogin: false,
    tab: null,
    items: [
      '1 Checklist Documentario', '2 Crédito Hipotecario', '3 Buenas prácticas',
    ],
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
