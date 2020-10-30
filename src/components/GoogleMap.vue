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
      @click="toggleInfo(m.id)"
    ></gmap-marker>
  </gmap-map>
</template>
<script>
import inmobiliarias from '../data/inmobiliarias.json';
import { eventBus } from '../main';

export default {
  data() {
    const totalMakers = inmobiliarias.features.map((inmob) => ({
      position: {
        lat: inmob.geometry.coordinates[1],
        lng: inmob.geometry.coordinates[0],
      },
      title: inmob.properties.Proyecto,
      id: inmob.id,
      eventBus,
    }));
    return {
      inmobiliarias: inmobiliarias.features,
      center: { lat: this.latitude, lng: this.longitude },
      totalMakers,
      markers: totalMakers,
      currentInmob: {},
    };
  },

  props: ['latitude', 'longitude'],
  methods: {
    toggleInfo(id) {
      // eslint-disable-next-line prefer-destructuring
      this.currentInmob = this.inmobiliarias.filter((e) => e.id === id)[0];
    },
    showAll() {
      this.markers = this.totalMakers;
    },
  },
  watch: {
    currentInmob() {
      eventBus.$emit('infoProject', this.currentInmob);
    },
  },
  created() {
    eventBus.$on('inputProject', (payload) => {
      // eslint-disable-next-line prefer-destructuring
      this.markers = this.totalMakers.filter((e) => e.title === payload.project);
    });
  },
};
</script>
