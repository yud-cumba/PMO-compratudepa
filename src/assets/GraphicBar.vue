<template>
    <v-card  class="pa-5" v-if="show" >
        <p class="titulo">Aquí comparamos los precios </p>
        <v-list>
            <v-list-item v-for="cdata in chartdata.datasets" :key="cdata.label">
                <v-list-item-title>
                    {{cdata.label}}
                </v-list-item-title>
            </v-list-item>
        </v-list>
      <Bar :chartdata="chartdata"/>
    </v-card>
</template>

<script>
import Bar from '../graphics/Bar.vue';

export default {
  components: { Bar },
  props: ['chartdata', 'show'],
};
</script>

<style lang="scss" scoped>

</style>
