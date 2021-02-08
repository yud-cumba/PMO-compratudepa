<template>
  <v-card v-if="show" class="pa-5">
      <p class="titulo"> ¿Qué puedo encontrar a 15 min. caminando ?</p>
    <v-row>
        <v-col>
    <v-expansion-panels>
      <v-expansion-panel v-for="place in nearPlacesDivided.first" :key="place.value">
        <v-expansion-panel-header>
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
    <v-col>
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
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
import places from '../utils/places';

export default {
  props: ['project', 'show'],
  computed: {
    nearPlaces() {
      const near = [];
      Object.keys(places).forEach((placeKey) => {
        if (this.project[placeKey].length) {
          const place = {
            ...places[placeKey],
            namePlaces: this.project[placeKey],
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
  },
};
</script>

<style lang="scss" scoped>
</style>
