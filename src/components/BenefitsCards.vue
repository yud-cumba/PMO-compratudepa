<template>
    <div class="d-flex flex-column justify-center align-center px-12 mx-8">
        <h2 class="ma-8">{{title}}</h2>
        <div class="d-flex justify-center align-center">
            <div v-for="reason in reasons" :key="reason.icon" >
                <v-card class="d-flex justify-center align-center mx-7 card">
                    <v-icon max-width="180">
                        {{reason.icon}}
                    </v-icon>
                </v-card>
                <h4 class="card mx-7 mt-4">{{reason.text}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    title: '¿Cuáles son tus beneficios de publicar con nosotros?',
    reasons: [
      { icon: 'mdi-check-bold', text: 'Encontrarás la rapiddez, calidad y guía para que puedas publicar tus avisos.' },
      { icon: 'mdi-android-messages', text: 'Encontrarás la rapiddez, calidad y guía para que puedas publicar tus avisos.' },
      { icon: 'mdi-check-bold', text: 'Encontrarás la rapiddez, calidad y guía para que puedas publicar tus avisos.' },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.card{
    width: 200px;
    height: 200px;

}
</style>
