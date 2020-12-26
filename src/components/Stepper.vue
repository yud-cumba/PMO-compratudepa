<template>
    <div class="d-flex justify-center align-center">
      <v-card class="ma-12">
        <v-stepper class="px-7" v-model="e6" vertical>
          <div v-for="(item, index) in items" :key="item.title">
            <v-stepper-step
              color="green"
              @click="goIndex(index)"
              :complete="e6 >index + 1"
              :step="`${index + 1}`"
            >
              {{ item.title }}
              <small>{{ item.text }}</small>
            </v-stepper-step>

            <v-stepper-content :step="index + 1">
              <v-card
                color="grey lighten-1"
                class="mb-12"
              >
              <iframe width="560" height="315" :src="item.youtube" frameborder="0"
              allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
              </v-card>
              <v-btn
                v-if="index+1<items.length"
                color="green"
                @click="next(index)"
              >
                Continuar
              </v-btn>
              <v-btn v-if="index>0" text @click="prev(index)">
                Anterior</v-btn
              >
            </v-stepper-content>
          </div>
        </v-stepper>
      </v-card>
      <div class="ma-12">
        <h2 class="ma-12">Te acompañamos en el proceso</h2>
        <v-img src="../assets/co-workers.svg"> </v-img>
      </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    e6: 1,
    items: [
      {
        title: 'Verificación de la legalidad del inmueble',
        text:
          'Te explicamos cómo hacerlo en el video a continuación',
        youtube: 'https://www.youtube.com/embed/62TdZtUI0ko',
      },
      {
        title: 'Contrato, minuta',
        text:
          'Te explicamos que son en el video a continuación',
        youtube: 'https://www.youtube.com/embed/dPdMRzT23Zw',
      },
      {
        title: 'Puntos importantes de un contrato',
        text:
          'Te explicamos cuales son los puntos más importantes a tener en cuenta en el video a continuación',
        youtube: 'https://www.youtube.com/embed/lntgDXETKe8',
      },
      {
        title: 'Impuestos ',
        text:
          'Te explicamos cuales son los impuestos a los que está sujeto el contrato en el video a continuación',
        youtube: 'https://www.youtube.com/embed/62TdZtUI0ko',
      },
    ],
  }),
  methods: {
    goIndex(index) {
      this.e6 = index + 1;
    },
    next(item) {
      this.e6 = item + 2;
    },
    prev(item) {
      this.e6 = item;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
