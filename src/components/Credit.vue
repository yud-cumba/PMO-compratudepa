<template>
    <div class="d-flex justify-center align-center">
        <v-card class="pa-3 my-3" style="width:50vw">
           <v-timeline dense clipped>
                <v-timeline-item v-for="item in items"  :key="item.title" color="green" small>
                    <v-card class="pa-1 d-flex" style="width: 65%">
                        <div>
                            <v-card-title >
                                {{item.title}}
                            </v-card-title>
                            <v-card-text>
                                {{item.text}}
                            </v-card-text>
                        </div>
                        <v-icon x-large color="green">
                        mdi-arrow-right-drop-circle
                        </v-icon>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card>
        <div class="ma-12">
            <h2 class="ma-12">Te acompañamos en el proceso </h2>
            <v-img src="../assets/co-workers.svg">
            </v-img>
        </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    items: [{
      title: 'PASO 1',
      text: 'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
    }, {
      title: 'PASO 2',
      text: 'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
    }, {
      title: 'PASO 3',
      text: 'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
    }, {
      title: 'PASO 4',
      text: 'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
    },
    {
      title: 'PASO 5',
      text: 'blabv lanjkhq sjkajkd ankjdanan dkj dblab lanjkhqs jkajk dankj dan andkjd',
    }],
  }),

};
</script>

<style lang="scss" scoped>

</style>
