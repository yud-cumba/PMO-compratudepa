<template>
    <div>
        <v-parallax src="../assets/oli-1.png">
        </v-parallax>
        <v-col class="pl-12 mx-10 mt-10">
                 <h1 class="mx-10">HISTORIA</h1>
                 <p class="mx-10">Somos una plataforma de ayuda solidaria cuyo objetivo
            es ayudar a generar oportunidades de mejora en los rubros de salud,
                educación y cultura.</p>
                <h1 class="mx-10">¿CÓMO PUEDO CONTRIBUIR?</h1>
        </v-col>
        <v-row class="px-12 mx-10">
            <v-col class="pr-12">
                <v-card class="ml-5" rounded="4" color="rgb(0, 255, 0, 0.2)" height="130"
            >
                    <v-card-title>
                        1. Inicia Sesión
                    </v-card-title>
                    <v-card-text>
                        Iniciar sesión fue el primer paso,
                    </v-card-text>
                </v-card>
                 </v-col>
             <v-col class="pr-12">
                  <v-card class="mr-5" color="rgb(0, 255, 0, 0.2)" height="130"
            >
                    <v-card-title>
                        2. Separa tu depa
                    </v-card-title>
                    <v-card-text>
                        Llegó la hora de dar el siguiente paso,
                        para continuar apoyando a la fundaciónm OLI,
                        debes elegir un depa y seprarlo por nuestra plataforma.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
         <v-row class="pa-12 mx-10">
            <v-col class=" d-flex flex-column justify-center align-center">
                 <v-img src="../assets/oli-2.png" max-width="400"></v-img>
                 <h2 class="ma-12">Juntos lograremos crear más hospitales, escuelas,
                    programas de nutrición, canchitas de fútbol, para estas familias.
                    ¡Contamos con tu apoyo!</h2>
            </v-col>
            <v-col class=" d-flex flex-column justify-center align-center">
                <h2 class="ma-12">La fundación OLI apoya a niños y niñas de bajos recursos.
                    Sé un voluntario de OLi, súmate a apoyar. </h2>
                     <v-img src="../assets/oli-3.png" max-width="400"></v-img>
            </v-col>
         </v-row>
         <p class="text-center">
             Para conocer más de la inoiciatica visita su página web :
             <a href="http://www.olifundation.com">www.olifundation.com</a></p>
    </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
  },
};
</script>

<style lang="scss" scoped>

</style>
