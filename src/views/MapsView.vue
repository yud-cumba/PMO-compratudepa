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
        <FilterPrice :setPrice="setPrice"/>
        </div>
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
import FilterPrice from '../components/FilterPrice.vue';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';

export default {
  components: {
    GoogleMap,
    ProjectCards,
    FilterPrice,
  },
  data() {
    const totalProjects = inmobiliarias.features.map((inmob) => ({
      position: {
        lat: inmob.geometry.coordinates[1],
        lng: inmob.geometry.coordinates[0],
      },
      title: inmob.properties.builder_name,
      id: inmob.id,
      ...inmob.properties,
    }));

    return {
      zoom: 12,
      latitude: -12.089637033755114,
      longitude: -77.05453930635801,
      prices: this.$route.query.prices,
      priceSelected: this.$route.query.typePrice,
      search: this.$route.query.district,
      rooms: this.$route.query.district,
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
    setPrice(price) {
      this.prices = price;
    },
    filterByPrice() {
      // const type = (this.priceSelected === 'Soles') ? 1 : 3.3;
      // eslint-disable-next-line max-len
      this.projects = this.projects.filter((e) => e.min_price > Number(this.prices.min)
      && e.min_price < Number(this.prices.max));
    },
    filterByInputUbication() {
      this.projects = this.totalProjects.filter((project) => {
        const direccion = project.direccion.toLowerCase();
        const distrito = project.distrito.toLowerCase();
        const search = this.search.toLowerCase();
        return direccion.includes(search) || distrito.includes(search);
      });
      if (this.projects.length > 0) {
        this.longitude = this.projects[3].position.lng;
        this.latitude = this.projects[3].position.lat;
        this.zoom = 15;
      }
    },
    filterByRadioPlaces() {
      const places = [
        'comisarias', 'guarderias', 'bancos', 'canchas', 'gimnasios', 'clinicas', 'estaciones', 'hospitales',
        'mall', 'parques', 'piscinas', 'restaurantes', 'schools', 'supermercados', 'terrapuertos', 'universidades',
        'vegano', 'veterinarias',
      ];
      places.forEach((nameData) => {
        const place = `${nameData}_coord`;
        const filter = this.projects.filter((e) => e[place].length > 0);
        this.projects = this.filterPlaces[nameData] ? filter : this.projects;
      });
    },
    filterFunction() {
      this.filterByInputUbication();
      this.filterByRadioPlaces();
      this.filterByPrice();
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
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
