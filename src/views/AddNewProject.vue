<template>
  <v-card class="pa-5 ma-10">
    <h1>Sube un nuevo proyecto</h1>
    <h4>Datos del proyecto</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          v-model="project.properties.name"
          filled
          rounded
          color="green"
          dense
          label="Ingrese nombre del proyecto"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.direccion"
          filled
          rounded
          color="green"
          dense
          label="Ingrese dirección del proyecto"
        >
        </v-text-field>
        <v-autocomplete
        v-model="project.properties.distrito"
        :items="districts"
        @change="currentLatLong(project.properties.distrito)"
        color="green" filled dense rounded label="Elija el distrito">
        </v-autocomplete>
      </v-col>
      <v-col>
        <v-menu
          ref="menu1"
          v-model="menu1"
          color="green"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              color="green"
              filled
              dense
              rounded
              v-model="date"
              label="Fecha de entrada"
              persistent-hint
              prepend-inner-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="green"
            v-model="project.properties.delivery_date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <v-select
         :items="['En planos', 'En construcción', 'Entrega inmediata']"
          v-model="project.properties.project_phase"
          color="green"
          filled
          dense
          rounded
          label="Elija el estado del proyecto"
        >
        </v-select>
        <v-text-field
        v-model="project.properties.room_max"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Elija el número de habitaciones "
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="project.properties.distrito" class="pa-12">
        <h4 class="py-3">Recorre el mapa y clickea la ubicación de tu proyecto,
         esto servirá para que los usuarios puedan encontrar tu proyecto por la ubicación</h4>
      <GoogleMap :latitude="latitude" :zoom="zoom"
      :longitude="longitude" :markers="marker" :totalMarkers="marker" :addMarker="addMarker"
      />
    </v-row>
    <h4>Detalle</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          v-model="project.properties.cantidad"
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de dptos del proyecto"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.floors"
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de pisos del proyecto"
        >
        </v-text-field>
        <v-text-field
          v-model="project.properties.project_whatsapp"
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de celular para contacto"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
           v-model="project.properties.area_max"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Ingrese área máxima en m2"
        >
        </v-text-field>
        <v-textarea
           v-model="project.properties.descripcion"
          color="green"
          filled
          dense
          rounded
          label="Ingrese detalle del proyecto"
        >
        </v-textarea>
      </v-col>
    </v-row>
    <h4>Datos del proyecto</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          v-model="project.properties.min_price"
          filled
          rounded
          color="green"
          dense
          type="number"
          label="Ingrese precio de separación en soles"
        >
        </v-text-field>
        <v-text-field
         v-model="project.properties.deposito_price"
          filled
          rounded
          color="green"
          dense
          type="number"
          label="Ingrese precio de depósito en soles"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-select
        v-model="project.properties.deposito_price"
          color="green"
          filled
          dense
          rounded
          label="Ingrese precio de estacionamientos"
        >
        </v-select>
        <v-text-field
          v-model="project.properties.room_max"
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Ingrese número de habitaciones"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <h4>Cotización</h4>
    <v-row class="pa-4">
      <v-col>
        <v-file-input
          color="green"
          label="Suba la cotización en pdf de su proyecto"
          filled
          dense
          rounded
        >
        </v-file-input>
      </v-col>
    </v-row>
    <v-row class="pa-4">
      <v-col>
        <h4 class="my-4">Bancos con que trabaja</h4>
        <v-select
          v-model="project.properties.finance_bank"
          label="Escoja los bancos que financian"
          :items="banks"
          filled
          dense
          multiple
          color="green"
          rounded>
        </v-select>
      </v-col>
      <v-col>
        <h4 class="my-4">Amenities del proyecto</h4>
        <v-select
          v-model="project.properties.areas_comunes"
          label="Escoja los amenities que cuenta su proyecto"
          :items="amenities"
          color="green"
          filled
          dense
          multiple
          rounded>
        </v-select>
      </v-col>
      <!-- <div v-for="bank in banks" :key="bank">
        <v-checkbox :label="bank" color="green" class="mx-6"></v-checkbox>
      </div> -->
      <!-- <v-text-field label="Otro banco" filled dense rounded></v-text-field> -->
    </v-row>
    <!-- <h4>Amenities del proyecto</h4>
    <v-row class="pa-4"> -->
      <!-- <v-col>
        <v-select
          v-model="project.properties.finance_bank"
          label="Escoja los amenities que cuenta su proyecto"
          :items="amenities"
          filled
          dense
          multiple
          chips
          rounded>
        </v-select>
      </v-col> -->
      <!-- <div v-for="amenitie in amenities" :key="amenitie">
        <v-checkbox :label="amenitie" color="green" class="mx-6"></v-checkbox>
      </div> -->
    <!-- </v-row> -->
    <h4>Fotos</h4>
    <v-row>
      <v-col >
        <v-file-input
          @change="readFileMain"
          v-model="mainPhoto"
          label="Foto principal del proyecto  "
          filled
          color="green"
          dense
          rounded
          prepend-icon="mdi-camera"
        ></v-file-input>
        <v-img
        v-if="urlmain"
          width="400"
          height="500"
          class="mx-12 px-12"
          dark
          :src="urlmain"
          lazy-src="../assets/salam-1.png"
        >
        </v-img>
      </v-col>
      <v-col>
        <v-file-input
          @change="readFile"
          v-model="aditionalPhotos"
          color="green"
          filled
          dense
          rounded
          multiple
          label="Fotos adicionales "
          prepend-icon="mdi-camera"
        ></v-file-input>
        <v-carousel  v-if="urladitional.length>0" class="imgs m-12">
          <v-carousel-item
          v-for="(img,i) in urladitional"
          :key="i"
          :src="img"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center my-5">
      <PreviewView :project="project.properties" :publish="publishProject"/>
      <v-btn color="green" class="mx-10" @click="publishProject">Publicar proyecto</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { addFileToStorage, getFileFromStorage } from '../firebase/storage';
import { addNewProject } from '../firebase/database';
import { currentUser } from '../firebase/auth';
import GoogleMap from '../components/GoogleMap.vue';
import PreviewView from '../components/PreviewView.vue';
import ubigeo from '../data/ubigeo.json';

export default {
  components: {
    GoogleMap,
    PreviewView,
  },
  data: () => ({
    urlmain: '',
    urladitional: [],
    project: {
      geometry: {
      },
      properties: {
        name: '',
        coin: 'S/.',
        direccion: '',
        imagenes: [],
      },
    },
    aditionalPhotos: '',
    mainPhoto: '',
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    banks: [
      'BCP',
      'Pichincha',
      'Scotiabank',
      'Saga Falabella',
      'Interbank',
      'GNB',
    ],
    marker: [],
    districts: ubigeo.map((e) => e.distrito),
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
    zoom: 12,
    latitude: -12.089637033755114,
    longitude: -77.05453930635801,
  }),
  methods: {
    addMarker(position) {
      this.marker = [
        {
          position,
        },
      ];
      this.project.geometry = {
        coordinates: [position.lng, position.lat],
        type: 'Point',
      };
    },
    currentLatLong(district) {
      const currentDistrict = ubigeo.filter((e) => e.distrito === district)[0];
      this.latitude = currentDistrict.lat;
      this.longitude = currentDistrict.long;
      this.zoom = 14;
    },
    readFile(e) {
      this.urladitional = e.map((file) => URL.createObjectURL(file));
      this.project.properties.imagenes = this.project.properties.imagenes.concat(this.urladitional);
    },
    readFileMain(e) {
      this.urlmain = URL.createObjectURL(e);
      this.project.properties.imagenes.push(this.urlmain);
    },
    publishProject() {
      const vm = this;
      vm.project.properties.id = new Date().getTime();
      const photos = [this.mainPhoto].concat(this.aditionalPhotos);
      const promises = addFileToStorage(`${currentUser().uid}/${this.project.properties.name}`, photos);
      Promise.all(promises).then(() => photos.map((p) => p.name))
        .then((photoNames) => photoNames.map((photo) => getFileFromStorage(`${currentUser().uid}/${this.project.properties.name}/${photo}`)))
        .then((url) => Promise.all(url).then((urls) => {
          vm.project.properties.imagenes = urls;
        }))
        .then(() => {
          addNewProject(vm.project.properties.id, vm.project);
        });
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'realState-layout');
  },
};
</script>

<style lang="scss" scoped>
.imgs{
  width: 400px;
  height: 200px;
}
</style>
