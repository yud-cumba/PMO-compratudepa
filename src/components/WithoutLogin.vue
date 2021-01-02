<template>
    <div class="text-center">
        <h1 class="my-10">Para conocer lo que te ofrecemos
            <router-link to="/login" class="green--text"> Inicia Sesión </router-link>
        </h1>
        <v-row class="d-flex">
            <v-col>
                <ul  class="text-start">
                <li class="my-5 ma-12" v-for="item in items" :key="item"><h3>{{item}}</h3></li>
            </ul>
            </v-col>
            <v-col>
                <v-img src="../assets/withoutlogin.png">
            </v-img>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
  data: () => ({
    items: ['Cotizaciones al instante',
      'Sección de proyectos favoritos',
      'Compartir el proyecto por facebook o whatssap',
      'Indicador de tu estado en el proceso de comprar tu depa',
      'Acceso a videos didácticos sobre tips para sacar tu crédito'],
  }),
};
</script>

<style lang="scss" scoped>

</style>
