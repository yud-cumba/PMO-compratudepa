<template>
    <v-btn @click="logout">
        Cerrar sesión
      </v-btn>
</template>

<script>
import { logout } from '../firebase/auth';

export default {

  methods: {
    logout,
  },
};
</script>

<style lang="scss" scoped>

</style>
