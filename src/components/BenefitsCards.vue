<template>
    <div class="d-flex flex-column justify-center align-center pa-5">
        <h2>{{title}}</h2>
        <v-row no-gutters>
            <v-col v-for="reason in reasons" :key="reason.title"
            class="pa-5" >
            <v-card class="d-flex flex-column justify-center align-center pa-4"
            style="height: 300px">
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

import IconifyIcon from '@iconify/vue';
import detectiveIcon from '@iconify/icons-emojione-monotone/detective';
import dollarIcon from '@iconify/icons-emojione-monotone/dollar-banknote';
import clipboardIcon from '@iconify/icons-emojione-monotone/clipboard';

export default {
  data: () => ({
    title: '¿Cuáles son tus beneficios de publicar con nosotros?',
    reasons: [
      {
        icon: detectiveIcon,
        title: 'BÚSQUEDA A TU MEDIDA',
        text: 'Te brindamos varias opciones de búsqueda para que puedas elegir de forma rápida y fácil el departamento que te interese.',
      },
      {
        icon: dollarIcon,
        title: 'PAGO SEGURO Y CRÉDITOS',
        text: 'En la plataforma encontrarás opciones de pago accesibles y seguros, también tendrás opción de acceder a créditos hipotecarios con nuestros bancos afiliados.',
      },
      {
        icon: clipboardIcon,
        title: 'TE ASESORAMOS EN EL PROCESO',
        text: 'Te brindamos varias opciones de búsqueda para que puedas elegir de forma rápida y fácil el departamento que te interese.',
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
