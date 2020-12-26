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
import inm from '../data/inmobiliarias.json';

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
    const inmobiliarias = inm.features.map((inmob) => inmob.properties);
    const min = getMinPrice(inmobiliarias);
    const max = getMaxPrice(inmobiliarias);
    const lengthOfDistrics = Object.values(groupBy(inmobiliarias, 'distrito'));
    const quantityInmobByDistrict = lengthOfDistrics.map((inmb) => ({
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
    return {
      search: '',
      prices: {
        max,
        min,
      },
      groupByDistric: groupBy(inmobiliarias, 'distrito'),
      quantityInmobByDistrict,
      inmobiliarias,
    };
  },
};
</script>

<style>
</style>
