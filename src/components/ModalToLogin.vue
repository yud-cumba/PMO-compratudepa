<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            @click="goLogin"
          >
          Cerrar
          </v-btn>
        </v-card-actions>
        <h2 class="d-flex flex-column align-center pa-10 text-center">
            Iniciar sesión para realizar esta acción y acceder a otros beneficios.
        </h2>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialog'],
  methods: {
    goLogin() {
      this.dialog = true;
      this.$router.replace('/login');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
