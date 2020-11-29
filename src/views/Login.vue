<template>
<v-card class="d-flex ">
  <v-form class="form py-8 px-12 mx-5">
    <h2 class="py-3">¡Regístrate para tener acceso a las asesorías!</h2>
    <p class="pa-3">
        Primero regístrate en nuestra plataforma con tan sólo tu correo y contraseña.
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
      @click="submit"
    >
      Regístrate
    </v-btn>
     <v-btn
      v-else
      disabled
      class="mr-4 green"
    >
      Ingresar
    </v-btn>
    - o -
    </div>
  </v-form>
  <v-parallax height="700" class="parallax" src="../assets/login.png">
  </v-parallax>
</v-card>
</template>

<script>
import { userAdd } from '../firebase/database';

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
  }),

  methods: {
    acceptConditions(bol) {
      this.checkbox = bol;
    },
    submit() {
      userAdd({
        name: this.name,
        email: this.email,
        phone: this.phone,
        description: this.description,
      }, this.phone);
    },
    clear() {
      this.$refs.form.reset();
    },
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
