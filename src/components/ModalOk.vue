<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card >
         <v-card-actions class="d-flex justify-end">
           <v-btn fab small dark @click="dialogInvitation=false" color="teal" class="mx-5">
             <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-actions>
        <h2 class="d-flex flex-column align-center pa-10 text-center">
            Datos enviados correctamente
            <v-icon color="green" x-large class="my-6"
            >mdi-checkbox-marked-circle
            </v-icon>
        </h2>
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
