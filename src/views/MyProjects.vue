<template>
  <div>
    <v-row class="d-flex justify-space-between ma-5">
      <h2>Mis proyectos</h2>
      <div class="text-center">
        <h3>Nuevo proyecto</h3>
        <v-btn class="ma-2" fab dark color="green">
          <v-icon dark @click="addProyect"> mdi-plus </v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-row>
    </v-row>
    <NoProjects/>
  </div>
</template>

<script>
import NoProjects from '../components/NoProjects.vue';

export default {
  data: () => ({
    user: {},
  }),
  components: {
    NoProjects,
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
