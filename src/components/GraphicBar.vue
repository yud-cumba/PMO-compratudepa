<template>
    <v-card  class="pa-5" >
        <p class="titulo">Aquí comparamos los precios por m2</p>
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
  props: ['chartdata'],
};
</script>

<style lang="scss" scoped>

</style>
