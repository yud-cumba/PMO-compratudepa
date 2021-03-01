<template>
  <div class="pa-5">
    <v-parallax src="../assets/oli-1.png"> </v-parallax>
    <v-row>
      <v-col>
        <h1 class="text-center">¿CÓMO PUEDO CONTRIBUIR?</h1>
        <h3 class="text-center">
          Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a
          generar oportunidades de mejora en los rubros de salud, educación y
          cultura.
        </h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card rounded="4" color="rgb(0, 255, 0, 0.2)" height="">
          <v-card-title> 1. Inicia sesión </v-card-title>
          <v-card-text>
              Iniciar sesión en nuestra plataforma y empezar a utilizarla frencuentemente
              es solo el primer paso.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="rgb(0, 255, 0, 0.2)">
          <v-card-title> 2. Separa tu depa </v-card-title>
          <v-card-text>
            Para continuar apoyando a la fundación OLI, debes elegir un depa y
            separarlo por nuestra plataforma.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img src="../assets/oli-2.png"></v-img>
        <h2 class="my-6 text-center">
          Juntos lograremos crear más hospitales, escuelas, programas de
          nutrición, canchitas de fútbol, para estas familias. ¡Contamos con tu
          apoyo!
        </h2>
      </v-col>
      <v-col>
        <h2 class="my-6 text-center">
          La fundación OLI apoya a niños y niñas de bajos recursos. Sé un
          voluntario de OLi, súmate a apoyar.
        </h2>
        <v-img src="../assets/oli-3.png"></v-img>
      </v-col>
    </v-row>
    <v-row class="text-center">
      Para conocer más de la inoiciatica visita su página web :
      <a href="https://www.instagram.com/fundacionoli/ " target="_blank">https://www.instagram.com/fundacionoli/</a></v-row
    >
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('layout/SET_LAYOUT', 'public-layout');
  },
};
</script>

<style lang="scss" scoped>
</style>
