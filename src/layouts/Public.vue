<template>
    <v-app>
      <NavBar :quantityInmobByDistrict="quantityInmobByDistrict" :prices="prices"/>
      <router-view></router-view>
      <v-divider></v-divider>
      <Footer/>
    </v-app>
</template>

<script>
import groupBy from 'group-by';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';
import { getMinPrice, getMaxPrice } from '../utils/prices';
// components
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      search: '',
      prices: {
        max: '',
        min: '',
      },
      quantityInmobByDistrict: [],
    };
  },
  created() {
    eventBus.$on('allProjects', (payload) => {
      const inmobiliarias = payload.map((inmob) => inmob.properties);
      this.prices.min = getMinPrice(inmobiliarias);
      this.prices.max = getMaxPrice(inmobiliarias);
      const lengthOfDistrics = Object.values(groupBy(inmobiliarias, 'distrito'));
      this.quantityInmobByDistrict = lengthOfDistrics.map((inmb) => ({
        district: inmb[0].distrito,
        quantity: inmb.length,
      })).sort((a, b) => {
        if (a.quantity < b.quantity) {
          return 1;
        }
        if (a.quantity > b.quantity) {
          return -1;
        }
        return 0;
      });
    });
  },
};
</script>

<style>
</style>
