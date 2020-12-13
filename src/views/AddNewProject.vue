<template>
  <v-card class="pa-5 ma-10">
    <h1>Sube un nuevo proyecto</h1>
    <h4>Datos del proyecto</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          filled
          rounded
          color="green"
          dense
          label="Ingrese nombre del proyecto"
        >
        </v-text-field>
        <v-text-field
          filled
          rounded
          color="green"
          dense
          label="Ingrese dirección del proyecto"
        >
        </v-text-field>
        <v-select color="green" filled dense rounded label="Elija el distrito">
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
              label="Date"
              persistent-hint
              prepend-inner-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            color="green"
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <v-select
          color="green"
          filled
          dense
          rounded
          label="Elija el estado del proyecto"
        >
        </v-select>
        <v-text-field
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Elija el número de habitaciones"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <h4>Detalle</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          filled
          rounded
          color="green"
          dense
          label="Ingrese número de dptos del proyecto"
        >
        </v-text-field>
        <v-text-field
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
          color="green"
          filled
          dense
          rounded
          type="number"
          label="Ingrese espacio en m2"
        >
        </v-text-field>
       <v-textarea color="green"
          filled
          dense
          rounded
          label="Ingrese detalle del proyecto">
       </v-textarea>
      </v-col>
    </v-row>
    <h4>Datos del proyecto</h4>
    <v-row class="pa-4">
      <v-col>
        <v-text-field
          filled
          rounded
          color="green"
          dense
          type="number"
          label="Ingrese precio de separación"
        >
        </v-text-field>
        <v-text-field
          filled
          rounded
          color="green"
          dense
          type="number"
          label="Ingrese precio de depósitos"
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
        <v-file-input color="green"
        label="Suba la cotización en pdf de su proyecto"
          filled
          dense
          rounded>
        </v-file-input>
      </v-col>
    </v-row>
    <h4>Bancos con que trabaja</h4>
    <v-row class="pa-4">
      <div v-for="bank in banks" :key="bank">
      <v-checkbox
        :label="bank"
        color="green"
        class="mx-6"
      ></v-checkbox>
      </div>
      <v-text-field label="Otro banco"
       filled
          dense
          rounded
      ></v-text-field>

    </v-row>
    <h4>Amenities del proyecto</h4>
     <v-row class="pa-4">
      <div v-for="amenitie in amenities" :key="amenitie">
      <v-checkbox
        :label="amenitie"
        color="green"
        class="mx-6"
      ></v-checkbox>
      </div>
    </v-row>
    <h4>Fotos</h4>
    <v-row>
      <v-col>
         <v-file-input
    label="Foto principal del proyecto  "
    filled
    color="green"
          dense
          rounded
    prepend-icon="mdi-camera"
  ></v-file-input>
  <v-img width ="200" height="200" class="mx-12 px-12" dark lazy-src="../assets/salam-1.png">
  </v-img>
      </v-col>
      <v-col>
         <v-file-input
         color="green"
         filled
          dense
          rounded
    label="Fotos adicionales "
    prepend-icon="mdi-camera"
  ></v-file-input>
  <v-img width ="200" class="mx-12 px-12" height="200" dark lazy-src="../assets/salam-1.png">
  </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    banks: ['BCP', 'Pichincha', 'Scotiabank', 'Saga Falabella', 'Interbank', 'GNB'],
    amenities: ['Parrillas', 'Petfriendly', 'Vegano', 'Piscinas'],
  }),
  created() {
    this.$store.commit('SET_LAYOUT', 'realState-layout');
  },
};
</script>

<style lang="scss" scoped>
</style>
