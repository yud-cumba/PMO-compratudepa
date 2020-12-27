<template>
  <div>
    <div class="d-flex pa-7">
      <v-carousel class="img">
        <v-carousel-item
          v-for="(img, i) in project.imagenes"
          :key="i"
          :src="img"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <div class="pl-6 card">
        <h2 class="px-5 text-capitalize">{{ project.name }} - {{ project.distrito }}</h2>
        <div class="d-flex px-5">
          <Rating :projectID="project.id" size="25" />
        </div>
        <v-divider></v-divider>
        <h1 class="pa-5 green--text">{{ project.coin }} {{ project.min_price }}</h1>
        <p class="px-5 h6">Dirección: {{ project.direccion }}</p>
        <p class="px-5 h6">Inmobiliaria: {{ project.builder_name }}</p>
        <p class="px-5 h6">Habitaciones: {{ project.room_max }} habitaciones</p>
        <p class="px-5 h6">Cantidad disponible: {{ project.cantidad }}.</p>
        <p class="px-5 h6">Espacio: {{ project.area_max }} m2.</p>
         <p class="px-5 h6">Fase del proyecto</p>
         <v-stepper alt-labels >
          <v-stepper-header >
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
      </div>
    </div>
      <div class="d-flex justify-center pa-3">
      <v-btn v-if= "project.project_whatsapp" class="light-green accent-4 mb-3 mx-4" dark
       @click="asesorByWhatsApp(project.project_whatsapp)">
        <v-icon class="mr-3" right dark> mdi-whatsapp </v-icon>
        Contacta con un asesor
      </v-btn>
      <v-btn class="light-green accent-4 mb-3 mx-4" dark>
        SOLICITA UNA COTIZACIÓN
      </v-btn>
      <v-btn class="light-green accent-4 mb-3 mx-4" dark>
        <v-icon class="mr-3" right dark> mdi-domain </v-icon>
        SEPARA TU DEPA
      </v-btn>
      <Favorite :project="project" />
    </div>
    <v-row class="px-5">
      <v-col>
         <v-card class=" pa-5">
        <v-card-title> Información </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          {{project.descripcion}}
        </v-card-text>
      </v-card>
      </v-col>
      <v-col>
       <v-card class=" pa-5">
         <v-card-title> Bancos asociados </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          Estos son los bancos con los que trabaja este proyecto,
          y en donde podrás solicitar tu crédito hipotecario.
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
          <v-list-item v-for="amenitie in project.areas_comunes" :key="amenitie.areas_comunes">
           <v-icon class="px-4">mdi-beach</v-icon> {{ amenitie }}
          </v-list-item>
        </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
      <div class="d-flex justify-center pa-3">
      <v-btn class="amber accent-2 pl-2 mr-1 py-7" @click="goOli">
        <v-img src="../assets/oli.png" height="50" class="mr-1"> </v-img>
        Con tu ayuda, apoyas a la fundación Oli
      </v-btn>
      <v-btn class="blue mb-3 mr-1 py-7" dark>
        <v-icon class="mr-3" right dark> mdi-facebook </v-icon>
        Compartir por facebook
      </v-btn>
      <v-btn class="green mb-3 py-7" dark>
        <v-icon class="mr-3" right dark> mdi-whatsapp </v-icon>
        Compartir por whatsapp
      </v-btn>
    </div>
  </div>
</template>

<script>
import { inmobiliariasById } from '../utils/projectMethods';
import { getProjectById } from '../firebase/database';
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
      this.$router.replace('/oli');
    },
    asesorByWhatsApp(celular) {
      const yourMessage = 'Hola, soy un pontencial cliente que encontró tu proyecto en COMPRATUDEPA, y estoy interesado en él, espero pueda enviarme mayor información';
      const message = yourMessage.split(' ').join('%20');
      window.location.href = `https://api.whatsapp.com/send/?phone=%2B51${celular}&text=%20${message}`;
    },
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
      getProjectById(this.$route.params.id)
        .then((project) => {
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
.img {
  width: 60%;
}
.card {
  width: 40%;
}
</style>
