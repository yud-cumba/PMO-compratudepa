<template>
  <v-img
    src="../assets/fondo-verde.jpg"
    gradient="to bottom, rgb(255, 255, 255, 0.8), rgb(255, 255, 255, 0.2)"
    max-height="600"
    class="d-flex justify-center align-center"
  >
    <v-row>
      <v-col class="pa-12 d-flex flex-column align-center justify-center">
        <h1 class="px-12">Iniciar sesión nos trae múltiples beneficios</h1>
        <ul class="text-start">
          <li class="my-5" v-for="item in items" :key="item">
            <h3>{{ item }}</h3>
          </li>
        </ul>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto my-4 pa-5"
          max-width="500"
          min-height="250"
          v-for="reason in reasons"
          :key="reason.title"
        >
          <v-row class="d-flex">
            <v-col>
              <h4 class="my-auto">{{ reason.text }}</h4>
              <h4 class="contenedor mt-10" @click="$router.push(reason.route)">
                Quiero formar parte de COMPRATUDEPA!
                <v-icon color="green">mdi-arrow-right-thick</v-icon>
              </h4>
            </v-col>
            <v-col>
              <v-img
                min-height="180"
                width="200"
                :src="require(`../assets/${reason.img}`)"
              >
              </v-img>
            </v-col>
          </v-row>
        </v-card>
        <!-- <v-card class="contenedor d-flex flex-column justify-center align-center pa-4"
            style="height: 300px" @click="$router.push(reason.route)">
              <IconifyIcon :icon="reason.icon"
              :style="{color: '#41f683', fontSize: '69px'}" />
              <h2 class="pa-3">{{reason.title}}</h2>
              <h4 class="mt-">{{reason.text}}</h4>
            </v-card> -->
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
export default {
  props: ['show'],
  data: () => ({
    items: [
      'Cotizaciones al instante',
      'Sección de proyectos favoritos',
      'Compartir el proyecto por facebook o whatssap',
      'Indicador de tu estado en el proceso de comprar tu depa',
      'Acceso a videos didácticos sobre tips para sacar tu crédito',
      'Puedes guardar tus proyectos favoritos',
      'Calificar proyectos',
    ],
    reasons: [
      {
        title: 'BÚSQUEDA A TU MEDIDA',
        img: 'advice1.png',
        text:
          'Estás buscando dónde vivir y quieres acceder a todos nuestros beneficios?',
        route: '/signup',
      },
      {
        title: 'AYUDA SOCIAL',
        img: 'advice2.png',
        text: 'Eres una inmobiliaria y quieres promocionarte con nosotros?',
        route: '/signupInmb',
      },
    ],
  }),
};
</script>
<style lang="scss" scoped>
.contenedor {
  cursor: pointer;
}
.contenedor:hover {
  cursor: pointer;
  color: green !important;
}
</style>
