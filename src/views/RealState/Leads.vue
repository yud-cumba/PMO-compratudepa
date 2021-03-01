<template>
<div class="d-flex justify-center align-center" >
    <v-card class="ma-12 pa-5">
        <h2 class="pb-5">Leads</h2>
        <v-data-table
    :headers="headers"
    :items="clients"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>

    </v-card>
</div>
</template>

<script>
import { getUserByUid, getLeadsMyProjects } from '../../firebase/database';
import { currentUser } from '../../firebase/auth';

export default {
  data: () => ({
    clients: [],
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        value: 'name',
      },
      { text: 'Correo', value: 'email' },
      { text: 'Celular', value: 'phone' },
    ],
  }),
  methods: {
    getLeads() {
      getUserByUid(currentUser().uid)
        .then((user) => {
          if (user.projects) {
            const projectIds = Object.values(user.projects);
            return projectIds;
          }
          return false;
        })
        .then((resp) => {
          if (resp) {
            return Promise.all(resp.map((id) => getLeadsMyProjects(id)));
          }
          return false;
        })
        .then((el) => console.log(el));
    },
  },
  created() {
    this.$store.commit('layout/SET_LAYOUT', 'realState-layout');
  },
};
</script>

<style lang="scss" scoped>

</style>
