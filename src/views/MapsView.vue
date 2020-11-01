<template>
  <div class="view">
    <v-card class="mx-5 pa-5">
      <div class="d-flex">
        <v-text-field
          class="mt-5 mx-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dense
          outlined
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
            class="mt-5 ml-5 mr-2"
            :items="items"
            label="Outlined style"
            dense
            outlined
            color="white"
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
            class="mt-5 mx-2"
            :items="items"
            label="Outlined style"
            dense
            outlined
        ></v-select>
        <v-spacer></v-spacer>
        <v-select
            class="mt-5 mx-2"
            :items="items"
            label="Outlined style"
            dense
            outlined
        ></v-select>
      </div>
      <div class="d-flex">
        <v-card class="mx-3 filter_price">
          <v-radio-group
            v-model="row"
            row
          >
            <v-radio
              label="Option 1"
              value="radio-1"
            ></v-radio>
            <v-radio
              label="Option 2"
              value="radio-2"
            ></v-radio>
          </v-radio-group>
          <v-card>
          <v-card-text>
              <v-slider
                v-model="cost"
                max="1000000"
                min="1000"
                thumb-label="always"
              ></v-slider>
            </v-card-text>
          </v-card>
        </v-card>
        <v-spacer></v-spacer>
        <v-card class="mx-3 filter_places">
          <v-checkbox
              v-model="policeStation"
              label="Comisaria"
              color="green"
          ></v-checkbox>
          <v-checkbox
              v-model="kinderGarden"
              label="Kindergarden"
              color="green"
          ></v-checkbox>
        </v-card>
      </div>
      <!-- <v-form
      class=" form mx-5 my-5"
      ref="form"
      lazy-validation
      >
        <v-text-field
          v-model="project"
          label="Proyecto"
          required
        ></v-text-field>
        <v-text-field
          v-model="distance"
          label="Proyecto"
          required
        ></v-text-field>
        <v-btn
          class="mr-4 blue"
          @click="eventBus.$emit('inputProject', { project, distance})"
        >
          Buscar
        </v-btn>
        {{currentProject}}
      </v-form> -->
    </v-card>
    <div class="ma-5">
    <GoogleMap :latitude= -12.089637033755114
    :longitude= -77.05453930635801
    />
    </div>
    <ProjectCards :projects="projects"/>
  </div>
</template>

<script>
import GoogleMap from '../components/GoogleMap.vue';
import ProjectCards from '../components/ProjectCards.vue';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';

export default {
  components: {
    GoogleMap,
    ProjectCards,
  },
  data() {
    return {
      kinderGarden: false,
      policeStation: false,
      projects: [],
      project: '',
      eventBus,
    };
  },
  created() {
    eventBus.$on('infoProject', (payload) => {
      this.projects = [payload.properties];
    });
  },
  methods: {
    filterByDistric(distric) {
      console.log(distric);
    },
  },
};
</script>

<style lang="scss" scoped>
.view{
  width:100%;
}
.filter_price{
  width: 40%;
}
.filter_places{
  width: 60%;
}
</style>
