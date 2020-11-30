<template>
  <v-card class="elevation-1">
    <v-card-title class="text-center d-flex">
      <v-img src="../assets/logoPMO.png" aspect-ratio="1"
        class="mr-auto" max-height="60" max-width="270">
      </v-img>
      <v-btn color="green" outlined class="mx-2" @click="$router.replace('/login')">
        Inicia seción
      </v-btn>
      <v-btn color="green" outlined class="mx-2" @click="$router.replace('/Mis%20proyectos')">
        Quiero publicar
      </v-btn>
    </v-card-title>
    <v-card-text class="d-flex justify-end px-4">
      <div
          class="text-lg-h6 px-6 mx-6"
          @click="homeClick"
          v-click-outside="onClickOutside"
          v-bind="attrs"
          v-on="on"
          >
          INICIO
      </div>
      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div
        class="text-lg-h6 px-6 mx-6"
        @click="projectsClick"
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
                <v-card class="pa-2 card card-tab elevation-0"
                @click="clickByDistrict(quantityInmobByDistrict[m+(n-1)*4-1].district)"
                tile>
                {{quantityInmobByDistrict[m+(n-1)*4-1].district}}
                ({{quantityInmobByDistrict[m+(n-1)*4-1].quantity}})
                </v-card>
              </v-col>
          </v-row>
        </v-card>
      </v-menu>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div
            class="text-lg-h6 px-6 mx-6"
            @click="adviceClick"
            v-click-outside="onClickOutside"
            v-bind="attrs"
            v-on="on"
            >
            TE ASESORAMOS
            </div>
        </template>
        </v-menu>
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <div
            class="text-lg-h6 px-6 mx-6"
            @click="creditsClick"
            v-click-outside="onClickOutside"
            v-bind="attrs"
            v-on="on"
            >
            CRÉDITOS
            </div>
        </template>
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
    homeClick() {
      this.$gtag.event('Inicio', {
        event_category: 'NavBar',
        event_label: 'NavBar Inicio clicked',
        value: 1,
      });
      this.$router.push({ path: '/' });
    },
    clickByDistrict(district) {
      this.$gtag.event(`Proyectos-${district}`, {
        event_category: 'NavBar',
        event_label: `NavBar Proyectos ${district} clicked`,
        value: 1,
      });
      this.$router.push({
        path: '/maps',
        query: {
          district,
          prices: {
            min: 2000, max: 20000,
          },
          typePrice: 'Soles',
          rooms: false,
        },
      });
    },
    projectsClick() {
      this.active = true;
      this.$gtag.event('Proyectos', {
        event_category: 'NavBar',
        event_label: 'NavBar Proyectos clicked',
        value: 1,
      });
    },
    adviceClick() {
      this.$gtag.event('Asesoramiento', {
        event_category: 'NavBar',
        event_label: 'NavBar Asesoramiento clicked',
        value: 1,
      });
      this.$router.push({ path: '/advices' });
    },
    creditsClick() {
      this.$gtag.event('Creditos', {
        event_category: 'NavBar',
        event_label: 'NavBar Creditos clicked',
        value: 1,
      });
      this.$router.push({ path: '/credits' });
    },
  },
};
</script>

<style lang="scss" scoped>
.text-caption{
    width: 70vw;
}
</style>
