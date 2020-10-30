<template>
<div>
  <v-card class="initial-search d-flex justify-center align-center">
    <v-toolbar color="rgb(255, 255, 255, 0.5)" class="toolbar mx-12 px-12">
      <v-select
          class="mt-5"
          :items="items"
          label="Outlined style"
          dense
          outlined
          color="white"
      ></v-select>
      <v-spacer></v-spacer>
      <v-select
          class="mt-5"
          :items="items"
          label="Outlined style"
          dense
          outlined
      ></v-select>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        dense
        outlined
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="green">
        Buscar
      </v-btn>
    </v-toolbar>
  </v-card>
  <Benefits/>
  <ProjectCards title="Proyectos más vendidos"/>
</div>
</template>

<script>
import Benefits from '../components/BenefitsCards.vue';
import ProjectCards from '../components/ProjectCards.vue';

export default {
  name: 'Home',
  components: {
    Benefits,
    ProjectCards,
  },
  data() {
    return {
      search: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.initial-search{
 width: 100vw;
 height: 75vh;
 background-image: url('../assets/main.png');
}
.toolbar{
   width: 60vw;
   background: blanchedalmond;
 }
</style>
