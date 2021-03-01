<template>
  <div>
    <v-row >
      <v-row>
        <v-carousel>
          <v-carousel-item
            :src="project.imagenes[0]"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-btn
              class="mx-4 my-4"
              fab
              dark
              small
              color="green"
              @click="$router.go(-1)"
            >
              <v-icon dark>mdi-arrow-left</v-icon>
            </v-btn>
          </v-carousel-item>
        </v-carousel>
      </v-row>
      <v-row>
        <v-carousel>
          <v-carousel-item
            v-for="(img, i) in project.imagenes.slice(1)"
            :key="i"
            :src="img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </v-row>
    <div class="view d-flex flex-column align-center">
      <v-row class="my-5">
        <h1 class="titulo">{{ project.name }} - {{ project.distrito }}</h1>
        <div class="pl-5 my-5">
          <Favorite :project="project" />
        </div>
      </v-row>
      <Rating :projectID="project.id" size="45" />
      <h1 class="pa-5 green--text">
        Desde {{ project.coin }} {{ priceStyle(project.val_price1) }}
      </h1>
      <v-row>
        <v-card class="pa-7">
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
            <strong class="text-uppercase">Espacio: </strong>Desde
            {{ project.area_min }} m2, hasta {{ project.area_max }} m2.
          </p>
          <p class="px-5 mt-5 h6">
            <v-icon class="mr-1">mdi-office-building</v-icon>
            <strong class="text-uppercase"> Amenities :</strong>
          </p>
          <ul class="mx-5">
            <li
              v-for="amenitie in project.areas_comunes"
              :key="amenitie.areas_comunes"
            >
              {{ amenitie }}
            </li>
          </ul>
        </v-card>
        <v-card class="pa-5">
          <p class="px-5 h6">
            <v-icon class="mr-1">mdi-office-building</v-icon>
            <strong class="text-uppercase">Bancos asociados:</strong>
          </p>
          <v-row class="px-5">
            <v-img
              :src="require(`../assets/${bankToImg(project.finance_bank)}`)"
              max-width="50"
              class="ma-4"
            >
            </v-img>
          </v-row>
          <p class="px-5 h6">
            <v-icon class="mr-1">mdi-account-hard-hat</v-icon>
            <strong class="text-uppercase">Fase del proyecto:</strong>
          </p>
          <v-row>
            <v-stepper class="mx-3 d-flex">
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
          </v-row>
          <v-row class="my-5">
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
              <v-btn class="light-green accent-4 py-5" small dark
              @click="dialog = true">
                SOLICITA UNA COTIZACIÓN
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
      <ModalLeeds :dialog="dialog" />
      <v-row class="my-4">
        <GraphicBar :chartdata="chartData" />
      </v-row>
      <v-row class="px-5">
        <NearPlaces :project="project" />
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <transition name="bounce" v-if="chartData"> </transition>
        </v-col>
        <v-col>
          <transition name="bounce"> </transition>
        </v-col>
      </v-row>
       <BenefitsCards :reasons="reasons" />
    </div>
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
// import { inmobiliariasById } from '../utils/projectMethods';
// import { getProjectById } from '../firebase/database';
import { priceStyle } from '../utils/prices';
import Rating from '../components/Rating.vue';
import Favorite from '../components/Favorite.vue';
import bankToImg from '../utils/banksImgs';
import NearPlaces from '../components/NearPlaces.vue';
import GraphicBar from '../components/GraphicBar.vue';
import ModalLeeds from '../components/ModalLeeds.vue';
import BenefitsCards from '../components/BenefitsCards.vue';

export default {
  data: () => ({
    show1: false,
    show2: false,
    favorite: false,
    favoriteID: '',
    scroll: [160, 350],
    dialog: false,
  }),
  components: {
    Rating,
    Favorite,
    NearPlaces,
    GraphicBar,
    ModalLeeds,
    BenefitsCards,
  },
  computed: {
    ...mapState('projects', {
      allProjects: 'projects',
    }),
    reasons() {
      return [
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
      ];
    },
    project() {
      const filterProjectById = (e) => e.properties.id === this.$route.params.id;
      const [currentProject] = this.allProjects.filter(filterProjectById);
      return {
        ...currentProject.properties,
        geometry: currentProject.geometry,
      };
    },
    e1() {
      if (this.project.project_phase === 'En planos') {
        return 1;
      }
      if (this.project.project_phase === 'En construcción') {
        return 2;
      }
      return 3;
    },
    chartData() {
      if (this.project.precio_m2) {
        return {
          labels: ['Comparación de precios por m2'],
          datasets: [
            {
              label: `Promedio de precios por m2 en ${
                this.project.distrito
              }: S/. ${priceStyle(this.project.media_distrito)}`,
              backgroundColor: 'green',
              data: [this.project.media_distrito, 0],
            },
            {
              label: `Precio de ${this.project.name} por m2: ${
                this.project.coin
              } ${priceStyle(this.project.precio_m2)}`,
              backgroundColor: 'purple',
              data: [this.project.precio_m2, 0],
            },
            {
              label: `Promedio de precios por m2 cercanos a en 5km : S/.${priceStyle(
                this.project.media_near,
              )}`,
              backgroundColor: 'orange',
              data: [this.project.media_near, 0],
            },
          ],
        };
      }
      return false;
    },
  },
  methods: {
    handleScroll() {
      this.show1 = window.scrollY > this.scroll[0];
      this.show2 = window.scrollY > this.scroll[1];
      // Any code to be executed when the window is scrolled
    },
    bankToImg,
    asesorByWhatsApp(celular) {
      const yourMessage = 'Hola, encontré tu proyecto en la prlataforma COMPRATUDEPA (compratudepa.online), y estoy interesado en él, espero pueda enviarme mayor información';
      const message = yourMessage.split(' ').join('%20');
      window.location.href = `https://api.whatsapp.com/send/?phone=%2B51${celular}&text=%20${message}`;
    },
    priceStyle,
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    this.$store.commit('layout/SET_LAYOUT', 'public-layout');
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.titulo {
  font-size: 50px !important;
}
.view {
  width: 100vw;
}
</style>
