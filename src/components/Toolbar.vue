<template>
  <div>
    <v-toolbar
      color="green"
      dark
      @click.stop="drawer = !drawer"
      class="hidden-md-and-up pa-2"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <div v-if="isLogin" class="d-flex ml-auto">
        <h3 class="mt-2 white--text">{{ user.name }}</h3>
        <div v-if="!!user.photo">
          <v-img :src="user.photo" class="rounded-circle mx-3" max-width="50">
          </v-img>
        </div>
        <div v-else>
          <v-icon color="white" x-large class="mx-3">mdi-account-circle</v-icon>
        </div>
      </div>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      app
      width="200"
      id="drawer"
    >
      <v-img
        src="../assets/logoPMO.png"
        aspect-ratio="1"
        class="my-5"
        max-height="40"
        max-width="180"
      />
      <v-list nav dense>
        <v-list-item-group active-class="green--text text--green">
          <v-list-item @click="homeClick"> INICIO </v-list-item>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <div class="mx-2 my-1" @click="projectsClick" v-on="on">
                PROYECTOS
              </div>
            </template>
            <v-card
              v-if="quantityInmobByDistrict.length > 0"
              class="text-caption"
            >
              <v-row v-for="m in 10" :key="m" no-gutters>
                <v-col v-for="n in 3" :key="n">
                  <v-card
                    style="width: 82px"
                    class="pa-2 card card-tab elevation-0"
                    @click="
                      clickByDistrict(
                        quantityInmobByDistrict[m + (n - 1) * 10 - 1].district
                      )
                    "
                    tile
                  >
                    {{ quantityInmobByDistrict[m + (n - 1) * 10 - 1].district }}
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
          <v-list-item @click="adviceClick"> TE ASESORAMOS </v-list-item>
          <v-list-item @click="creditsClick"> COMPROMISO SOCIAL </v-list-item>
          <v-list-item @click="favoriteClick" v-if="isLogin">
            MIS FAVORITOS
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="my-2" v-if="isLogin">
          <v-btn
            v-if="role === 'inmobiliaria'"
            color="#747474"
            text
            dark
            @click="$router.push('/myprojects')"
            ><v-icon class="mr-2" size="30">mdi-bank-plus</v-icon>
            <span class="text-router">Quiero publicar</span>
          </v-btn>
          <v-btn color="#747474" class="my-2" text dark @click="logout">
            <v-icon size="30">mdi-power-standby</v-icon>
            <span class="text-router">Cerrar Sesión</span>
          </v-btn>
        </div>
        <div v-else class="pa-3">
          <v-list-item>
            <v-btn color="green" outlined @click="$router.push('/login')">
              Inicia sesión
            </v-btn>
          </v-list-item>
          <v-btn color="green" outlined @click="$router.push('/signupInmb')">
            Quiero publicar
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { verifyIsLogin, currentUser, logout } from '../firebase/auth';
import { getUserByUid } from '../firebase/database';
// import Logout from './Logout.vue';

export default {
  props: ['isLogin', 'quantityInmobByDistrict', 'prices', 'role'],
  data: () => ({
    user: {},
    drawer: false,
  }),
  components: {
    // Logout,
  },
  methods: {
    logout,
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            this.user = user;
          });
        },
        () => {
          this.isLogin = false;
        },
      );
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
          pricesMin: this.prices.min,
          pricesMax: this.prices.max,
          typePrice: 'S/.',
          rooms: '',
          phase: '',
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
      this.$gtag.event('Oli', {
        event_category: 'NavBar',
        event_label: 'NavBar Oli clicked',
        value: 1,
      });
      this.$router.push({ path: '/oli' });
    },
    favoriteClick() {
      this.$gtag.event('Favorite', {
        event_category: 'NavBar',
        event_label: 'NavBar Favorite clicked',
        value: 1,
      });
      this.$router.push({ path: '/favorite' });
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>
</style>
