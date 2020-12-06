<template>
    <v-rating
        v-model="rating"
        background-color="grey"
        color="yellow"
        large
    ></v-rating>
</template>

<script>
import { userAddRating, getUserByUid, userRatingUpdate } from '../firebase/database';
import { verifyIsLogin, currentUser } from '../firebase/auth';

export default {
  props: ['projectID'],
  data: () => ({
    rating: 0,
    ratingID: false,
  }),
  watch: {
    rating() {
      this.addStars();
    },
  },
  methods: {
    verify() {
      verifyIsLogin(
        () => {
          getUserByUid(currentUser().uid).then((user) => {
            if (user.ratings) {
              Object.keys(user.ratings).forEach((ratingID) => {
                const [projectID] = Object.keys(user.ratings[ratingID]);
                const [rating] = Object.values(user.ratings[ratingID]);
                this.rating = projectID === this.projectID ? rating : 0;
                this.ratingID = projectID === this.projectID ? ratingID : false;
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
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>

</style>
