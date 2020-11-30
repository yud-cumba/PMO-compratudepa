<template>
    <div>
        <v-parallax src="../assets/oli-1.png">
        </v-parallax>
        <v-row class="pa-12">
            <v-col class="pl-12">
                <h1>HISTORIA</h1>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo
                es ayudar a generar oportunidades de mejora en los rubros de salud,
                 educación y cultura.</p>
                 <v-img src="../assets/oli.png" width="200"></v-img>
            </v-col>
            <v-col class="pr-12">
                <h1>¿CÓMO PUEDO CONTRIBUIR?</h1>
                <h3>1. SEPARA TU DEPA CON NOSOTROS</h3>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar
                    oportunidades de mejora en los rubros de salud, educación y cultura.</p>
                    <h3>1. SEPARA TU DEPA CON NOSOTROS</h3>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar
                    oportunidades de mejora en los rubros de salud, educación y cultura.</p>
            </v-col>
        </v-row>
         <v-row class="pa-12">
            <v-col class="pl-12">
                 <v-img src="../assets/oli-2.png" max-width="400"></v-img>
            </v-col>
            <v-col class="pr-12">
                <h1>¿CÓMO PUEDO CONTRIBUIR?</h1>
                <h3>1. SEPARA TU DEPA CON NOSOTROS</h3>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar
                    oportunidades de mejora en los rubros de salud, educación y cultura.</p>
                    <h3>1. SEPARA TU DEPA CON NOSOTROS</h3>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar
                    oportunidades de mejora en los rubros de salud, educación y cultura.</p>
            </v-col>
        </v-row>
         <v-row class="pa-12">
            <v-col class="pl-12">
                <h1>¿CÓMO PUEDO CONTRIBUIR?</h1>
                <h3>1. SEPARA TU DEPA CON NOSOTROS</h3>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar
                    oportunidades de mejora en los rubros de salud, educación y cultura.</p>
                    <h3>1. SEPARA TU DEPA CON NOSOTROS</h3>
                <p>Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar
                    oportunidades de mejora en los rubros de salud, educación y cultura.</p>
            </v-col>
            <v-col class="pr-12">
                 <v-img src="../assets/oli-3.png" max-width="400"></v-img>
            </v-col>
        </v-row>
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
