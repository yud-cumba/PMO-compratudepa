<template>
<div class="pa-5">
<v-row >
  <v-col class="pa-5">
    <v-form>
    <h2 >¡Ingresa para tener acceso a las asesorías!</h2>
    <p >
        Ingresa en nuestra plataforma con tan sólo tu correo y contraseña.
    </p>
    <h4>Correo electrónico</h4>
    <v-text-field
      color="green"
      v-model="email"
      :rules="emailRules"
      required
      label="Ingresa tu correo electrónico."
      outlined  dense
    ></v-text-field>
    <h4 >Contraseña</h4>
    <v-text-field
      color="green"
      v-model="password"
      label="Ingresa tu contraseña"
      outlined  dense
      :type="show? 'text' : 'password'"
      :rules="passwordRules"
      required
      :append-icon="show?'mdi-eye':'mdi-eye-off'"
      @click:append="show= !show"
    ></v-text-field>
    <div class="d-flex flex-column align-center">
    <v-btn
      v-if="email && password"
      class="mr-4 green"
      @click="login"
    >
      Ingresar
    </v-btn>
     <v-btn
      v-else
      disabled
      class="mr-4 green"
    >
      Ingresar
    </v-btn>
    <a class="pt-4" @click="recover">¿Olvidaste tu contraseña? </a>
    <div v-if="error">{{error}}</div>
     <ModalOk :dialog="forgotPass"
    title="Se envió un correo de recuperación de contraseña"/>
    <!-- <p class="my-3" @click="rememberPassword">¿Olvidaste tu contraseña?</p> -->
    - o -
    <p class="pt-4">Inicia sesión con</p>
    <v-icon class="pb-4" @click="logInByGoogle" color="green">mdi-google</v-icon>
    ¿No te registraste? <router-link to="/signup"  class="pb-4"> Hazlo aquí</router-link>
    ¿Eres una inmobiliaria y quieres publicar?
    <router-link to="/signupInmb"> Regístrate aquí</router-link>
    </div>
  </v-form>
  </v-col>
  <v-col  v-if="!$vuetify.breakpoint.smAndDown" cols="8">
     <v-parallax src="../assets/login.png">
  </v-parallax>
  </v-col>
  </v-row></div>
</template>

<script>
import ModalOk from '../components/ModalOk.vue';
import {
  logIn, logInGoogle, recoverPassword, currentUser,
} from '../firebase/auth';
import { userFirstTime, getUserByUid } from '../firebase/database';

export default {
  components: { ModalOk },
  data: () => ({
    forgotPass: false,
    areInmobiliaria: false,
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Nombre es requerido',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail es requerido',
      (v) => /.+@.+\..+/.test(v) || 'E-mail debe ser válido',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Contraseña es requerida',
      (v) => (v && v.length > 8) || 'Minino 8 carácteres',
    ],
    show: false,
    description: '',
    checkbox: false,
    error: false,
  }),

  methods: {
    recover() {
      recoverPassword(this.email)
        .then(() => {
          this.error = '';
          this.forgotPass = true;
        })
        .catch(() => { this.error = 'Para cambiar contraseña escribe tu correo en la sección "Correo electrónico"'; });
    },
    logInByGoogle() {
      logInGoogle().then((user) => {
        const {
          uid, displayName, email, phoneNumber, photoURL,
        } = user;
        userFirstTime(uid, displayName, email, 'cliente', phoneNumber, photoURL);
        this.goAfterLogin();
      });
    },
    goAfterLogin() {
      getUserByUid(currentUser().uid).then((user) => {
        const { role } = user;
        if (role === 'inmobiliaria') {
          this.$router.push('/myprojects');
        } else if (role === 'cliente') {
          this.$router.go(-1);
        }
      });
    },
    acceptConditions(bol) {
      this.checkbox = bol;
    },
    login() {
      logIn(this.email, this.password)
        .then(() => this.goAfterLogin())
        .catch((error) => { this.error = error; });
    },
  },
  created() {
    this.$store.commit('layout/SET_LAYOUT', 'public-layout');
  },
};
</script>

<style lang="scss" scoped>
</style>
