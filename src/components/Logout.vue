<template>
<v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs"
      color="green"
          v-on="on">
        mdi-chevron-down
      </v-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
          v-if="role==='inmobiliaria'"
          color="#747474"
          text dark
          @click="$router.replace('/myprojects')"
        ><v-icon class="mr-2" size="30">mdi-bank-plus</v-icon>
          <span class="text-router">Quiero publicar</span>
        </v-btn>
        </v-list-item>
        <v-list-item
        >
        <v-btn color="#747474"
          text dark @click="logout">
            <v-icon class="mr-2" size="30">mdi-power-standby</v-icon>
            <span class="text-router">Cerrar Sesión</span>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import { logout } from '../firebase/auth';

export default {
  props: ['role'],
  methods: {
    logout,
  },
};
</script>

<style lang="scss" scoped>

</style>
