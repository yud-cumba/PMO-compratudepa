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
          <v-toolbar-title>Vista previa</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="publishProject"
              ><v-progress-circular
                class="ml-2"
                v-if="loading"
                left
                :size="25"
                :width="5"
                color="white"
                indeterminate
              ></v-progress-circular>
              Publicar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="pa-3">
          <v-row>
            <v-col>
              <v-carousel>
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
                  <v-btn class="amber accent-2 py-5" small>
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
                <!-- <v-btn class="light-green accent-4 mb-3 mx-4" dark>
        SOLICITA UNA COTIZACIÓN
      </v-btn>
      <v-btn class="light-green accent-4 mb-3 mx-4" dark>
        <v-icon class="mr-3" right dark> mdi-domain </v-icon>
        SEPARA TU DEPA
      </v-btn> -->
              </v-row>
            </v-col>
            <v-col>
              <h2 class="px-5 text-capitalize d-flex">
                {{ project.name }} - {{ project.distrito }}
                <div class="pl-2">
                  <v-btn
                    color="light-green lighten-4"
                    dark
                  >
                    <v-icon color="green"> mdi-heart </v-icon>
                  </v-btn>
                </div>
              </h2>
              <div class="d-flex px-5">
                <v-rating
                  background-color="grey"
                  length="5"
                  color="yellow"
                  size="25"
                ></v-rating>
              </div>
              <v-divider></v-divider>
              <h1 class="pa-5 green--text">
                {{ project.coin }} {{ project.min_price }}
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
                >{{ project.area_max }} m2.
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
                  Estos son los bancos con los que trabaja este proyecto, y en
                  donde podrás solicitar tu crédito hipotecario.
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
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import bankToImg from '../utils/banksImgs';

export default {
  props: ['project', 'publish', 'loading'],
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
    publishProject() {
      this.publish();
      this.dialog = false;
    },
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
