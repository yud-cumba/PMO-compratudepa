<template>
    <div class="d-flex flex-column px-12 mx-8 mb-2 sellest">
        <h1 class="px-6 mb-5">{{title}}</h1>
        <v-card class="card">
            <v-card-title>
                proyecto
            </v-card-title>
            <v-img src="../assets/main.png">
            </v-img>
                <v-card-actions class="pa-3">
                    bla bla
                    <v-spacer></v-spacer>
                    <v-btn class="green">
                        Ver más
                    </v-btn>
                </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style lang="scss" scoped>
.card{
    width: 250px;
    height: 300px;
}
</style>
