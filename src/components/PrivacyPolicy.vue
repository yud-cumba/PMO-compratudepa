<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <p class="pt-1 blue--text text-decoration-underline"
          v-bind="attrs"
          v-on="on"
        >
          términos y condiciones
        </p>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet,
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeModal"
          >
            Acepto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['acceptConditions'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.acceptConditions(true);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
