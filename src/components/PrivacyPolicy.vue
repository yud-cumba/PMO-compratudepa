<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <p class="pt-1 blue--text text-decoration-underline"
          v-bind="attrs"
          v-on="on"
        >
          términos y condiciones
        </p>
      </template>

      <v-card class="pa-3 rounded-xl">
        <v-card-title class="headline mb-7 lighten-2" color="green">
         TÉRMINOS Y CONDICIONES
        </v-card-title>
         <v-card-subtitle color="green">
        Términos de uso
        </v-card-subtitle>
        <v-card-text>
          Los presentes Términos y Condiciones rigen la relación entre usted
          (en adelante referido como “Usuario”) y Mi Doc Technologies S.A.P.I. de C.V.
          (en adelante referido como “MiDoc”) con relación a los servicios y productos
          disponibles al Usuario a través del
          sitio web www.midocapp.com (en adelante
          referido como “Página Web”)
          y la app móvil (en adelante referido como “Aplicación Móvil”) ;
          a su vez, los presentes términos y condiciones
          regulan el uso de la Página Web, del que MiDoc, con razón social MiDoc
          Technologies S.A.P.I. de C.V,
          es propietario, la cual es una Sociedad Anónima Promotora de Inversión,
          con domicilio fiscal en Puebla 403, Col. Roma Norte, Delegación Cuauhtémoc,
           Ciudad de México, C.P. 06700.
        </v-card-text>
        <v-card-subtitle color="green">
        Aceptación de los términos y condiciones
        </v-card-subtitle>
         <v-card-text>
          Los presentes Términos y Condiciones rigen la relación entre usted
          (en adelante referido como “Usuario”) y Mi Doc Technologies S.A.P.I. de C.V.
          (en adelante referido como “MiDoc”) con relación a los servicios y productos
          disponibles al Usuario a través del
          sitio web www.midocapp.com (en adelante
          referido como “Página Web”)
          y la app móvil (en adelante referido como “Aplicación Móvil”) ;
          a su vez, los presentes términos y condiciones
          regulan el uso de la Página Web, del que MiDoc, con razón social MiDoc
          Technologies S.A.P.I. de C.V,
          es propietario, la cual es una Sociedad Anónima Promotora de Inversión,
          con domicilio fiscal en Puebla 403, Col. Roma Norte, Delegación Cuauhtémoc,
           Ciudad de México, C.P. 06700.
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="green"
            outlined
            text
            @click="noAcept"
          >
            No acepto
          </v-btn>
          <v-btn
            class="green"
            text
            @click="closeModal"
          >
            Acepto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['acceptConditions'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    noAcept() {
      this.dialog = false;
      this.acceptConditions(false);
    },
    closeModal() {
      this.dialog = false;
      this.acceptConditions(true);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
