<template>
  <div class="d-flex view">
    <v-card class="py-3 d-flex flex-column align-center card">
      <v-form
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
      </v-form>
    </v-card>
    <GoogleMap :latitude= -12.089637033755114
    :longitude= -77.05453930635801
    />
  </div>
</template>

<script>
import GoogleMap from '../components/GoogleMap.vue';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      project: '',
      distance: 1000,
      currentProject: {},
      eventBus,
    };
  },
  created() {
    eventBus.$on('infoProject', (payload) => {
      this.currentProject = payload;
    });
  },
};
</script>

<style lang="scss" scoped>
.view{
  width:100vw;
}
.card{
  width: 30vw;
}
</style>
