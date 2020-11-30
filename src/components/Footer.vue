<template>
  <v-footer
    padless
  >
    <v-card
      class="d-flex"
      flat
      tile
    >
      <v-col class="col text-sm-body-1 px-10 mt-5" :key="data">
        <h4 class="py-3">CompraTuDepa</h4>
        <p >Atención al cliente</p>
        <p>Lima Perú</p>
        <p>+51 98741414</p>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" :key="data">
        <h4 class="py-3">Menú</h4>
        <router-link to="/home"><p >Inicio</p></router-link>
        <router-link to="/maps"><p>Proyectos</p></router-link>
        <router-link to="/advice"><p>Te asesoramos</p></router-link>
        <router-link to="/credits"><p >Términos y Condiciones</p></router-link>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" :key="data">
        <h4 class="py-3">Mi cuenta</h4>
        <p >Política de privacidad</p>
        <p>Términos y Condiciones</p>
        <p>Atención al cliente</p>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" :key="data">
        <h4 class="py-3">Estemos en contacto </h4>
        <v-text-field dense outlined label="Ingresa tu correo"
        append-outer-icon="mdi-map-marker"></v-text-field>
      </v-col>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
};
</script>
<style lang="scss" scoped>
.col{
  width: 25vw;
}
</style>
