<template>
    <v-row class="d-flex justify-center align-center my-5">
        <v-col>
            <v-card class="pa-5 elevation-5">
        <v-timeline dense >
    <v-timeline-item  color="green" v-for="item in items" :key="item.title" right>
        <h3>{{item.title}}</h3>
        {{item.text}}
    </v-timeline-item>
    </v-timeline>
      </v-card>
        </v-col >
        <v-col class="pa-5 d-flex flex-column justify-center align-center">
            <h2 class="ma-12">{{describe}}</h2>
        <v-img :src="require(`../assets/${img}`)" max-width="450"></v-img>
        </v-col>
    </v-row>
</template>

<script>
export default {
  props: ['describe', 'img', 'items'],
};
</script>

<style lang="scss" scoped>

</style>
