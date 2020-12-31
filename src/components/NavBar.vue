<template>
<div>
  <div v-if="isMobile">
    <ToolBar :isLogin="isLogin"
    :quantityInmobByDistrict='quantityInmobByDistrict' :prices='prices'/>
    </div>
  <v-card v-else class="elevation-1">
    <TitleNavBar :isLogin="isLogin"/>
    <v-card-text  class="d-flex justify-end px-4">
      <div
        class="text-lg-h6 px-6 mx-6"
        @click="homeClick"
      >
        INICIO
      </div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <div
            class="text-lg-h6 px-6 mx-6"
            @click="projectsClick"
            v-click-outside="onClickOutside"
            v-on="on"
          >
            PROYECTOS
          </div>
        </template>
        <v-card v-if="quantityInmobByDistrict.length>0" class="text-caption">
          <v-row v-for="m in 4" :key="m" no-gutters>
            <v-col v-for="n in 6" :key="n">
              <v-card
                class="pa-2 card card-tab elevation-0"
                @click="
                  clickByDistrict(
                    quantityInmobByDistrict[m + (n - 1) * 4 - 1].district
                  )
                "
                tile
              >
                {{ quantityInmobByDistrict[m + (n - 1) * 4 - 1].district }}
                ({{ quantityInmobByDistrict[m + (n - 1) * 4 - 1].quantity }})
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>
          <div
            class="text-lg-h6 px-6 mx-6"
            @click="adviceClick"
          >
            TE ASESORAMOS
          </div>
          <div
            class="text-lg-h6 px-6 mx-6"
            @click="creditsClick"
          >
            COMPROMISO SOCIAL
          </div>
          <div
            v-if="isLogin"
            class="text-lg-h6 px-6 mx-6"
            @click="favoriteClick"
          >
            MIS FAVORITOS
          </div>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import TitleNavBar from './TitleNavBar.vue';
import ToolBar from './Toolbar.vue';
import { verifyIsLogin, currentUser } from '../firebase/auth';
import { getUserByUid } from '../firebase/database';

export default {
  props: ['quantityInmobByDistrict', 'prices'],
  data() {
    return {
      active: false,
      isLogin: false,
      isMobile: false,
    };
  },
  components: {
    TitleNavBar,
    ToolBar,
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 800;
    },
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
          prices: this.prices,
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
  beforeDestroy() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('resize', this.onResize, { passive: true });
  },

  mounted() {
    this.onResize();

    window.addEventListener('resize', this.onResize, { passive: true });
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>
.text-caption {
  width: 70vw;
}
</style>
