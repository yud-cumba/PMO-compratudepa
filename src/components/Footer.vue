<template>

  <v-footer
    padless
  >
  <v-toolbar v-if="isMobile">
     <v-img
        src="../assets/logoPMO.png"
        aspect-ratio="1"
        class="my-5"
        max-height="40"
        max-width="180"
      />
      <div class="ml-auto">
      <v-icon>mdi-facebook</v-icon>
      <v-icon>mdi-instagram</v-icon>
      <v-icon>mdi-linkedin</v-icon>
      </div>
  </v-toolbar>
    <v-card
    v-else
      class="d-flex"
      flat
      tile
    >
      <v-col class="col text-sm-body-1 px-10 mt-5">
        <v-img
        src="../assets/logoPMO.png"
        aspect-ratio="1"
        class="my-5 mx-0"
        max-height="40"
        max-width="180"
      />
        <p class=" mx-2">Lima Perú</p>
        <p class=" mx-2">+51 98741414</p>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" >
        <h4 class="py-3">Menú</h4>
        <router-link to="/home" style="text-decoration: none">
        <p style="color:black">Inicio</p></router-link>
        <router-link to="/maps" style="text-decoration: none">
        <p style="color:black">Proyectos</p></router-link>
        <router-link to="/advice" style="text-decoration: none">
        <p style="color:black">Te asesoramos</p></router-link>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5">
        <h4 class="py-3">Mi cuenta</h4>
        <p >Política de privacidad</p>
        <p>Términos y Condiciones</p>
        <p>Atención al cliente</p>
      </v-col>
      <v-col class="col text-sm-body-1 px-10 mt-5" >
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
    isMobile: false,
  }),
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 800;
    },
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },

  mounted() {
    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>
<style lang="scss" scoped>
.col{
  width: 25vw;
}
</style>
