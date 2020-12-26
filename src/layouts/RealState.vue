<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
    >
      <v-list class="d-flex flex-column align-start" dense nav>
        <v-list-item class="my-12 mx-0">
          <v-img src="../assets/logoPMO.png" max-height="80" max-width="200">
          </v-img>
          <v-btn icon class="mx-1" @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item
          class="my-1 text-start list my-3 pa-2"
          v-for="([icon, view, rout], i) in views"
          :key="i"
          link
          width="100"
        >
          <v-btn class="mx-3" fab dark small color="green">
            <v-icon dark>
              {{ icon }}
            </v-icon>
          </v-btn>
          <v-list-item-content>
            <v-list-item-title @click="$router.push(rout)" class="text-router">
              <strong class="text-md-body-1" color="black">{{ view }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn color="#747474" class="my-12 "
          text dark @click="logout">
            <v-icon class="pl-1" size="30">mdi-power-standby</v-icon>
            <span class="text-router">Cerrar Sesión</span>
          </v-btn>
      </v-list>
    </v-navigation-drawer>
    <v-content style="background-color: white">
            <Title/>
            <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import Title from '../components/TitleRealState.vue';
import { logout } from '../firebase/auth';

export default {
  data: () => ({
    drawer: true,
    mini: false,
    views: [
      ['mdi-home', 'Dashboard', '/dashboard'],
      ['mdi-form-select', 'Mis proyectos', '/myprojects'],
      ['mdi-account-group', 'Configuración', '/seeting'],
    ],
  }),
  components: {
    Title,
  },
  methods: {
    logout,
  },
};
</script>
<style lang="scss" scoped>
.list {
  width: 100%;
}
</style>
