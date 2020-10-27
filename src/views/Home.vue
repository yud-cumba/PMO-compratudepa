<template>
<div>
  <v-card class="initial-search d-flex justify-center align-center">
    <v-toolbar dark class="toolbar mx-12 px-12">
      <v-select
          class="mt-5"
          :items="items"
          label="Outlined style"
          dense
          outlined
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
</div>
</template>

<script>

export default {
  name: 'Home',
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
 height: 60vh;
 background-color: brown;
}
.toolbar{
   width: 60vw;
   background-color: blue;
 }
</style>
