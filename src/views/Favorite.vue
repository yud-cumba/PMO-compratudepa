<template>
  <div class="pa-7">
    <h1>Mis proyectos favoritos</h1>
    <h3 class="my-6">
      Aquí podras visualizar los proyectos a los que le diste corazoncito
    </h3>
    <div v-if="errorFavorites" class="red--text pa-5">
      <NoProjects :message="errorFavorites"/>
    </div>
    <div v-else>
        <ProjectCards :projects="myFavorites"/>
    </div>
    <v-divider></v-divider>
    <h3 class="my-6">
      Aquí podras visualizar los proyectos ordenados según el número de
      estrellas que le diste
    </h3>
    <div v-if="errorStarts" class="red--text pa-5">
        <NoProjects :message="errorStarts"/>
    </div>
    <div v-else>
        <ProjectCards :projects="myStarts" />
    </div>
  </div>
</template>

<script>
import { getFavoritesByUserId, getRatingsByUserId } from '../firebase/database';
import { currentUser } from '../firebase/auth';
import { inmobiliariasById } from '../utils/projectMethods';
import ProjectCards from '../components/ProjectCards.vue';
import NoProjects from '../components/NoProjects.vue';

export default {
  data: () => ({
    myFavorites: [],
    myStarts: [],
    errorFavorites: false,
    errorStarts: false,
  }),
  components: {
    ProjectCards,
    NoProjects,
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    getFavoritesByUserId(currentUser().uid).then((favorites) => {
      this.myFavorites = favorites;
    }).catch((e) => { this.errorFavorites = e.message; });
    getRatingsByUserId(currentUser().uid).then((ratings) => {
      const projectsID = ratings.map((e) => Object.keys(e)[0]);
      this.myStarts = projectsID.map((projectID) => inmobiliariasById(projectID));
    }).catch((e) => { this.errorStarts = e.message; });
  },
};
</script>

<style lang="scss" scoped>
</style>
