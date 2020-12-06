<template>
  <div>
    <div class="d-flex pa-7">
      <v-img src="../assets/sala.png" class="img pa-8"> </v-img>
      <div>
        <h2 class="px-5 text-capitalize">
          PROYECTO {{ project.Proyecto }} - {{ project.Distrito }}
        </h2>
        <div class="d-flex px-5">
          <Rating :projectID= "project.id"/>
        </div>
        <v-divider></v-divider>
        <h1 class="pa-5 green--text">
          S/.{{ project.Precio_min }} - S/.{{ project.Precio_max }}
        </h1>
        <p class="px-5 h6">Dirección: {{ project.Dirección }}</p>
        <p class="px-5 h6">Fase: {{ project.Fase }}</p>
        <p class="px-5 h6">Inmobiliaria: {{ project.Inmobiliaria }}</p>
        <p class="px-5 h6">
          Habitaciones: {{ project.Cuartos_max }} habitaciones
        </p>
        <p class="px-5 h6">Espacio: {{ project.Area_max }} metros cuadrados.</p>
      </div>
    </div>
    <div class="d-flex justify-center pa-3">
      <v-btn
        class="light-green accent-4 mb-3 mx-4"
        dark
        @click="asesorByWhatsApp"
      >
        <v-icon class="mr-3" right dark> mdi-whatsapp </v-icon>
        Contacta con un asesor
      </v-btn>
      <v-btn class="light-green accent-4 mb-3 mx-4" dark>
        SOLICITA UNA COTIZACIÓN
      </v-btn>
      <v-btn class="light-green accent-4 mb-3 mx-4" dark>
        <v-icon class="mr-3" right dark> mdi-domain </v-icon>
        SEPARA TU DEPA
      </v-btn>
      <v-btn
        v-if="isLogin"
        color="light-green lighten-4"
        dark
        @click="addToFavorite"
      >
        <v-icon color="green"> {{favorite? 'mdi-heart' : 'mdi-heart-outline'}} </v-icon>
      </v-btn>
      <div v-else>
        <ModalToLogin />
      </div>
      <ModalOk :dialog="modalOK" title="ESTE PROYECTO SE GUARDÓ EN TUS FAVORITOS"/>
    </div>
    <v-divider></v-divider>
    <div class="d-flex justify-center pa-3">
      <v-btn class="amber accent-2 pl-2 mr-1 py-7" @click="goOli">
        <v-img src="../assets/oli.png" height="50" class="mr-1"> </v-img>
        Con tu ayuda, apoyas a la fundación Oli
      </v-btn>
      <v-btn class="blue mb-3 mr-1 py-7" dark>
        <v-icon class="mr-3" right dark> mdi-facebook </v-icon>
        Compartir por facebook
      </v-btn>
      <v-btn class="green mb-3 py-7" dark>
        <v-icon class="mr-3" right dark> mdi-whatsapp </v-icon>
        Compartir por whatsapp
      </v-btn>
    </div>
    <div class="d-flex pa-7 justify-center">
      <div>
        <v-img src="../assets/bcp.png" max-heigth="60" class="ma-4"> </v-img>
        <v-img src="../assets/scotiabank.png" class="ma-4"> </v-img>
        <v-img src="../assets/interbank.png" class="ma-4"> </v-img>
      </div>
      <v-card style="width: 50%" class="mx-7">
        <v-card-title> Información </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          El proyecto se encuentra ubicada en una buena zona del distrito de San
          Isidro, cuenta con vistas a áreas verdes. Se encuentra en una zona
          céntrica y accesible para poder movilizarse a cualquier parte de la
          ciudad en poco tiempo.
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { inmobiliariasById } from '../utils/projectMethods';
import ModalToLogin from '../components/ModalToLogin.vue';
import ModalOk from '../components/ModalOk.vue';
import Rating from '../components/Rating.vue';
import { verifyIsLogin, currentUser } from '../firebase/auth';
import { getUserByUid, userAddFavorite, userRemoveFavoriteById } from '../firebase/database';

export default {
  data: () => ({
    project: {},
    isLogin: false,
    favorite: false,
    favoriteID: '',
    modalOK: false,
  }),
  components: {
    Rating,
    ModalToLogin,
    ModalOk,
  },
  methods: {
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            Object.keys(user.favorites).forEach((favoriteID) => {
              const favorite = user.favorites[favoriteID];
              this.favorite = !!(favorite.id === this.$route.params.id);
              this.favoriteID = this.favorite ? favoriteID : false;
            });
          });
        },
        () => {
          this.isLogin = false;
        },
      );
    },
    goOli() {
      this.$router.replace('/oli');
    },
    asesorByWhatsApp() {
      const yourMessage = 'Hola, te escribimos desde COMPRATUDEPA, puedes conversar con nuestro asesor y él responderá tus dudas';
      const celular = '918604749';
      const message = yourMessage.split(' ').join('%20');
      window.location.href = `https://api.whatsapp.com/send/?phone=%2B51${celular}&text=%20${message}`;
    },
    addToFavorite() {
      if (this.favorite) {
        userRemoveFavoriteById(currentUser().uid, this.favoriteID);
        this.favorite = false;
      } else {
        userAddFavorite(currentUser().uid, this.project)
          .then((e) => {
          // eslint-disable-next-line no-underscore-dangle
            const pieces = e.path.pieces_;
            // eslint-disable-next-line prefer-destructuring
            this.favoriteID = pieces[3];
            this.favorite = true;
            this.modalOK = true;
          });
      }
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    this.project = inmobiliariasById(this.$route.params.id);
    this.verify();
  },
};
</script>

<style lang="scss" scoped>
.img {
  width: 55%;
  height: 400px;
}
</style>
