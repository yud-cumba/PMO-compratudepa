<template>
  <div @click="addStars">
    <v-rating
        v-model="rating"
        background-color="grey"
        length="5"
        color="yellow"
        :size="size"
    ></v-rating>
    <ModalToLogin :dialog="modalToLogin"/>
  </div>
</template>

<script>
import { userAddRating, getUserByUid, userRatingUpdate } from '../firebase/database';
import { verifyIsLogin, currentUser } from '../firebase/auth';
import ModalToLogin from './ModalToLogin.vue';

export default {
  props: ['projectID', 'size'],
  data: () => ({
    rating: 0,
    ratingID: false,
    isLogin: false,
    modalToLogin: false,
  }),
  components: {
    ModalToLogin,
  },
  methods: {
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            if (user.ratings) {
              Object.keys(user.ratings).forEach((ratingID) => {
                const [projectID] = Object.keys(user.ratings[ratingID]);
                if (projectID === this.projectID) {
                  [this.rating] = Object.values(user.ratings[ratingID]);
                  this.ratingID = projectID === ratingID;
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
    addStars() {
      if (this.isLogin) {
        if (this.ratingID) {
          userRatingUpdate(currentUser().uid, this.rating, this.ratingID, this.projectID);
        } else {
          userAddRating(currentUser().uid, this.rating, this.projectID)
            .then((e) => {
            // eslint-disable-next-line no-underscore-dangle
              const pieces = e.path.pieces_;
              // eslint-disable-next-line prefer-destructuring
              this.ratingID = pieces[3];
            });
        }
      } else {
        this.rating = 0;
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
