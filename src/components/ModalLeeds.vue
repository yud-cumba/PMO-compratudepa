<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card >
        <v-card-title class="headline green lighten-2">
           <h3>SOLICITA UNA COTIZACIÓN</h3>
           <v-spacer></v-spacer>
          <v-icon large @click="dialog = false" color="black" class="mx-5">
            mdi-window-close
          </v-icon>
        </v-card-title>
        <div class="pa-5">
        <v-text-field
          v-model="userData.email"
          filled
          rounded
          color="green"
          dense
          required
          label="Ingrese correo electrónico"
        >
        </v-text-field>
        <v-text-field
          v-model="userData.name"
          filled
          rounded
          color="green"
          dense
          required
          label="Nombre del solicitante"
        >
        </v-text-field>
        <v-text-field
          v-model="userData.dni"
          filled
          rounded
          color="green"
          dense
          required
          label="Ingrese DNI del solicitante"
        >
        </v-text-field>
        <v-text-field
          v-model="userData.cel"
          filled
          rounded
          color="green"
          dense
          required
          label="Celular del solicitante"
        >
        </v-text-field>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            :disabled = " !userData.name || !userData.dni || !userData.cel || !userData.email"
            @click="sendLeads"
          >
            Enviar datos
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import date from '../mixins/date';
import { verifyIsLogin, currentUser } from '../firebase/auth';
import { getUserByUid, addLeads } from '../firebase/database';

export default {
  props: ['projectId', 'dialog'],
  data: () => ({
    userData: {
      name: '',
      dni: '',
      cel: '',
      email: '',
    },
    isLogin: false,
  }),
  mixins: [date],
  created() {
    this.verify();
  },
  methods: {
    verify() {
      verifyIsLogin(
        () => {
          this.isLogin = true;
          getUserByUid(currentUser().uid).then((user) => {
            this.userData.name = user.name;
            this.userData.email = user.email;
          });
        },
        () => {
          this.isLogin = false;
        },
      );
    },
    sendLeads() {
      const today = this.dateFormat(new Date());
      console.log(this.userData, this.projectId, today);
      addLeads(this.userData, this.projectId, today);
      this.dialog = false;
    },
  },
};
</script>
