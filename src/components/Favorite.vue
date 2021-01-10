<template>
  <div>
      <v-btn color="light-green lighten-4" dark @click="addToFavorite">
        <v-icon color="green">
          {{ favorite ? "mdi-heart" : "mdi-heart-outline" }}
        </v-icon>
      </v-btn>
      <ModalToLogin :dialog="modalToLogin" :setModalToLogin="setModalToLogin"/>
      <ModalOk :dialog="modalOk" title="ESTE PROYECTO SE GUARDÓ EN TUS FAVORITOS"/>
  </div>
</template>

<script>
import {
  userAddFavorite,
  userRemoveFavoriteById,
  getUserByUid,
} from '../firebase/database';
import { currentUser, verifyIsLogin } from '../firebase/auth';
import ModalToLogin from './ModalToLogin.vue';
import ModalOk from './ModalOk.vue';

export default {
  components: {
    ModalToLogin,
    ModalOk,
  },
  props: ['project', 'setModal'],
  data: () => ({
    isLogin: false,
    favorite: false,
    favoriteID: '',
    modalOk: false,
    modalToLogin: false,
  }),
  methods: {
    setModalToLogin(dialog) {
      this.modalToLogin = dialog;
    },
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            if (user.favorites) {
              Object.keys(user.favorites).forEach((favoriteID) => {
                const favorite = user.favorites[favoriteID];
                if (favorite.id === this.project.id) {
                  this.favorite = true;
                  this.favoriteID = favoriteID;
                }
              });
            }
          });
        },
        () => {
          this.isLogin = false;
        },
      );
    },
    addToFavorite() {
      if (this.isLogin) {
        if (this.favorite) {
          userRemoveFavoriteById(currentUser().uid, this.favoriteID);
          this.favorite = false;
        } else {
          userAddFavorite(currentUser().uid, this.project).then((e) => {
          // eslint-disable-next-line no-underscore-dangle
            const pieces = e.path.pieces_;
            // eslint-disable-next-line prefer-destructuring
            this.favoriteID = pieces[3];
            this.favorite = true;
            this.modalOk = true;
          });
        }
      } else {
        this.modalToLogin = true;
      }
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>
</style>
