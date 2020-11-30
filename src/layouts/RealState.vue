<template>
    <div>
       <v-navigation-drawer v-model="drawer" app
      :mini-variant.sync="mini" permanent>
        <v-list class="d-flex flex-column align-start " dense
          nav>
          <v-list-item class="my-12 mx-0">
            <v-img src="../assets/logoPMO.png"
               max-height="80" max-width="200">
            </v-img>
            <v-btn
              icon class="mx-1"
              @click.stop="mini = !mini"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-list-item class="my-1 text-start list my-3 pa-2"
            v-for="([icon, view], i) in views"
            :key="i"
            link
            width="100"
            >
            <v-btn
              class="mx-3"
              fab
              dark
              small
              color="green"
            >
              <v-icon dark>
                {{ icon }}
              </v-icon>
            </v-btn>
              <v-list-item-content>
                <v-list-item-title @click="$router.push(`/${view}`)" class="text-router">
                  <strong class="text-md-body-1" color="black">{{ view }}</strong>
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
        <div class="pa-2">
        </div>
      </template>
      </v-navigation-drawer>
      <v-content style="background-color:white">
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col>
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
    </v-content>
    </div>
</template>

<script>

export default {
  data: () => ({
    drawer: true,
    mini: false,
    views: [
      ['mdi-home', 'Inicio'],
      ['mdi-form-select', 'Mis proyectos'],
      ['mdi-account-group', 'Configuración'],
    ],
  }),
//   components: {
//     Logout,
//   },
};
</script>

<style lang="scss" scoped>
.list{
  width: 100%;
}
</style>
