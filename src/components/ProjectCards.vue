<template>
    <div class="d-flex pb-10 flex-wrap sellest">
        <div class="flip-card mx-auto my-4 " v-for="item in projects" :key="item.id">
        <div class="flip-card-inner rounded-lg">
            <v-card class="flip-card-front rounded-lg">
                <h3 class="title d-flex justify-center align-center">
                        {{item.Proyecto}}
                </h3>
                <img src="../assets/main.png" class="img"/>
                <div class="pa-3 d-flex">
                    <div class="text-caption">
                        <div class="d-flex justify-start">
                            <img src="../assets/map-marker.png" class="mr-1 icon"/>
                            {{item.Dirección}}
                        </div>
                        <div class="d-flex justify-start" >
                            <img src="../assets/bed-empty.png" class="mr-1 icon"/>
                        {{`${item.Cuartos_max} habitaciones`}}</div>
                    </div>
                    <button class="btn green pa-1">
                        Ver más
                    </button>
                </div>
            </v-card>
            <v-card class="flip-card-back rounded-lg">
                <h3 class="title d-flex justify-center align-center green">
                        {{item.Proyecto}}
                </h3>
                <v-card-text class="d-flex flex-column">
                    <div class="d-flex">Información:
                        <v-spacer></v-spacer>
                        <button class="btn green pa-1 my-1">
                        Ver más
                        </button>
                    </div>
                    <div class="information d-flex justify-start">
                        <v-icon class="mr-1">mdi-map-marker</v-icon>
                        {{item.Dirección}}
                    </div >
                    <div class="information  d-flex justify-start">
                        <v-icon class="mr-1">mdi-bed-empty</v-icon>
                    {{`${item.Cuartos_max} habitaciones`}}</div>
                    <div class="information d-flex justify-start">
                        <v-icon class="mr-1">mdi-arrow-collapse</v-icon>
                        {{item.Áreas}}
                    </div >
                    <div class="information d-flex justify-start">
                        <v-icon class="mr-1">mdi-account-hard-hat</v-icon>
                        {{`Fase :${item.Fase}`}}
                    </div >
                    <div class="information d-flex justify-start">
                        <v-icon class="mr-1">mdi-domain</v-icon>
                        {{`Inmobiliaria ${item.Inmobiliaria}`}}
                    </div >
                </v-card-text>
            </v-card>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['projects'],
//   data: () => ({
//     cards: [],
//   }),
//   watch: {
//     projects() {
//       this.cards = this.projects;
//     },
//   },
};
</script>

<style lang="scss" scoped>
.information{
    width: 100%;
    font-size: 11px;
}
.title{
    padding: 3px;
    width: 100%;
    height: 70px;
}
.img{
    width: 100%;
    height: 120px;
}
.text-caption{
    text-align: start;
    margin-left:4px;
    margin-right: 4px;
    width: 202px;
}
.btn{
    width: 60px;
    font-size: 12px;
    border-radius: 10px;
    height: 30px;
}
.icon{
    height: 20px;
    width: 20px;
}
.flip-card {
  background-color: transparent;
  width: 260px;
  height: 290px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
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
