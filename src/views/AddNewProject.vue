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
        <v-select
        v-model="project.properties.distrito"
        :items="districts"
        color="green" filled dense rounded label="Elija el distrito">
        </v-select>
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
         :items="['En planos', 'En construcción', 'Terminado']"
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
      <GoogleMap :latitude= "latitude" :zoom="zoom"
    :longitude= "longitude" :markers="projects" :totalMarkers="totalProjects"
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
        <v-select color="green" filled dense rounded label="Elija el distrito">
        </v-select>
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
          label="Ingrese precio de depósito"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-select
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
    <h4>Bancos con que trabaja</h4>
    <v-row class="pa-4">
      <v-col>
        <v-select
          v-model="project.properties.finance_bank"
          :items="banks"
          filled
          dense
          rounded>
        </v-select>
      </v-col>
      <!-- <div v-for="bank in banks" :key="bank">
        <v-checkbox :label="bank" color="green" class="mx-6"></v-checkbox>
      </div> -->
      <!-- <v-text-field label="Otro banco" filled dense rounded></v-text-field> -->
    </v-row>
    <h4>Amenities del proyecto</h4>
    <v-row class="pa-4">
      <div v-for="amenitie in amenities" :key="amenitie">
        <v-checkbox :label="amenitie" color="green" class="mx-6"></v-checkbox>
      </div>
    </v-row>
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
      <v-btn color="green" @click="publishProject">Publicar proyecto</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { addFileToStorage } from '../firebase/storage';
import { currentUser } from '../firebase/auth';
import GoogleMap from '../components/GoogleMap.vue';

export default {
  components: () => ({
    GoogleMap,
  }),
  data: () => ({
    urlmain: '',
    urladitional: [],
    project: {
      properties: {
        name: '',
        direccion: '',
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
    districts: [
      'Cercado de Lima',
      'Ate',
      'Barranco',
      'Breña',
      'Comas',
      'Chorrillos',
      'El Agustino',
      'Jesús María',
      'La Molina',
      'La Victoria',
      'Lince',
      'Magdalena del Mar',
      'Miraflores',
      'Pueblo Libre',
      'Puente Piedra',
      'Rimac',
      'San Isidro',
      'Independencia',
      'San Juan de Miraflores',
      'San Luis',
      'San Martin de Porres',
      'San Miguel',
      'Santiago de Surco',
      'Surquillo',
      'Villa María del Triunfo',
      'Ventanilla',
      'San Juan de Lurigancho',
      'Santa Rosa',
      'Los Olivos',
      'San Borja',
      'Villa El Savador',
      'Santa Anita',
    ],
    amenities: ['Parrillas', 'Petfriendly', 'Vegano', 'Piscinas'],
  }),
  methods: {
    readFile(e) {
      this.urladitional = e.map((file) => URL.createObjectURL(file));
    },
    readFileMain(e) {
      this.urlmain = URL.createObjectURL(e);
    },
    publishProject() {
      addFileToStorage(`${currentUser().uid}/main`, [this.mainPhoto]);
      addFileToStorage(`${currentUser().uid}/aditional`, this.aditionalPhotos);
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
