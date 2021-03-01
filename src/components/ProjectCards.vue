<template>
  <div class="d-flex pb-10 flex-wrap sellest">
    <Loading :loading="loading" :size="14"/>
    <div  class="flip-card mx-auto my-4" v-for="item in projects" :key="item.id">
      <div class="flip-card-inner rounded-lg">
        <v-card class="flip-card-front rounded-lg">
          <div class="title d-flex justify-space-between align-center px-4">
            <h4>{{item.name }}</h4>
            <Favorite :project="item" :setModal="setModal"/>
          </div>
          <img :src="item.imagenes[0]" class="img" />
          <div class="pa-3 d-flex">
            <div class="text-caption">
              <div class="d-flex justify-start">
                <img src="../assets/map-marker.png" class="mr-1 icon" />
                {{ item.direccion }}
              </div>
              <div class="d-flex justify-start">
                <img src="../assets/bed-empty.png" class="mr-1 icon" />
                {{ `${item.room_max} habitaciones` }}
              </div>
              <Rating :projectID ="item.id" size="15"/>
            </div>
          </div>
        </v-card>
        <v-card class="flip-card-back rounded-lg">
          <div class="title d-flex justify-end align-center green px-3">
            <h4 style="width: 75%">{{ item.name }}</h4>
            <Options :projectID="item.id"/>
          </div>
          <v-card-text class="d-flex flex-column">
            <div class="d-flex">
              Información:
              <v-spacer></v-spacer>
              <button class="btn green pa-1 my-1" @click="showMore(item)">
                Ver más
              </button>
            </div>
            <div class="information d-flex justify-start">
              <v-icon class="mr-1">mdi-map-marker</v-icon>
              {{ item.direccion }}
            </div>
            <div class="information d-flex justify-start">
              <v-icon class="mr-1">mdi-bed-empty</v-icon>
              {{ `${item.room_max} habitaciones` }}
            </div>
            <div class="information d-flex justify-start">
              <v-icon class="mr-1">mdi-arrow-collapse</v-icon>
              Desde {{ item.area_min }} m2, hasta {{ item.area_max }} m2
            </div>
            <div class="information d-flex justify-start">
              <v-icon class="mr-1">mdi-account-hard-hat</v-icon>
              {{ `Fase :${item.project_phase}` }}
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Favorite from './Favorite.vue';
import Loading from './Loading.vue';
import Options from './Options.vue';
import Rating from './Rating.vue';

export default {
  components: {
    Rating, Favorite, Options, Loading,
  },
  props: ['projects', 'loading'],
  methods: {
    setModal(ok) {
      this.modalOK = ok;
    },
    showMore(item) {
      this.$gtag.event(item.builder_name, {
        event_category: 'Proyectos',
        event_label: `${item.builder_name} clicked to see details`,
        value: 1,
      });
      this.$router.push({ path: `/detail/${item.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.information {
  width: 100%;
  font-size: 11px;
}
.title {
  padding: 3px;
  width: 100%;
  height: 70px;
}
.img {
  width: 100%;
  height: 120px;
}
.text-caption {
  text-align: start;
  margin-left: 4px;
  margin-right: 4px;
  width: 202px;
}
.btn {
  width: 60px;
  font-size: 12px;
  border-radius: 10px;
  height: 30px;
}
.icon {
  height: 20px;
  width: 20px;
}
.flip-card {
  background-color: transparent;
  width: 260px;
  height: 310px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>
