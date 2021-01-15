<template>
  <div class="pa-3">
    <v-row>
       <v-btn
        class="mx-4" fab dark small color="green"
        @click="
            $router.go(-1)">
            <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
    </v-row>
    <v-row class="d-flex">
      <v-col sm="7">
        <v-carousel class="carousel">
          <v-carousel-item
            v-for="(img, i) in project.imagenes"
            :key="i"
            :src="img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        <v-row>
          <v-col>
            <v-btn
              v-if="project.project_whatsapp"
              class="light-green accent-4 py-5"
              dark
              text
              dense
              small
              @click="asesorByWhatsApp(project.project_whatsapp)"
            >
              <v-icon class="mr-2" right dark> mdi-whatsapp </v-icon>
              <span class="text-router">Contacta a un asesor</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="light-green accent-4 py-5" small dark>
              SOLICITA UNA COTIZACIÓN
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="amber accent-2 py-5" @click="goOli" small>
              <v-img
                src="../assets/oli.png"
                height="20"
                width="30"
                class="mr-1"
              >
              </v-img>
              Conoce la fundación Oli
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="5">
        <h2 class="px-5 text-capitalize d-flex">
          {{ project.name }} - {{ project.distrito }}
          <div class="pl-2">
            <Favorite :project="project" />
          </div>
        </h2>
        <div class="d-flex px-5">
          <Rating :projectID="project.id" size="25" />
        </div>
        <v-divider></v-divider>
        <h1 class="pa-5 green--text">
          Desde {{ project.coin }} {{ priceStyle(project.min_price) }}
        </h1>
        <p class="px-5 h6">
          <v-icon class="mr-1">mdi-map-marker</v-icon>
          <strong class="text-uppercase">Dirección:</strong>
          {{ project.direccion }}, {{ project.distrito }}
        </p>
        <p class="px-5 h6">
          <v-icon class="mr-1">mdi-office-building</v-icon>
          <strong class="text-uppercase">Inmobiliaria: </strong
          >{{ project.builder_name }}
        </p>
        <p class="px-5 h6">
          <v-icon class="mr-1">mdi-bed-empty</v-icon>
          <strong class="text-uppercase">Habitaciones:</strong>
          {{ project.room_max }} habitaciones
        </p>
        <p class="px-5 h6">
          <v-icon class="mr-1">mdi-chart-line</v-icon>
          <strong class="text-uppercase">Cantidad disponible:</strong>
          {{ project.cantidad }}.
        </p>
        <p class="px-5 h6">
          <v-icon class="mr-1">mdi-arrow-collapse</v-icon>
          <strong class="text-uppercase">Espacio: </strong
          >Desde {{ project.area_min }} m2, hasta {{ project.area_max }} m2.
        </p>
        <p class="px-5 h6">
          <v-icon class="mr-1">mdi-account-hard-hat</v-icon>
          <strong class="text-uppercase">Fase del proyecto:</strong>
        </p>
        <v-stepper alt-labels class="mx-3">
          <v-stepper-header>
            <v-stepper-step color="green" step="1" :complete="e1 > 1">
              En planos
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="2" color="green" :complete="e1 > 2">
              En construcción
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="green" step="3">
              Entrega inmediata
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row class="px-5">
      <v-col>
        <v-card class="pa-5">
          <v-card-title> Información </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            {{ project.descripcion }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-5">
          <v-card-title> Bancos asociados </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Estos son los bancos con los que trabaja este proyecto, y en donde
            podrás solicitar tu crédito hipotecario.
          </v-card-text>
          <v-img
            :src="require(`../assets/${bankToImg(project.finance_bank)}`)"
            max-width="50"
            class="ma-4"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> Amenities </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item
              v-for="amenitie in project.areas_comunes"
              :key="amenitie.areas_comunes"
            >
              <v-icon class="px-4">mdi-beach</v-icon> {{ amenitie }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { inmobiliariasById } from '../utils/projectMethods';
import { getProjectById } from '../firebase/database';
import { priceStyle } from '../utils/prices';
import Rating from '../components/Rating.vue';
import Favorite from '../components/Favorite.vue';
import bankToImg from '../utils/banksImgs';

export default {
  data: () => ({
    project: {},
    favorite: false,
    favoriteID: '',
    e1: 3,
  }),
  components: {
    Rating,
    Favorite,
  },
  methods: {
    bankToImg,
    goOli() {
      this.$router.push('/oli');
    },
    asesorByWhatsApp(celular) {
      const yourMessage = 'Hola, encontré tu proyecto en la prlataforma COMPRATUDEPA (compratudepa.online), y estoy interesado en él, espero pueda enviarme mayor información';
      const message = yourMessage.split(' ').join('%20');
      window.location.href = `https://api.whatsapp.com/send/?phone=%2B51${celular}&text=%20${message}`;
    },
    priceStyle,
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    const inmobiliariasByJson = inmobiliariasById(this.$route.params.id);
    if (inmobiliariasByJson) {
      this.project = inmobiliariasByJson;
      if (this.project.project_phase === 'En planos') {
        this.e1 = 1;
      }
      if (this.project.project_phase === 'En construcción') {
        this.e1 = 2;
      }
    } else {
      getProjectById(this.$route.params.id).then((project) => {
        this.project = project.properties;
        if (this.project.project_phase === 'En planos') {
          this.e1 = 1;
        }
        if (this.project.project_phase === 'En construcción') {
          this.e1 = 2;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
