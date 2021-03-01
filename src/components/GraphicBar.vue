<template>
    <v-card  class="pa-5 d-flex" >
      <Bar :chartdata="chartdata"/>
       <div class="pa-4 d-flex flex-column justify-center align-center">
        <p class="titulo">Aquí comparamos los precios por m2</p>
        <v-list>
            <v-list-item v-for="cdata in chartdata.datasets" :key="cdata.label">
                <v-list-item-title>
                    {{cdata.label}}
                </v-list-item-title>
            </v-list-item>
        </v-list>
        </div>
    </v-card>
</template>

<script>
import Bar from '../graphics/Bar.vue';

export default {
  components: { Bar },
  props: ['chartdata'],
};
</script>

<style lang="scss" scoped>

</style>
