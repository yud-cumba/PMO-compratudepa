<template>
  <div>
    <v-row class="d-flex justify-space-between ma-5">
      <h1 class="mx-3">Mis proyectos</h1>
      <div class="text-center">
        <h3>Nuevo proyecto </h3>
        <v-btn class="ma-2" fab dark color="green">
          <v-icon dark @click="addProyect"> mdi-plus </v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-row class="px-10" v-if="projects.length>0">
      <ProjectCards :projects="projects" />
    </v-row>
    <v-row v-else>
    <NoProjects/>
    </v-row>
  </div>
</template>

<script>
import NoProjects from '../components/NoProjects.vue';
import { getProjectsByUserId, getUserByUid } from '../firebase/database';
import { currentUser } from '../firebase/auth';
import ProjectCards from '../components/ProjectCards.vue';

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
    this.$store.commit('SET_LAYOUT', 'realState-layout');
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
