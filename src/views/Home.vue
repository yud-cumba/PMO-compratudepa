<template>
<div>
  <v-parallax src="../assets/sala.png"
  class="initial-search d-flex justify-center align-center">
    <v-card color="rgb(255, 255, 255, 0.7)" width="700">
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
            :items="itemsRooms"
            label="Número de habitaciones"
            style="width: 230px"
            dense
            outlined
            color="green"
          ></v-select>
          <v-select
            v-model="phase"
            class="mx-2 pb-0 select-price"
            :items="['En planos', 'En construcción', 'Entrega inmediata']"
            label="Fase del proyecto"
            style="width: 230px"
            dense
            outlined
            color="green"
          ></v-select>
        </div>
        <FilterPrice :setPrice="setPrice" :setType="setType"/>
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
import { getMinPrice, getMaxPrice } from '../utils/prices';
import { getAllProjectsTotal } from '../utils/projectMethods';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';

export default {
  name: 'Home',
  components: {
    FilterPrice,
    Benefits,
    ProjectCards,
  },
  data() {
    return {
      typePrice: 'S/.',
      inmobiliarias: [],
      search: '',
      prices: { },
      itemsRooms: [1, 2, 3, 4].map((e) => {
        if (e === 1) {
          return { text: `${e} dormitorio`, value: e };
        }
        return { text: `${e} dormitorios`, value: e };
      }),
      rooms: '',
      phase: '',
    };
  },
  methods: {
    setPrice(price) {
      this.prices = price;
    },
    setType(inDolar) {
      this.typePrice = inDolar ? '$' : 'S/.';
    },
    searchInMap() {
      this.$router.push({
        path: '/maps',
        query: {
          district: this.search,
          prices: this.prices,
          typePrice: this.typePrice,
          rooms: this.rooms,
          phase: this.phase,
        },
      });
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    getAllProjectsTotal().then((projects) => {
      eventBus.$emit('allProjects', projects);
      this.inmobiliarias = projects.map((e) => e.properties);
      const min = Number(getMinPrice(this.inmobiliarias));
      const max = Number(getMaxPrice(this.inmobiliarias));
      this.prices = { min, max };
      eventBus.$emit('prices', { min, max });
    });
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
