<template>
    <div class="d-flex flex-column justify-center align-center pa-5">
        <h2>{{title}}</h2>
        <v-row no-gutters>
            <v-col v-for="reason in reasons" :key="reason.title"
            class="pa-5" >
            <v-card class="d-flex flex-column justify-center align-center pa-4"
            style="height: 300px" @click="$router.push(reason.route)">
              <IconifyIcon :icon="reason.icon"
              :style="{color: '#41f683', fontSize: '69px'}" />
              <h2 class="pa-3">{{reason.title}}</h2>
              <h4 class="mt-">{{reason.text}}</h4>
            </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import IconifyIcon from '@iconify/vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import detectiveIcon from '@iconify/icons-emojione-monotone/detective';
// eslint-disable-next-line import/no-extraneous-dependencies
import handHeart from '@iconify-icons/mdi/hand-heart-outline';
// eslint-disable-next-line import/no-extraneous-dependencies
import clipboardIcon from '@iconify/icons-emojione-monotone/clipboard';

export default {
  data: () => ({
    title: '¿Cuáles son tus beneficios de publicar con nosotros?',
    reasons: [
      {
        icon: detectiveIcon,
        title: 'BÚSQUEDA A TU MEDIDA',
        text: 'Te brindamos varias opciones de búsqueda para que puedas elegir de forma rápida y fácil el departamento que te interese.',
        route: '/maps?district=&pricesMin=59000&pricesMax=1405000&typePrice=S%2F.&rooms=&phase=',
      },
      {
        icon: handHeart,
        title: 'AYUDA SOCIAL',
        text: 'Somos una plataforma de ayuda solidaria cuyo objetivo es ayudar a generar oportunidades de mejora en los rubros de salud, educación y cultura.',
        route: '/oli',
      },
      {
        icon: clipboardIcon,
        title: 'TE ASESORAMOS EN EL PROCESO',
        text: 'Te otorgamos infomación útil y necesaria para que puedas encontrar el hogar ideal para tī',
        route: '/advices',
      },
    ],
  }),
  components: {
    IconifyIcon,
  },
};
</script>

<style lang="scss" scoped>
</style>
