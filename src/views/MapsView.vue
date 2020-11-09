<template>
  <div class="view">
    <v-card class="ma-5 pa-5">
      <div class="d-flex">
        <v-text-field
          class="my-5 mx-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
          outlined
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn class="my-5 mx-5" @click="filter" color="green">
          Aplicar Filtro
        </v-btn>
      </div>
      <div class="d-flex">
        <v-card class="mx-3 filter_price">
          <v-select
          v-model="priceSelected"
          :items="['Soles', 'Dólares']"
          label="Tipo de moneda"
          outlined
        ></v-select>
        <div class="d-flex">
          <v-text-field
            class="mb-5 mx-2"
            v-model="prices.min"
            label="Precio desde"
            hide-details
            dense
            outlined
          ></v-text-field>
          <v-text-field
            class="mb-5 mx-2"
            v-model="prices.max"
            label="Precio hasta"
            hide-details
            dense
            outlined
          ></v-text-field>
        </div>
        </v-card>
        <v-spacer></v-spacer>
        <v-card class="mx-3 filter_places">
          <v-checkbox
              v-model="policeStation"
              label="Comisaria"
              color="green"
          ></v-checkbox>
          <v-checkbox
              v-model="kinderGarden"
              label="Kindergarden"
              color="green"
          ></v-checkbox>
        </v-card>
      </div>
    </v-card>
    <div class="ma-5">
    <GoogleMap :latitude= -12.089637033755114
    :longitude= -77.05453930635801 :markers="projects" :totalMarkers="totalProjects"
    />
    </div>
    <ProjectCards :projects="projects"/>
  </div>
</template>

<script>
import inmobiliarias from '../data/inmobiliarias.json';
import GoogleMap from '../components/GoogleMap.vue';
import ProjectCards from '../components/ProjectCards.vue';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';

export default {
  components: {
    GoogleMap,
    ProjectCards,
  },
  data() {
    const totalProjects = inmobiliarias.features.map((inmob) => ({
      position: {
        lat: inmob.geometry.coordinates[1],
        lng: inmob.geometry.coordinates[0],
      },
      title: inmob.properties.Proyecto,
      id: inmob.id,
      ...inmob.properties,
    }));
    const cost = totalProjects.map((e) => e.Precio_por_m2_oferta);

    return {
      prices: {
        // eslint-disable-next-line max-len
        min: this.$route.query.prices.min !== '' ? this.$route.query.prices.min : cost.reduce((a, b) => Math.min(a, b)),
        // eslint-disable-next-line max-len
        max: this.$route.query.prices.max !== '' ? this.$route.query.prices.max : cost.reduce((a, b) => Math.max(a, b)),
      },
      priceSelected: this.$route.query.typePrice !== '' ? this.$route.query.typePrice : 'Soles',
      search: this.$route.query.district,
      kinderGarden: false,
      policeStation: false,
      totalProjects,
      projects: totalProjects,
    };
  },
  methods: {
    filterByPrice() {
      const type = (this.priceSelected === 'Soles') ? 1 : 3.3;
      // eslint-disable-next-line max-len
      this.projects = this.projects.filter((e) => e.Precio_por_m2_oferta > Number(this.prices.min) * type
      && e.Precio_por_m2_oferta < Number(this.prices.max) * type);
    },
    filterByInputUbication() {
      this.projects = this.totalProjects.filter((project) => {
        const direccion = project.Dirección.toLowerCase();
        const distrito = project.Distrito.toLowerCase();
        const search = this.search.toLowerCase();
        return direccion.includes(search) || distrito.includes(search);
      });
    },
    filterByRadioPlaces() {
      // eslint-disable-next-line max-len
      this.projects = this.policeStation ? this.projects.filter((e) => e.comisarias_coord.length > 0) : this.projects;
      // eslint-disable-next-line max-len
      this.projects = this.kinderGarden ? this.projects.filter((e) => e.kinder_names.length > 0) : this.projects;
    },
    filter() {
      this.filterByInputUbication();
      this.filterByRadioPlaces();
      this.filterByPrice();
    },
  },
  created() {
    this.filterByInputUbication();
    this.filterByPrice();
    eventBus.$on('infoProject', (payload) => {
      this.projects = payload;
    });
  },
};
</script>

<style lang="scss" scoped>
.view{
  width:100%;
}
.filter_price{
  width: 40%;
}
.filter_places{
  width: 60%;
}
</style>
