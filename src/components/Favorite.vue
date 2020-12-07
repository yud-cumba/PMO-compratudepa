<template>
  <v-btn
    color="light-green lighten-4"
    dark
    @click="addToFavorite"
  >
    <v-icon color="green">
      {{ favorite ? "mdi-heart" : "mdi-heart-outline" }}
    </v-icon>
  </v-btn>
</template>

<script>
import { userAddFavorite, userRemoveFavoriteById, getUserByUid } from '../firebase/database';
import { currentUser } from '../firebase/auth';

export default {
  props: ['project', 'setModal'],
  data: () => ({
    favorite: false,
    favoriteID: '',
  }),
  methods: {
    verify() {
      alert(currentUser());
      getUserByUid(currentUser().uid).then((user) => {
        Object.keys(user.favorites).forEach((favoriteID) => {
          const favorite = user.favorites[favoriteID];
          if (favorite.id === this.project.id) {
            this.favorite = true;
            this.favoriteID = favoriteID;
          }
        });
      });
    },
    addToFavorite() {
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
          this.setModal(true);
        });
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
