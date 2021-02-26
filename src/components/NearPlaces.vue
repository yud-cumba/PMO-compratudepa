<template>
  <v-card class="pa-5">
      <p class="titulo"> ¿Qué puedo encontrar a 15 min. caminando ?</p>
    <v-row>
      <v-col>
  <gmap-map
    ref="mapRef"
    :center="center"
    :zoom="zoom"
    style="width: 100%; height: 700px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :title="m.title"
      :clickable="true"
      :draggable="true"
      :icon="m.img"
    ></gmap-marker>
  </gmap-map>
      </v-col>
        <v-col>
    <v-expansion-panels>
      <v-expansion-panel v-for="place in nearPlaces" :key="place.value">
        <v-expansion-panel-header @click="getPlace(place.value)">
          <div> <v-icon class="mx-2">{{ `mdi-${place.icon}` }}</v-icon
          >{{ place.value }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-divider class="green"></v-divider>
          <ul class="my-2">
            <li v-for="name in place.namePlaces" :key="name">
              {{ name }}
            </li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    <!-- <v-col>
        <v-expansion-panels>
      <v-expansion-panel v-for="place in nearPlacesDivided.end" :key="place.value">
        <v-expansion-panel-header>
          <div><v-icon class="mx-2">{{ `mdi-${place.icon}` }}</v-icon
          >{{ place.value }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
             <v-divider class="green"></v-divider>
          <ul class="my-2">
            <li v-for="name in place.namePlaces" :key="name">
              {{ name }}
            </li>
          </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col> -->
    </v-row>
  </v-card>
</template>

<script>
import places from '../utils/places';

export default {
  props: ['project'],
  data: () => ({
    zoom: 15,
    placeSelected: false,
  }),
  methods: {
    getPlace(place) {
      this.placeSelected = place;
    },
  },
  computed: {
    nearPlaces() {
      const near = [];
      Object.keys(places).forEach((placeKey) => {
        const keyCoord = `${placeKey.split('_')[0]}_coord`;
        if (this.project[placeKey].length) {
          const place = {
            ...places[placeKey],
            namePlaces: this.project[placeKey],
            coordPlaces: this.project[keyCoord],
          };
          near.push(place);
        }
      });
      return near;
    },
    nearPlacesDivided() {
      const total = this.nearPlaces.length;
      const size = Math.round(total / 2);
      return {
        first: this.nearPlaces.slice(0, size),
        end: this.nearPlaces.slice(size + 1, total),
      };
    },
    markers() {
      const inicial = [
        {
          title: this.project.name,
          position: {
            lat: this.project.geometry.coordinates[1],
            lng: this.project.geometry.coordinates[0],
          },
          img: {
            // eslint-disable-next-line global-require
            url: require('../assets/principalBuilding.svg'),
          },
        },
      ];
      if (this.nearPlaces.length && this.placeSelected) {
        const [selectedPlaces] = this.nearPlaces.filter((e) => e.value === this.placeSelected);
        const markers = selectedPlaces.namePlaces.map((title, i) => ({
          title,
          position: {
            lat: Number(selectedPlaces.coordPlaces[i][1]),
            lng: Number(selectedPlaces.coordPlaces[i][0]),
          },
          img: {
            // eslint-disable-next-line global-require
            url: require('../assets/location-pin.svg'),
          },
        }));
        return inicial.concat(markers);
      } return inicial;
    },
    center() {
      const center = {
        lat: this.project.geometry.coordinates[1],
        lng: this.project.geometry.coordinates[0],
      };
      return center;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
