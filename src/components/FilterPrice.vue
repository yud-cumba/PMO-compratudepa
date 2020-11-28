<template>
<div class="card pa-3 mt-2 ml-1">
  <v-card
    min-width="300"
    color="transparent"
    outlined
  >
   <p class="ma-0">Precio:</p>
    <v-range-slider
    v-model="range"
    :max="max"
    :min="min"
    hide-details
    track-color="grey"
    color="green"
    class="align-center"
    >
    <template v-slot:prepend>
        <div>
        <p class="text-caption ma-0">mínimo</p>
        <v-text-field
        :value="range[0]"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        color="green"
        style="width: 60px"
        @change="$set(range, 0, $event)"
        ></v-text-field>
        </div>
    </template>
    <template v-slot:append>
        <div>
        <p class="text-caption ma-0">máximo</p>
        <v-text-field
        :value="range[1]"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        style="width: 60px"
        color="green"
        @change="$set(range, 1, $event)"
        ></v-text-field>
        </div>
    </template>
    </v-range-slider>
  </v-card>
</div>
</template>

<script>
export default {
  props: ['setPrice'],
  data() {
    return {
      min: 2000,
      max: 20000,
      range: [2000, 20000],
    };
  },
  watch: {
    range() {
      this.setPrice({ min: this.range[0], max: this.range[1] });
    },
  },
};
</script>

<style lang="scss" scoped>
.card{
    height: 110px;
    border:0.5px solid gray;
    border-radius: 5px;
}
</style>
