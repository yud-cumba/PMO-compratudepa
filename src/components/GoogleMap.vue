<template>
  <gmap-map
    :center="center"
    :zoom="z"
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
      z: this.zoom,
    };
  },

  props: ['latitude', 'longitude', 'markers', 'totalMarkers', 'zoom'],
  methods: {
    toggleInfo(position) {
      // eslint-disable-next-line max-len
      this.currentInmob = this.totalMarkers.filter((e) => e.position.lat === position.lat && e.position.lng === position.lng);
      this.center = {
        lat: this.currentInmob[0].position.lat,
        lng: this.currentInmob[0].position.lng,
      };
      this.z = 20;
    },
  },
  watch: {
    currentInmob() {
      eventBus.$emit('infoProject', this.currentInmob);
    },
    latitude() {
      this.z = 15;
      this.center = { lat: this.latitude, lng: this.longitude };
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
