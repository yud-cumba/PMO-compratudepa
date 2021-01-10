<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-6">
        <v-card-actions class="d-flex justify-end">
          <v-icon large @click="closeModal" color="green">
            mdi-window-close</v-icon
          >
        </v-card-actions>
        <h2 class="d-flex flex-column align-center text-center">
          Iniciar sesión para realizar esta acción y acceder a otros beneficios.
        </h2>
        <v-card-actions class="d-flex flex-column align-center my-6">
          <v-btn color="green my-5" class="mx-2" @click="$router.push('/login')">
            Inicia seción
          </v-btn>
          <v-btn
            color="green"
            outlined
            class="mx-2 my-5"
            @click="$router.push('/advices')"
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
  props: ['dialog', 'setModalToLogin'],
  methods: {
    closeModal() {
      this.dialog = false;
      this.setModalToLogin(this.dialog);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
