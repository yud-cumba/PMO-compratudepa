<template>
  <v-card class="elevation-0">
    <v-card-title class="text-center">
      <v-img src="../assets/logoPMO.png" aspect-ratio="1"
                       class="mr-3" max-height="60" max-width="270">
      </v-img>
    </v-card-title>
    <v-card-text class="d-flex justify-end px-4">
        <router-link to="/">
            <div
                class="text-lg-h6 px-6 mx-6"
                @click="active=true"
                v-click-outside="onClickOutside"
                v-bind="attrs"
                v-on="on"
                >
                INICIO
            </div>
        </router-link>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div
            class="text-lg-h6 px-6 mx-6"
            @click="active=true"
            v-click-outside="onClickOutside"
            v-bind="attrs"
            v-on="on"
            >
            PROYECTOS
            </div>
        </template>
            <v-card class="text-caption">
                <v-row v-for="m in 4" :key="m" no-gutters>
                    <v-col v-for="n in 6" :key="n">
                        <v-card class="pa-2 card card-tab elevation-0" tile>
                        <router-link :to="`/maps/${quantityInmobByDistrict[m+(n-1)*4-1].district}`">
                        {{quantityInmobByDistrict[m+(n-1)*4-1].district}}
                        ({{quantityInmobByDistrict[m+(n-1)*4-1].quantity}})
                        </router-link>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-menu>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div
            class="text-lg-h6 px-6 mx-6"
            @click="inmobiliariasClick"
            v-click-outside="onClickOutside"
            v-bind="attrs"
            v-on="on"
            >
            INMOBILIARIAS
            </div>
        </template>
            <v-card class="text-caption">
                nada
            </v-card>
        </v-menu>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div
            class="text-lg-h6 px-6 mx-6"
            @click="active=true"
            v-click-outside="onClickOutside"
            v-bind="attrs"
            v-on="on"
            >
            CRÉDITOS
            </div>
        </template>
            <v-card class="text-caption">
                HOLA
            </v-card>
        </v-menu>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['quantityInmobByDistrict', 'items'],
  data() {
    return {
      active: false,
      tab: null,
    };
  },
  methods: {
    onClickOutside() {
      this.active = false;
    },
    inmobiliariasClick() {
      alert('click2');
      this.$gtag.event('Inmobiliarias-click', {
        event_category: 'Views',
        event_label: 'NavBar Inmobiliarias clicked',
        value: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.text-caption{
    width: 70vw;
}
</style>
