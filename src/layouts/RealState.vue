<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
    >
      <v-list dense nav>
        <v-list-item-group>
          <v-list-item class="mx-0 px-0">
            <v-img
              src="../assets/logoPMO.png"
              max-height="80"
              max-width="180"
              class="mx-0 px-0 my-5"
              @click="$router.push('/')"
            >
            </v-img>
            <v-btn icon  @click.stop="mini = !mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="([icon, view, rout], i) in views"
            :key="i"
            link
          >
            <v-icon class="mr-2">
              {{ icon }}
            </v-icon>
            <v-list-item-content>
              <v-list-item-title
                @click="$router.push(rout), mini=true"
                class="text-router"
              >
                <strong class="text-md-body-1" color="black">{{ view }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-btn color="#747474" text dark @click="logOut" class="my-2">
          <v-icon size="30" class="mx-2"> mdi-power-standby</v-icon>
          <span class="text-router">Cerrar Sesión</span>
        </v-btn>
      </template>
    </v-navigation-drawer>
    <v-content style="background-color: white">
      <Title />
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
      ['mdi-home', 'Vista principal', '/'],
      ['mdi-form-select', 'Mis proyectos', '/myprojects'],
    ],
  }),
  components: {
    Title,
  },
  methods: {
    logOut() {
      logout().then(this.$router.push('/'));
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  width: 100%;
}
</style>
