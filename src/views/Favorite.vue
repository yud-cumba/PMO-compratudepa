<template>
    <div class="pa-7 mx-10 my-5">
        <h1>Mis proyectos favoritos </h1>
        <h3>Aquí podras visualizar los proyectos a los que le diste corazoncito</h3>
        <ProjectCards :projects="myFavorites"/>
    </div>
</template>

<script>
import { getFavoritesByUserId } from '../firebase/database';
import { currentUser } from '../firebase/auth';
import ProjectCards from '../components/ProjectCards.vue';

export default {
  data: () => ({
    myFavorites: [],
  }),
  components: {
    ProjectCards,
  },
  watch: {
    myFavorites() {
      getFavoritesByUserId(currentUser().uid)
        .then((favorites) => { this.myFavorites = favorites; });
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    getFavoritesByUserId(currentUser().uid)
      .then((favorites) => { this.myFavorites = favorites; });
  },

};
</script>

<style lang="scss" scoped>

</style>
