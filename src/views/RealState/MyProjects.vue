<template>
  <div class="pa-4 mx-3">
    <v-row class="d-flex justify-space-between">
      <h1 >Mis proyectos</h1>
      <div class="text-center">
        <h3>Nuevo proyecto </h3>
        <v-btn class="ma-2" fab dark color="green">
          <v-icon dark @click="addProyect"> mdi-plus </v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-row v-if="projects.length>0">
      <ProjectCards :projects="projects" />
    </v-row>
    <v-row v-else>
    <NoProjects message="No se encontraron proyectos"/>
    </v-row>
  </div>
</template>

<script>
import NoProjects from '../../components/NoProjects.vue';
import { getProjectsByUserId, getUserByUid } from '../../firebase/database';
import { currentUser } from '../../firebase/auth';
import ProjectCards from '../../components/ProjectCards.vue';

export default {
  data: () => ({
    user: {},
    projects: [],
  }),
  components: {
    NoProjects,
    ProjectCards,
  },
  methods: {
    addProyect() {
      this.$router.push({
        path: '/addnew',
        query: {
          name: this.user.name,
        },
      });
    },
  },
  created() {
    this.$store.commit('layout/SET_LAYOUT', 'realState-layout');
    getUserByUid(currentUser().uid).then((user) => {
      this.user = user;
    });
    getProjectsByUserId(currentUser().uid).then((projects) => {
      this.projects = projects.map((e) => e.properties);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
