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
import { getClients } from '../firebase/database';

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
  created() {
    this.$store.commit('SET_LAYOUT', 'realState-layout');
    getClients()
      .then((clients) => {
        this.clients = clients;
      });
  },
};
</script>

<style lang="scss" scoped>

</style>
