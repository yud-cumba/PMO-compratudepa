<template>
    <v-row class="d-flex flex-column align-center">
    <v-alert
      dense
      outlined
      type="error"
    >
     No se encontraron proyectos
    </v-alert>
    <IconifyIcon
      :icon="detectiveIcon"
      :style="{ color: 'grey', fontSize: '300px' }"
    />
    </v-row>
</template>

<script>

import IconifyIcon from '@iconify/vue';
import detectiveIcon from '@iconify/icons-emojione-monotone/detective';

export default {
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
