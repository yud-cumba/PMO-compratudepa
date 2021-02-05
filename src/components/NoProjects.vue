<template>
    <v-row class="d-flex flex-column align-center">
    <v-alert
      dense
      outlined
      type="error"
    >
     {{message}}
    </v-alert>
    <IconifyIcon
      :icon="detectiveIcon"
      :style="{ color: 'grey', fontSize: '250px' }"
    />
    </v-row>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import IconifyIcon from '@iconify/vue';
import detectiveIcon from '@iconify/icons-emojione-monotone/detective';

export default {
  props: ['message'],
  data: () => ({
    detectiveIcon,
  }),
  components: {
    IconifyIcon,
  },
};
</script>

<style lang="scss" scoped>

</style>
