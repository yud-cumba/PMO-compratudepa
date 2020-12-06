<template>
  <div class="text-center">
    <h1 class="mt-10">¿Necesitas un crédito?</h1>
    <div class="d-flex justify-center align-center">
      <v-card class="ma-12">
        <v-stepper class="px-7" v-model="e6" vertical>
          <div v-for="(item, index) in items" :key="item.title">
          <v-stepper-step :complete="`e6 >${index+1}`" :step="`${index+1}`">
            {{item.title}}
            <small>{{item.text}}</small>
          </v-stepper-step>

          <v-stepper-content :step="index+1">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="next(item)"> Continuar </v-btn>
            <v-btn text> Cancelar </v-btn>
          </v-stepper-content>
          </div>
          <!-- <v-stepper-step :complete="e6 > 2" step="2">
            Configure analytics for this app
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            Select an ad format and name ad unit
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step step="4"> View setup instructions </v-stepper-step>
          <v-stepper-content step="4">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content> -->
        </v-stepper>
      </v-card>
      <div class="ma-12">
        <h2 class="ma-12">Te acompañamos en el proceso</h2>
        <v-img src="../assets/co-workers.svg"> </v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    e6: 1,
    items: [
      {
        title: 'PASO 1',
        text:
          'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
      },
      {
        title: 'PASO 2',
        text:
          'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
      },
      {
        title: 'PASO 3',
        text:
          'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
      },
      {
        title: 'PASO 4',
        text:
          'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
      },
      {
        title: 'PASO 5',
        text:
          'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
      },
    ],
  }),
  methods: {
    next(item) {
      this.e6 = item + 2;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
