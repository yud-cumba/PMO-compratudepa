<template>
<v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
         <v-btn
      class="mx-2 my-1"
      fab
      dark
      v-bind="attrs"
          v-on="on"
          small
      color="green"
    >
      <v-icon dark>
        mdi-power-standby
      </v-icon>
    </v-btn>
      </template>
      <v-list>
        <v-list-item
        >
        <v-btn color="#747474" class="width-off"
          text dark @click="logout">
            <v-icon class="pl-1" size="30">mdi-power-standby</v-icon>
            <span class="text-router">Cerrar Sesión</span>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
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
