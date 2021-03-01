<template>
<v-app>
  <component :is="layout"></component>
</v-app>
</template>
<script>
import { mapState } from 'vuex';
import PublicLayout from './layouts/Public.vue';
import RealStateLayout from './layouts/RealState.vue';
import { getAllProjects } from './firebase/database';
// eslint-disable-next-line import/no-cycle
import { eventBus } from './main';

export default {
  components: { PublicLayout, RealStateLayout },
  data: () => ({
    loading: false,
  }),
  computed: {
    // Uso: mapState(moduleName, { state })
    ...mapState('layout', {
      layout: 'layout',
    }),
    // Uso: mapState(moduleName, { state })
  },
  async created() {
    this.loading = true;
    console.log('inicio del loading');
    const projects = await getAllProjects();
    eventBus.$emit('allProjects', projects);
    this.$store.commit('projects/SET_PROJECTS', projects);
    console.log('fin del loading');
    this.loading = false;
  },
};
</script>
