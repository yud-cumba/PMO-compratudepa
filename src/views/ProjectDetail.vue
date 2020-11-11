<template>
    <div>
        <v-parallax src="../assets/sala.png">
        <h1 class="mx-12 ">PROYECTO {{project.Proyecto}}</h1>
            <v-btn class="ma-12 green" width="165">Agenda una cita</v-btn>
        </v-parallax>
        <div>
            <h2 class="mx-12 px-12 mt-10 text-capitalize">PROYECTO {{project.Proyecto}}</h2>
            <h2 class="mx-12 px-12">{{project.Distrito}}</h2>
            <v-row class="ma-12 px-10">
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Dirección}}
                    </v-card>
                </v-col>
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Fase}}
                    </v-card>
                </v-col>
                <v-col class="mx-6" >
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Area_max}}
                    </v-card>
                </v-col>
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Inmobiliaria}}
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="ma-12 px-10">
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Cuartos_max}} habitaciones
                    </v-card>
                </v-col>
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>
                        Precio: s/.{{project.Precio_min}}-s/.{{project.Precio_max}}
                    </v-card>
                </v-col>
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Cantidad}}
                    </v-card>
                </v-col>
                <v-col class="mx-6">
                    <v-card class="pa-4" width="225" height="75">
                        <v-icon>mdi-map-marker</v-icon>{{project.Precio_por_m2_oferta}}
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { inmobiliariasById } from '../utils/projectMethods';

export default {
  data: () => ({
    project: {},
  }),
  created() {
    this.project = inmobiliariasById(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>

</style>
