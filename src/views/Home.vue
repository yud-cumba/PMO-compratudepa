<template>
<div>
  <v-parallax src="../assets/main.png"
  class="initial-search d-flex justify-center align-center">
    <v-card color="rgb(255, 255, 255, 0.5)" width="600">
      <v-row  class="mx-2">
        <v-text-field
          class="mt-5 mx-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por ubicacion"
          single-line
          hide-details
          dense
          outlined
          color="green"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="searchInMap" class="ma-5 green">
          Buscar
        </v-btn>
      </v-row>
      <v-row  class="mx-2 d-flex">
        <v-select
          v-model="typePrice"
          class="mt-5 mx-2 select-price"
          :items="['Dólares', 'Soles']"
          label="Tipo de moneda"
          dense
          outlined
          color="green"
        ></v-select>
        <v-spacer></v-spacer>
        <v-text-field
          class="mt-5 mx-2 select-price"
          v-model="prices.min"
          label="Precio desde"
          hide-details
          dense
          outlined
          color="green"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          class="mt-5 mx-2 select-price"
          v-model="prices.max"
          label="Precio hasta"
          hide-details
          dense
          outlined
          color="green"
        ></v-text-field>
      </v-row>
    </v-card>
  </v-parallax>
  <Benefits/>
  <h2 class="px-6 mb-5">Proyectos más vendidos</h2>
  <ProjectCards :projects="inmobiliarias.slice(0, 5)"/>
</div>
</template>

<script>
import Benefits from '../components/BenefitsCards.vue';
import ProjectCards from '../components/ProjectCards.vue';
import inm from '../data/inmobiliarias.json';

export default {
  name: 'Home',
  components: {
    Benefits,
    ProjectCards,
  },
  data() {
    const inmobiliarias = inm.features.map((doc) => ({ id: doc.id, ...doc.properties }))
      .sort((a, b) => {
        if (a.Unidades_ofertadas_mes < b.Unidades_ofertadas_mes) {
          return 1;
        }
        if (a.Unidades_ofertadas_mes > b.Unidades_ofertadas_mes) {
          return -1;
        }
        return 0;
      });
    return {
      typePrice: '',
      inmobiliarias,
      search: '',
      prices: {
        max: '',
        min: '',
      },
    };
  },
  methods: {
    searchInMap() {
      this.$router.push({ path: '/maps', query: { district: this.search, prices: this.prices, typePrice: this.typePrice } });
    },
  },
};
</script>

<style lang="scss" scoped>
.initial-search{
 width: 100vw;
 height: 75vh;
//  background-image: url('../assets/main.png');
}
.select-price{
 width: 150px;
}
</style>
