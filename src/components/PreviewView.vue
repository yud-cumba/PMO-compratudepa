<template>
  <v-row justify="end">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green" class="mx-10" v-bind="attrs" v-on="on">
          VISTA PREVIA
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="green">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title >Vista previa</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="publish"> Publicar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
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
        <v-rating
        background-color="grey"
        length="5"
        color="yellow"
        :size="25"
    ></v-rating>
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
            <v-stepper-step color="green" step="1" :complete="e1 >= 1">
              En planos
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2" color="green" :complete="e1 >= 2">
              En construcción
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step color="green" step="3" :complete="e1 === 3">
              Entrega inmediata
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </div>
    </div>
      <div class="d-flex justify-center pa-3">
      <v-btn v-if= "project.project_whatsapp" class="light-green accent-4 mb-3 mx-4" dark>
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
      <v-btn color="light-green lighten-4" dark >
        <v-icon color="green">mdi-heart-outline
        </v-icon>
      </v-btn>
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
       <v-card v-if="project.finance_bank" class=" pa-5">
         <v-card-title> Bancos asociados </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          Estos son los bancos con los que trabaja este proyecto,
          y en donde podrás solicitar tu crédito hipotecario.
        </v-card-text>
        <div class="d-flex">
        <v-img
        v-for=" bank in project.finance_bank"
        :key="bank"
          :src="require(`../assets/${bankToImg(bank )}`)"
          max-width="70"
          contain
          class="ma-4"
        >
        </v-img>
        </div>
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
      <v-btn class="amber accent-2 pl-2 mr-1 py-7" >
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
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import bankToImg from '../utils/banksImgs';

export default {
  props: ['project', 'publish'],
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      amenities: [
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
      ],
    };
  },
  methods: {
    bankToImg,
  },
  computed: {
    e1() {
      if (this.project.project_phase === 'En planos') {
        return 1;
      }
      if (this.project.project_phase === 'En construcción') {
        return 2;
      }
      return 3;
    },
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
