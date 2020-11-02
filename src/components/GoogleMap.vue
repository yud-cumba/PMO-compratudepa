<template>
  <gmap-map
    :center="center"
    :zoom="12"
    style="width: 100%; height: 500px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.title"
      :clickable="true"
      :draggable="true"
      :icon="{ url: require('../assets/building.svg')}"
      @click="toggleInfo(m.position)"
    ></gmap-marker>
  </gmap-map>
</template>
<script>
import { eventBus } from '../main';

export default {
  data() {
    return {
      center: { lat: this.latitude, lng: this.longitude },
      currentInmob: [],
    };
  },

  props: ['latitude', 'longitude', 'markers', 'totalMarkers'],
  methods: {
    toggleInfo(position) {
      // eslint-disable-next-line max-len
      this.currentInmob = this.totalMarkers.filter((e) => e.position.lat === position.lat && e.position.lag === position.lag);
      // eslint-disable-next-line prefer-destructuring
      // this.currentInmob = this.inmobiliarias.filter((e) => e.id === id)[0];
    },
  },
  watch: {
    currentInmob() {
      eventBus.$emit('infoProject', this.currentInmob);
    },
  },
  // created() {
  //   eventBus.$on('inputProject', (payload) => {
  //     // eslint-disable-next-line prefer-destructuring
  //     this.markers = this.totalMakers.filter((e) => e.title === payload.project);
  //   });
  // },
};
</script>
