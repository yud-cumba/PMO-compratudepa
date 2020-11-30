<template>
    <div class="text-center">
        <h1 class="mt-10">¿Necesitas un crédito?</h1>
        <div class="d-flex justify-center align-center">
            <v-card class="ma-12">
                 <v-stepper
                    class="px-7"
                    v-model="e6"
                    vertical
                >
                    <v-stepper-step
                    :complete="e6 > 1"
                    step="1"
                    >
                    Select an app
                    <small>Summarize if needed</small>
                    </v-stepper-step>

                    <v-stepper-content step="1">
                    <v-card
                        color="grey lighten-1"
                        class="mb-12"
                        height="200px"
                    ></v-card>
                    <v-btn
                        color="primary"
                        @click="e6 = 2"
                    >
                        Continue
                    </v-btn>
                    <v-btn text>
                        Cancel
                    </v-btn>
                    </v-stepper-content>

                    <v-stepper-step
                    :complete="e6 > 2"
                    step="2"
                    >
                    Configure analytics for this app
                    </v-stepper-step>

                    <v-stepper-content step="2">
                    <v-card
                        color="grey lighten-1"
                        class="mb-12"
                        height="200px"
                    ></v-card>
                    <v-btn
                        color="primary"
                        @click="e6 = 3"
                    >
                        Continue
                    </v-btn>
                    <v-btn text>
                        Cancel
                    </v-btn>
                    </v-stepper-content>

                    <v-stepper-step
                    :complete="e6 > 3"
                    step="3"
                    >
                    Select an ad format and name ad unit
                    </v-stepper-step>

                    <v-stepper-content step="3">
                    <v-card
                        color="grey lighten-1"
                        class="mb-12"
                        height="200px"
                    ></v-card>
                    <v-btn
                        color="primary"
                        @click="e6 = 4"
                    >
                        Continue
                    </v-btn>
                    <v-btn text>
                        Cancel
                    </v-btn>
                    </v-stepper-content>

                    <v-stepper-step step="4">
                    View setup instructions
                    </v-stepper-step>
                    <v-stepper-content step="4">
                    <v-card
                        color="grey lighten-1"
                        class="mb-12"
                        height="200px"
                    ></v-card>
                    <v-btn
                        color="primary"
                        @click="e6 = 1"
                    >
                        Continue
                    </v-btn>
                    <v-btn text>
                        Cancel
                    </v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-card>
            <div class="ma-12">
                <h2 class="ma-12">Te acompañamos en el proceso </h2>
                <v-img src="../assets/co-workers.svg">
                </v-img>
             </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      e6: 1,
    };
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
  },
};
</script>

<style lang="scss" scoped>

</style>
