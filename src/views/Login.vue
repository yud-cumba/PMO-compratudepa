<template>
<v-card class="d-flex ">
  <v-form class="form py-8 px-12 mx-5">
    <h2 class="py-3">¡Ingresa para tener acceso a las asesorías!</h2>
    <p class="pa-3">
        Ingresa en nuestra plataforma con tan sólo tu correo y contraseña.
    </p>
    <h4 class="my-2">Correo electrónico</h4>
    <v-text-field
      color="green"
      v-model="email"
      :rules="emailRules"
      required
      label="Ingresa tu correo electrónico."
      outlined  dense
    ></v-text-field>
    <h4 class="my-2">Contraseña</h4>
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
    <div v-if="error">{{error}}</div>
    <!-- <p class="my-3" @click="rememberPassword">¿Olvidaste tu contraseña?</p> -->
    - o -
    <p class="pt-4">Inicia sesión con</p>
    <v-icon class="pb-4" @click="logInByGoogle" color="green">mdi-google</v-icon>
    ¿No te registraste? <router-link to="/signup"> Hazlo aquí</router-link>
    </div>
  </v-form>
  <v-parallax height="700" class="parallax" src="../assets/login.png">
  </v-parallax>
</v-card>
</template>

<script>
import { logIn, logInGoogle } from '../firebase/auth';

export default {
  data: () => ({
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
    logInByGoogle() {
      logInGoogle().then(() => this.$router.replace('/advices'));
    },
    acceptConditions(bol) {
      this.checkbox = bol;
    },
    login() {
      logIn(this.email, this.password)
        .then(() => this.$router.replace('/advices'))
        .catch((error) => { this.error = error; });
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
  },
};
</script>

<style lang="scss" scoped>
.parallax{
    width:65vw;
    height: 100vh;
}
.form{
    width:35vw
}
</style>
