<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="light-green lighten-4" dark v-bind="attrs" v-on="on">
          <v-icon color="green"> mdi-heart-outline </v-icon>
        </v-btn>
      </template>
      <v-card class="pa-6">
        <v-card-actions class="d-flex justify-end">
          <v-icon large @click="dialog = false" color="green">
            mdi-window-close</v-icon
          >
        </v-card-actions>
        <h2 class="d-flex flex-column align-center text-center">
          Iniciar sesión para realizar esta acción y acceder a otros beneficios.
        </h2>
        <v-card-actions class="d-flex flex-column align-center my-6">
          <v-btn color="green my-5" class="mx-2" @click="$router.replace('/login')">
            Inicia seción
          </v-btn>
          <v-btn
            color="green"
            outlined
            class="mx-2 my-5"
            @click="$router.replace('/advices')"
          >
            Conoce aquí los beneficios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>

<style lang="scss" scoped>
</style>
