<template>
<div>
  <v-parallax src="../assets/sala.png"
  class="d-flex justify-center align-center">
    <v-card color="rgb(255, 255, 255, 0.9)" class="py-3">
      <v-row  class="mx-2">
        <v-autocomplete
          class="mt-5 mx-2"
          :items="districts"
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por ubicación"
          single-line
          hide-details
          dense
          outlined
          color="green"
        ></v-autocomplete>
        <v-btn v-if="!$vuetify.breakpoint.smAndDown"
        @click="searchInMap" class="ma-5 green">
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
        </div>
        <FilterPrice :setPrice="setPrice" :setType="setType"/>
        <v-btn v-if="$vuetify.breakpoint.smAndDown"
        @click="searchInMap" class="ma-5 green white--text">
          Buscar
        </v-btn>
      </v-row>
    </v-card>
  </v-parallax>
  <div :class="!$vuetify.breakpoint.smAndDown? 'pa-12 mx-12': 'pa-0 my-12'">
  <Benefits :reasons="reasons"/>
  </div>
  <LoginCards/>
  <h2 class="px-6 my-5 mt-10">Proyectos destacados</h2>
  <ProjectCards :projects="inmobiliarias.slice(0, 5)" :loading="loading"/>
</div>
</template>

<script>
import { mapState } from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import detectiveIcon from '@iconify/icons-emojione-monotone/detective';
// eslint-disable-next-line import/no-extraneous-dependencies
import handHeart from '@iconify-icons/mdi/hand-heart-outline';
// eslint-disable-next-line import/no-extraneous-dependencies
import clipboardIcon from '@iconify/icons-emojione-monotone/clipboard';
import Benefits from '../components/BenefitsCards.vue';
import ProjectCards from '../components/ProjectCards.vue';
import FilterPrice from '../components/FilterPrice.vue';
import { getMinPrice, getMaxPrice } from '../utils/prices';
// import { getAllProjectsTotal } from '../utils/projectMethods';
import districts from '../data/districts.json';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';
import LoginCards from '../components/LoginCards.vue';

export default {
  name: 'Home',
  components: {
    FilterPrice,
    Benefits,
    ProjectCards,
    LoginCards,
  },
  data() {
    return {
      show: false,
      districts,
      typePrice: 'S/.',
      // inmobiliarias: [],
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
      reasons: [
        {
          img: 'sala.png',
          icon: detectiveIcon,
          title: 'BÚSQUEDA A TU MEDIDA',
          text: 'Te brindamos varias opciones de búsqueda para que puedas elegir de forma rápida y fácil el departamento que te interese.',
          function: () => {
            this.$router.push('/maps?district=&pricesMin=59000&pricesMax=1405000&typePrice=S%2F.&rooms=&phase=');
          },
        },
        {
          icon: handHeart,
          img: 'oli-1.png',
          title: 'AYUDA SOCIAL',
          text: 'Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar oportunidades de mejora en los rubros de salud, educación y cultura.',
          function: () => {
            this.$router.push('/oli');
          },
        },
        {
          icon: clipboardIcon,
          img: 'salam-1.png',
          title: 'TE ASESORAMOS EN EL PROCESO',
          text: 'Te otorgamos infomación útil y necesaria para que puedas encontrar el hogar ideal para tī',
          function: () => {
            this.$router.push('/advices');
          },
        },
      ],
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
          pricesMin: this.prices.min,
          pricesMax: this.prices.max,
          typePrice: this.typePrice,
          rooms: this.rooms,
          phase: this.phase,
        },
      });
    },
    getPrice() {
      if (this.inmobiliarias.length) {
        const min = Number(getMinPrice(this.inmobiliarias));
        const max = Number(getMaxPrice(this.inmobiliarias));
        this.prices = { min, max };
        eventBus.$emit('prices', { min, max });
      } else {
        eventBus.$emit('prices', { min: 0, max: 0 });
      }
    },
  },
  computed: {
    ...mapState('projects', {
      allProjects: 'projects',
    }),
    inmobiliarias() {
      const inmobiliarias = this.allProjects.map((e) => e.properties);
      return inmobiliarias;
    },
    loading() {
      return !this.allProjects.length;
    },
  },
  watch: {
    inmobiliarias() {
      this.getPrice();
    },
  },
  created() {
    this.getPrice();
  },
};
</script>

<style lang="scss" scoped>
</style>
