<template>
<div>
  <v-parallax src="../assets/sala.png"
  class="initial-search d-flex justify-center align-center">
    <v-card color="rgb(255, 255, 255, 0.7)" width="600">
      <v-row  class="mx-2">
        <v-text-field
          class="mt-5 mx-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por ubicacion"
          style="width: 350px"
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
        <div>
          <v-select
            v-model="rooms"
            class="mt-2 mx-2 pb-0 select-price"
            :items="['1 dormitorio', '2 dormitorios', '3 dormitorios', '4 dormitorios']"
            label="Número de habitaciones"
            style="width: 230px"
            dense
            outlined
            color="green"
          ></v-select>
          <v-select
            v-model="rooms"
            class="mx-2 pb-0 select-price"
            :items="['1 dormitorio', '2 dormitorios', '3 dormitorios', '4 dormitorios']"
            label="Número de pisos"
            style="width: 230px"
            dense
            outlined
            color="green"
          ></v-select>
        </div>
        <FilterPrice :setPrice="setPrice"/>
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
import FilterPrice from '../components/FilterPrice.vue';

import inm from '../data/inmobiliarias.json';

export default {
  name: 'Home',
  components: {
    FilterPrice,
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
      typePrice: 'Soles',
      inmobiliarias,
      search: '',
      prices: {
        min: 2000, max: 20000,
      },
      rooms: false,
    };
  },
  methods: {
    setPrice(price) {
      this.prices = price;
    },
    searchInMap() {
      this.$router.push({
        path: '/maps',
        query: {
          district: this.search,
          prices: this.prices,
          typePrice: this.typePrice,
          rooms: this.rooms ? this.rooms.substr(0, 1) : false,
        },
      });
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
