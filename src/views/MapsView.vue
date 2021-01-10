<template>
  <div class="view pa-5" >
    <v-expansion-panels v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2>Filtros</h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
      <v-row>
      <v-col >
        <v-autocomplete
          class="my-5 mx-2"
          v-model="search"
          :items="districts"
          color="green"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
          outlined
        ></v-autocomplete>
        <v-select
            v-model="rooms"
            class="mt-2 mx-2 pb-0 select-price"
            :items="itemsRooms"
            label="Número de habitaciones"
            dense
            outlined
            color="green"
          ></v-select>
          <v-select
            v-model="phase"
            class="mx-2 pb-0 select-price"
            :items="['En planos', 'En construcción', 'Entrega inmediata']"
            label="Fase del proyecto"
            dense
            outlined
            color="green"
          ></v-select>
          <FilterPrice
            :setPrice="setPrice"
            :setType="setType"
          />
      </v-col>
      <v-col>
        <v-card
          class="mx-3 filter_places d-flex flex-wrap px-5 pt-3"
        >
          <p>¿Que amenities quieres encontrar?</p>
          <div class="d-flex flex-wrap">
            <div
              v-for="(value, key) in amenities"
              :key="key"
              class="pa-0 ma-0"
               style="width: 160px"
            >
              <v-checkbox
                class=" pa-0 ma-0"
                v-model="amenities[key]"
                :label="key"
                color="green"
              ></v-checkbox>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <div class="d-flex">
        <v-btn  v-if="!isMobile" class="mb-5 ml-auto mr-5" @click="filterFunction" color="green">
          Aplicar Filtro
        </v-btn>
        </div>
        <v-card
          class="mx-3 filter_places d-flex flex-wrap px-5 pt-3"
        >
          <p>¿Que puedes encontrar cerca?</p>
          <div class="d-flex flex-wrap">
            <div
              v-for="(value, key) in filterPlaces"
              :key="key"
              class="pa-0 ma-0"
              style="width: 160px"
            >
              <v-checkbox
                class="text-capitalize pa-0 ma-0"
                v-model="filterPlaces[key]"
                :label="key"
                color="green"
              ></v-checkbox>
            </div>
          </div>
        </v-card>
      </v-col>
      </v-row>
      <v-btn  v-if="isMobile" class="mx-2" @click="filterFunction" color="green">
          Aplicar Filtro
        </v-btn>
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-card v-if="filtersSelected.length > 0" class="my-3 px-4">
      <p class="ma-0 pt-1 pa-0">Filtros seleccionados</p>
      <div class="d-flex ma-0 pa-0 flex-wrap">
      <v-chip
      class="mx-1 my-3"
        v-for="filter in filtersSelected"
        :key="filter.text"
        @click:close="removeFilter(filter)"
        close
      >
        {{ filter.text }}
      </v-chip>
      <v-btn :class="!isMobile? 'ml-auto' : 'mx-2 my-2' " @click="removeAllFilter" color="green">
        Limpiar filtros
      </v-btn>
      </div>
    </v-card>
    <div v-if="projects.length > 0" class="ma-5">
      <h3 class="pb-5">Se muestran {{ projects.length }} resultados</h3>
      <GoogleMap
        :latitude="latitude"
        :zoom="zoom"
        :longitude="longitude"
        :markers="projects"
        :totalMarkers="totalProjects"
      />
    </div>
    <v-progress-linear
      v-else-if="loading"
      indeterminate
      color="green"
      class="my-5"
    ></v-progress-linear>
    <div v-else class="ma-5 text-red">
      <NoProjects message="No se encontraron proyectos"/>
    </div>
    <ProjectCards :projects="projects" />
  </div>
</template>

<script>
import GoogleMap from '../components/GoogleMap.vue';
import ProjectCards from '../components/ProjectCards.vue';
import FilterPrice from '../components/FilterPrice.vue';
import { getAllProjectsTotal } from '../utils/projectMethods';
import districts from '../data/districts.json';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';
import NoProjects from '../components/NoProjects.vue';

export default {
  components: {
    GoogleMap,
    ProjectCards,
    FilterPrice,
    NoProjects,
  },
  data() {
    return {
      districts,
      panel: [],
      zoom: 12,
      isMobile: false,
      itemsRooms: [1, 2, 3, 4].map((e) => {
        if (e === 1) {
          return { text: `${e} dormitorio`, value: e };
        }
        return { text: `${e} dormitorios`, value: e };
      }),
      loading: false,
      latitude: -12.089637033755114,
      longitude: -77.05453930635801,
      prices: {
        min: this.$route.query.pricesMin,
        max: this.$route.query.pricesMax,
      },
      priceSelected: this.$route.query.typePrice,
      search: this.$route.query.district,
      rooms: this.$route.query.rooms,
      phase: this.$route.query.phase,
      filtersSelected: [],
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
      amenities: {
        'Areas verdes': false,
        'Área de juegos para niños': false,
        'Ascensor directo': false,
        'Cancha de Fulbito': false,
        'Cancha de Squash': false,
        'Cuarto de servicio': false,
        Gimnasio: false,
        'Jardín de niños': false,
        Karaoke: false,
        Lobby: false,
        Minimarket: false,
        Piscina: false,
        'Sala de internet': false,
        'Sala de cine': false,
        Sauna: false,
        'Techos Ecológicos': false,
        Terraza: false,
        'Video vigilancia': false,
        'Zona de Lavandería': false,
        'Zona de Parrillas': false,
      },
      totalProjects: [],
      projects: [],
    };
  },
  methods: {
    setPrice(price) {
      this.prices = price;
    },
    setType(inDolar) {
      this.typePrice = inDolar ? '$' : 'S/.';
    },
    withoutAccentMark(cadena) {
      const acentos = {
        á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U',
      };
      return cadena.split('').map((letra) => acentos[letra] || letra).join('').toString();
    },
    removeItemFromArr(arr, item) {
      const i = arr.indexOf(item);
      if (i !== -1) {
        arr.splice(i, 1);
      }
    },
    removeAllFilter() {
      this.search = '';
      this.filtersSelected = [];
      this.projects = this.totalProjects;
    },
    removeFilter(filter) {
      this.projects = this.totalProjects;
      switch (filter.type) {
        case 'rooms':
          this.rooms = '';
          break;
        case 'phase':
          this.phase = '';
          break;
        case 'places':
          this.filterPlaces[filter.place] = false;
          break;
        case 'amenities':
          this.amenities[filter.amenitie] = false;
          break;
        default:
          this.projects = this.totalProjects;
      }
      this.removeItemFromArr(this.filtersSelected, filter);
      this.filterFunction();
    },
    filterByRooms() {
      if (this.rooms) {
        this.projects = this.projects.filter(
          (e) => e.room_max >= Number(this.rooms),
        );
        this.filtersSelected.push({
          text: `${this.rooms} habitacion(es)`,
          type: 'rooms',
        });
      }
    },
    filterByPhase() {
      if (this.phase) {
        this.projects = this.projects.filter(
          (e) => e.project_phase === this.phase,
        );
        this.filtersSelected.push({ text: this.phase, type: 'phase' });
      }
    },
    filterByPrice() {
      this.projects = this.projects.filter(
        (e) => Number(e.min_price) >= Number(this.prices.min)
          && Number(e.min_price) <= Number(this.prices.max),
      );
    },
    filterByInputUbication() {
      this.projects = this.totalProjects.filter((project) => {
        const direccion = this.withoutAccentMark(project.direccion.toLowerCase());
        const distrito = this.withoutAccentMark(project.distrito.toLowerCase());
        const search = this.withoutAccentMark(this.search.toLowerCase());
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
        'comisarias',
        'guarderias',
        'bancos',
        'canchas',
        'gimnasios',
        'clinicas',
        'estaciones',
        'hospitales',
        'mall',
        'parques',
        'piscinas',
        'restaurantes',
        'schools',
        'supermercados',
        'terrapuertos',
        'universidades',
        'vegano',
        'veterinarias',
      ];
      places.forEach((nameData) => {
        if (this.filterPlaces[nameData]) {
          const place = `${nameData}_coord`;
          this.projects = this.projects.filter((e) => e[place] && e[place].length > 0);
          this.filtersSelected.push({
            text: nameData,
            type: 'places',
            place: nameData,
          });
        }
      });
    },
    filterByAmenities() {
      const amenities = [
        'Areas verdes',
        'Área de juegos para niños',
        'Ascensor directo',
        'Boulevard peatonal',
        'Cancha de Fulbito',
        'Cancha de Squash',
        'Club House',
        'Cuarto de servicio',
        'Gimnasio',
        'Jardín de niños',
        'Karaoke',
        'Lobby',
        'Minimarket',
        'Parque privado',
        'Paseo de Aguas',
        'Piscina',
        'Sala Bar',
        'Salón Gourmet',
        'Sala de internet',
        'Sala de Niños',
        'Sala de cine',
        'Sala de usos Múltuples',
        'Sauna',
        'Techo Panorámico',
        'Techos Ecológicos',
        'Terraza',
        'Video vigilancia',
        'Zona de Lavandería',
        'Zona de Parrillas',
        'Otros',
      ];
      amenities.forEach((nameData) => {
        if (this.amenities[nameData]) {
          this.projects = this.projects.filter((e) => e.areas_comunes.includes(nameData));
          this.filtersSelected.push({
            text: nameData,
            type: 'amenities',
            amenitie: nameData,
          });
        }
      });
    },
    filterFunction() {
      this.filtersSelected = [];
      this.panel = undefined;
      this.filterByInputUbication();
      this.filterByRooms();
      this.filterByPhase();
      this.filterByRadioPlaces();
      this.filterByAmenities();
      this.filterByPrice();
    },
    onResize() {
      this.isMobile = window.innerWidth < 800;
    },
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  watch: {
    panel() {
      eventBus.$emit('prices', this.prices);
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    this.loading = true;
    getAllProjectsTotal().then((projects) => {
      this.totalProjects = projects.map((inmob) => ({
        position: {
          lat: inmob.geometry.coordinates[1],
          lng: inmob.geometry.coordinates[0],
        },
        title: inmob.properties.builder_name,
        id: inmob.id,
        ...inmob.properties,
      }));
      this.filterFunction();
      this.loading = false;
    });
    eventBus.$on('infoProject', (payload) => {
      this.projects = payload;
    });
  },
};
</script>

<style lang="scss" scoped>
.view {
  width: 100%;
}
</style>
