<template>
<div>
  <div v-if="$vuetify.breakpoint.smAndDown">
    <ToolBar :isLogin="isLogin" :role="user.role"
    :quantityInmobByDistrict='quantityInmobByDistrict' :prices='prices'/>
    </div>
  <v-card v-else class="elevation-1">
    <TitleNavBar :isLogin="isLogin"/>
    <v-list class="d-flex">
      <v-list-item
        class="text-lg-h6 ml-auto d-flex justify-end"
        @click="homeClick"
      >
        <h3>INICIO</h3>
      </v-list-item>
      <v-list-item>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-list-item
            class="text-lg-h6 d-flex justify-end"
            @click="projectsClick"
            v-click-outside="onClickOutside"
            v-on="on"
          >
           <h3> PROYECTOS</h3>
          </v-list-item>
        </template>
        <v-card v-if="!quantityInmobByDistrict.length" class="text-caption">
          <Loading :loading="loading" :size="15"/>
        </v-card>
        <v-card v-else>
          <v-row  v-for="m in vertical" :key="m" no-gutters>
            <v-col v-for="n in horizontal" :key="n">
              <v-card
                class="pa-2 card card-tab elevation-0"
                @click="
                  clickByDistrict(
                    quantityInmobByDistrict[m + (n - 1) * 4 - 1].district
                  )
                "
                tile
              >
                {{ quantityInmobByDistrict[m + (n - 1) * 4 - 1]?
                quantityInmobByDistrict[m + (n - 1) * 4 - 1].district : '' }}
                {{ quantityInmobByDistrict[m + (n - 1) * 4 - 1]?
                `(${quantityInmobByDistrict[m + (n - 1) * 4 - 1].quantity})` : ''}}
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>
      </v-list-item>
          <v-list-item
            class="text-lg-h6 d-flex justify-end"
            @click="adviceClick"
          >
            <h3>TE ASESORAMOS</h3>
          </v-list-item>
          <v-list-item
            class="text-lg-h6 d-flex justify-end"
            @click="creditsClick"
          >
           <h3> COMPROMISO SOCIAL</h3>
          </v-list-item>
          <v-list-item
            v-if="isLogin"
            class="text-lg-h6 d-flex justify-end"
            @click="favoriteClick"
          >
           <h3> MIS FAVORITOS</h3>
          </v-list-item>
    </v-list>
  </v-card>
</div>
</template>

<script>
import TitleNavBar from './TitleNavBar.vue';
import ToolBar from './Toolbar.vue';
import { verifyIsLogin, currentUser } from '../firebase/auth';
import { getUserByUid } from '../firebase/database';
import Loading from './Loading.vue';

export default {
  props: ['quantityInmobByDistrict', 'prices'],
  data() {
    return {
      Loading: true,
      active: false,
      isLogin: false,
      user: '',
      vertical: 5,
      horizontal: 6,
    };
  },
  components: {
    TitleNavBar,
    ToolBar,
    Loading,
  },
  methods: {
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
  watch: {
    quantityInmobByDistrict() {
      this.horizontal = Math.round(this.quantityInmobByDistrict.length / this.vertical);
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>
.text-caption {
  width: 85vw;
  height: 100px;
  display: flex;
  justify-items: center;
}
</style>
