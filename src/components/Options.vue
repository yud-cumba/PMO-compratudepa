<template>
  <div class="text-center">
    <v-menu v-if="isLogin && show" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs"
          v-on="on">
            mdi-dots-vertical
        </v-icon>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item @click="deleteProject">{{ item}}</v-list-item>
        </v-list-item>
      </v-list>
    </v-menu>
    <ModalOk :dialog="deleteOk" title="Proyecto eliminado con éxito"/>
  </div>
</template>

<script>
import {
  getUserByUid,
  projectDelete,
} from '../firebase/database';
import { currentUser, verifyIsLogin } from '../firebase/auth';
import ModalOk from './ModalOk.vue';

export default {
  components: { ModalOk },
  props: ['projectID'],
  data: () => ({
    isLogin: false,
    show: false,
    items: ['Eliminar',
    ],
    userId: '',
    deleteOk: false,
  }),
  methods: {
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            this.userId = currentUser().uid;
            if (user.projects) {
              const myProjectIds = Object.values(user.projects);
              this.show = myProjectIds.includes(this.projectID);
            }
          });
        },
        () => {
          this.isLogin = false;
        },
      );
    },
    deleteProject() {
      projectDelete(this.userId, this.projectID)
        .then(() => {
          this.deleteOk = true;
        });
    },
  },
  created() {
    this.verify();
  },
};
</script>

<style lang="scss" scoped>

</style>
