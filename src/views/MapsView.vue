/* eslint-disable max-len */
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
        <v-btn class="my-5 mx-5" @click="filterFunction" color="green">
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
        <v-card class="mx-3 filter_places d-flex flex-wrap pa-5">
          <v-checkbox
          v-for="(value, key) in filterPlaces" :key="key"
              v-model="filterPlaces[key]"
              :label="key"
              color="green"
          ></v-checkbox>
        </v-card>
      </div>
    </v-card>
    <div v-if="projects.length>0" class="ma-5">
    <GoogleMap :latitude= "latitude" :zoom="zoom"
    :longitude= "longitude" :markers="projects" :totalMarkers="totalProjects"
    />
    </div>
    <div v-else class="ma-5 text-red">
      No hay resultados de la búsqueda, intente con otro filtro
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
      zoom: 12,
      latitude: -12.089637033755114,
      longitude: -77.05453930635801,
      prices: {
        // eslint-disable-next-line max-len
        min: this.$route.query.prices.min !== '' ? this.$route.query.prices.min : cost.reduce((a, b) => Math.min(a, b)),
        // eslint-disable-next-line max-len
        max: this.$route.query.prices.max !== '' ? this.$route.query.prices.max : cost.reduce((a, b) => Math.max(a, b)),
      },
      priceSelected: this.$route.query.typePrice !== '' ? this.$route.query.typePrice : 'Soles',
      search: this.$route.query.district,
      filterPlaces: {
        comisarias: false,
        guarderias: false,
        bancos: false,
        canchas: false,
        gyms: false,
        clinicas: false,
        estaciones: false,
        hospitales: false,
        mall: false,
        parques: false,
        piscinas: false,
        restaurantes: false,
        schools: false,
        supermercados: false,
        terrapuertos: false,
        universidades: false,
        vegano: false,
        veterinarias: false,
      },
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
      this.longitude = this.projects[0].position.lng;
      this.latitude = this.projects[0].position.lat;
      this.zoom = 13;
    },
    filterByRadioPlaces() {
      const places = [
        'comisarias', 'guarderias', 'bancos', 'canchas', 'gyms', 'clinicas', 'estaciones', 'hospitales',
        'mall', 'parques', 'piscinas', 'restaurantes', 'schools', 'supermercados', 'terrapuertos', 'universidades',
        'vegano', 'veterinarias',
      ];
      places.forEach((nameData) => {
        const place = `${nameData}__coord`;
        const filter = this.projects.filter((e) => e[place].length > 0);
        this.projects = this[nameData] ? filter : this.projects;
      });
    },
    filterFunction() {
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
