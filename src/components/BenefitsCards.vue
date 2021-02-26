<template>
  <div class="d-flex flex-column justify-center align-center pa-5">
    <h2 class="mb-7">{{ title }}</h2>
    <v-row no-gutters>
      <v-col v-for="reason in reasons" :key="reason.title" class="pa-5">
        <v-card class="mx-auto contenedor" max-width="350" min-height="350"
        @click="reason.function" >
          <v-img
            class="white--text align-end"
            height="150px"
            gradient="to bottom, rgba(0,128,0,.1), rgba(0,20,0,.9)"
            :src="require(`../assets/${reason.img}`)"
          >
            <v-card-title>{{reason.title}}</v-card-title>
          </v-img>
          <v-card-text class="text--primary d-flex" :style="{height: '110px'}">
           <h4 class="mt-">{{reason.text}}</h4>
          </v-card-text>
            <v-divider></v-divider>
          <v-card-actions>
              <IconifyIcon :icon="reason.icon"
              :style="{color: '#41f683', fontSize: '50px', margin: '5px'}" />
              <h4>Conoce un poco más <v-icon>mdi-arrow-right-thick</v-icon></h4>
          </v-card-actions>
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
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import IconifyIcon from '@iconify/vue';

export default {
  props: ['reasons'],
  data: () => ({
    title: '¿Cuáles son los beneficios de publicar con nosotros?',
  }),
  components: {
    IconifyIcon,
  },
};
</script>

<style lang="scss" scoped>
.contenedor:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.contenedor {
  overflow: hidden;
}
</style>
