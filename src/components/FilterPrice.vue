<template>
<div class="card px-3 mt-2 ml-1">
  <v-card
    min-width="400"
    color="transparent"
    outlined
  >
   <div class="mx-0 px-0 d-flex justify-space-between">
  <p class="pt-1" >Rango de precio </p>
   <v-switch
    v-model="type"
    label="En dólares $"
    color="green"
    hide-details
  ></v-switch>
  </div>
    <v-range-slider
    v-model="price"
    :max="initialRange[1]"
    :min="initialRange[0]"
    hide-details
    track-color="grey"
    color="green"
    class="align-center"
    >
    <template v-slot:prepend>
        <div>
        <p class="text-caption ma-0">mínimo</p>
        <div class="d-flex">
        <p class="mt-2">{{type? '$' : 'S/.'}}</p>
        <v-text-field
        :value="price[0]"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        color="green"
        style="width: 80px"
        @change="$set(price, 0, $event)"
        ></v-text-field>
        </div>
        </div>
    </template>
    <template v-slot:append>
        <div>
        <p class="text-caption ma-0">máximo</p>
        <div class="d-flex">
        <p class="mt-2">{{type? '$' : 'S/.'}}</p>
        <v-text-field
        :value="price[1]"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        style="width: 80px"
        color="green"
        @change="$set(price, 1, $event)"
        ></v-text-field>
        </div>
        </div>
    </template>
    </v-range-slider>
  </v-card>
</div>
</template>

<script>
import { getMinPrice, getMaxPrice } from '../utils/prices';
import inm from '../data/inmobiliarias.json';

export default {
  props: ['setPrice', 'setType', 'priceInitial'],
  data() {
    const inmobiliarias = inm.features.map((doc) => ({ id: doc.id, ...doc.properties }));
    const min = getMinPrice(inmobiliarias);
    const max = getMaxPrice(inmobiliarias);
    return {
      type: false,
      initialRange: [min, max],
      price: [],
    };
  },
  watch: {
    type() {
      this.setType(this.type);
    },
    price() {
      this.setPrice({ min: this.price[0], max: this.price[1] });
    },
  },
  created() {
    this.price = this.priceInitial;
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
