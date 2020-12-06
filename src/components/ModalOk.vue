<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-actions class="d-flex justify-end">
          <v-icon large @click="dialog = false" color="green" class="mx-5">
            mdi-window-close
          </v-icon>
        </v-card-actions>
        <h2 class="d-flex flex-column align-center pa-10 text-center">
          {{ title }}
          <v-icon color="green" x-large class="my-6"
            >mdi-checkbox-marked-circle
          </v-icon>
        </h2>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialog', 'title'],
};
</script>

<style lang="scss" scoped>
</style>
