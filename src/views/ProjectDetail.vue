<template>
    <div>
        <div class="d-flex pa-7">
            <v-img src="../assets/sala.png" class="img pa-8">
            </v-img>
            <div>
                <h2 class=" px-5 text-capitalize">
                    PROYECTO {{project.Proyecto}} - {{project.Distrito}}
                </h2>
                <div class="d-flex px-5">
                    <v-rating
                    v-model="rating"
                    background-color="grey"
                    color="yellow"
                    large
                    ></v-rating>
                    <p class="pa-3">0 comentarios</p>
                    <p class="pa-3 green--text">Escribe un comentario</p>
                </div>
                <v-divider></v-divider>
                <h1 class=" pa-5 green--text ">
                    S/.{{project.Precio_min}} - S/.{{project.Precio_max}}
                </h1>
                <p class=" px-5 h6">Dirección:  {{project.Dirección}}</p>
                <p class=" px-5 h6">
                    Fase: {{project.Fase}}
                </p>
                <p class=" px-5 h6">
                    Inmobiliaria: {{project.Inmobiliaria}}
                </p>
                <p class=" px-5 h6">
                    Habitaciones: {{project.Cuartos_max}} habitaciones
                </p>
                <p class=" px-5 h6">
                    Espacio: {{project.Area_max}} metros cuadrados.
                </p>
            </div>
        </div>
        <div class="d-flex justify-center">
            <v-btn class="green ma-7" dark>
                Contacta con un asesor
            </v-btn>
            <v-btn class="green ma-7" dark>
                SOLICITA UNA COTIZACIÓN
            </v-btn>
            <v-btn class="green ma-7" dark>
                SEPARA TU DEPA
            </v-btn>
        </div>
    </div>
</template>

<script>
import { inmobiliariasById } from '../utils/projectMethods';

export default {
  data: () => ({
    rating: '',
    project: {},
  }),
  created() {
    this.project = inmobiliariasById(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.img{
    width: 55%;
    height: 400px;
}
</style>
