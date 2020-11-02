<template>
  <div class="view">
    <v-card class="mx-5 pa-5">
      <div class="d-flex">
        <v-text-field
          class="mt-5 mx-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
          outlined
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
            class="mt-5 ml-5 mr-2"
            :items="items"
            label="Outlined style"
            dense
            outlined
            color="white"
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
            class="mt-5 mx-2"
            :items="items"
            label="Outlined style"
            dense
            outlined
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
            class="mt-5 mx-2"
            :items="items"
            label="Outlined style"
            dense
            outlined
        ></v-select>
      </div>
      <div class="d-flex">
        <v-card class="mx-3 filter_price">
          <v-radio-group
            v-model="row"
            row
          >
            <v-radio
              label="Option 1"
              value="radio-1"
            ></v-radio>
            <v-radio
              label="Option 2"
              value="radio-2"
            ></v-radio>
          </v-radio-group>
          <v-card>
          <v-card-text>
              <v-slider
                v-model="cost"
                :max="maxCost"
                :min="minCost"
                thumb-label="always"
              ></v-slider>
            </v-card-text>
          </v-card>
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
      minCost: cost.reduce((a, b) => Math.min(a, b)),
      maxCost: cost.reduce((a, b) => Math.max(a, b)),
      cost: '',
      search: this.$route.params.distric,
      kinderGarden: false,
      policeStation: false,
      totalProjects,
      projects: totalProjects,
    };
  },
  methods: {
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
    // filterByCost() {
    //   this.projects = this.projects.filter((e) => e.Precio_por_m2_oferta < this.cost);
    // },
  },
  watch: {
    search() {
      this.filterByInputUbication();
    },
    policeStation() {
      this.filterByInputUbication();
      this.filterByRadioPlaces();
    },
    kinderGarden() {
      this.filterByInputUbication();
      this.filterByRadioPlaces();
    },
  },
  created() {
    this.filterByInputUbication();
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
