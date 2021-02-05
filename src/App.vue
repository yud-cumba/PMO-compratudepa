<template>
<v-app>
  <component :is="layout"></component>
</v-app>
</template>
<script>
import { mapState } from 'vuex';
import PublicLayout from './layouts/Public.vue';
import RealStateLayout from './layouts/RealState.vue';

export default {
  components: { PublicLayout, RealStateLayout },
  computed: mapState(['layout']),
  created() {
    console.log('is mobileç', this.$vuetify.breakpoint.smAndDown);
  },
};
</script>
