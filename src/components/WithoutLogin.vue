<template>
    <div class="text-center">
        <h1 class="my-10">Para conocer lo que te ofrecemos
            <router-link to="/login" class="green--text"> Inicia Sesión </router-link>
        </h1>
        <div class="d-flex">
            <ul style="width:50%" class="text-start pa-12 mx-12">
                <li class="my-5 ma-12" v-for="item in items" :key="item"><h3>{{item}}</h3></li>
            </ul>
            <v-img src="../assets/withoutlogin.png" width="200">
            </v-img>
        </div>
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
