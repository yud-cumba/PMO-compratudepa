<template>
  <div>
    <div class="d-flex justify-space-between ma-5">
      <h2>Mis proyectos</h2>
      <div class="text-center">
      <h3>Nuevo proyecto</h3>
      <v-btn class="ma-2" fab dark color="green">
        <v-icon dark @click="addProyect"> mdi-plus </v-icon>
      </v-btn>
      </div>
    </div>
    <Logout/>
  </div>
</template>

<script>
import Logout from '../components/Logout.vue';

export default {
  data: () => ({
    user: {},
  }),
  components: {
    Logout,
  },
  methods: {
    addProyect() {
      this.$router.replace('/addnew');
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'realState-layout');
  },
};
</script>

<style lang="scss" scoped>
</style>
