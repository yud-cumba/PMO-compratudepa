<template>
<v-row class="pa-5">
  <v-col class="pa-5">
    <v-form>
    <h2>
      ¡Regístrate para publicar tu proyecto !
      </h2>
      <h4 class="pb-5" >Para registrarse sólo debes dejar estos datos acontinuación.</h4>
    <h4>Nombre de la inmobiliaria</h4>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="¿Cuál es el nombre de la inmobiliaria?"
      outlined  dense
      required
    ></v-text-field>
    <h4>Correo electrónico</h4>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      required
      label="¿Cuál es su correo electrónico?"
      outlined  dense
    ></v-text-field>
    <h4>Celular</h4>
    <v-text-field
      v-model="phone"
      label="Ingresa un número celular de contacto"
      outlined  dense
      :rules="phoneRules"
      required
    ></v-text-field>
    <h4>Contraseña</h4>
    <v-text-field
      color="green"
      v-model="password"
      label="Crea una contraseña"
      outlined  dense
      :type="show? 'text' : 'password'"
      :rules="passwordRules"
      required
      :append-icon="show?'mdi-eye':'mdi-eye-off'"
      @click:append="show= !show"
    ></v-text-field>
    <p class="d-flex">
    <v-checkbox
    color="green"
       class="px-1 my-0"
      v-model="checkbox"
      label="      He leído y acepto los"
      :rules="[v => !!v || 'Debes aceptar los terminos y condiciones ']"
      required
    ></v-checkbox>
     <PrivacyPolicy :acceptConditions="acceptConditions" title="términos y condiciones"/>
    </p>
     <p class="red--text ma-4">{{error}}</p>
    <v-btn class="mx-4 green" color="green">
      Atrás
    </v-btn>
    <v-btn
      v-if="checkbox && name && phone && email"
      class="mx-4 green"
      @click="submit"
    >
      Registrarse
    </v-btn>
     <v-btn
      v-else
      disabled
      class="mx-4 green"
    >
      Registrarse
    </v-btn>
    <ModalOk :dialog="registerOK"
    title="Cuenta creada con éxito! Ahora podemos ayudarte a encontrar el hogar ideal para tí"/>
    <p class="pa-5">¿Ya tienes cuenta?
      <router-link to="/login" ><span class="green--text"> Inicia Sesión </span></router-link></p>
    <div class="d-flex flex-column align-center">
      - o -
    <p class="pt-4">Regístrate con</p>
    <v-icon class="pb-4" @click="logInByGoogle" color="green">mdi-google</v-icon>
    </div>
  </v-form>
  </v-col>
  <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="8">
  <v-parallax  height="700" src="../assets/login.png">
  </v-parallax>
  </v-col>
</v-row>
</template>

<script>
import ModalOk from '../components/ModalOk.vue';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import { registerUserEmail, logInGoogle } from '../firebase/auth';
import { userAdd, userFirstTime } from '../firebase/database';

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
    phone: '',
    phoneRules: [
      (v) => !!v || 'Celular es requerido',
      (v) => (v && v.length < 10 && Number(v[0]) === 9) || 'Celular debe ser válido',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Contraseña es requerida',
      (v) => (v && v.length > 8) || 'Minino 8 carácteres',
    ],
    show: false,
    description: '',
    checkbox: false,
    registerOK: false,
    error: '',
  }),

  methods: {
    logInByGoogle() {
      logInGoogle().then((user) => {
        const {
          uid, displayName, email, phoneNumber, photoURL,
        } = user;
        userFirstTime(uid, displayName, email, 'inmobiliaria', phoneNumber, photoURL);
        this.$router.push('/');
      });
    },
    acceptConditions(bol) {
      this.checkbox = bol;
    },
    submit() {
      registerUserEmail(this.email, this.password)
        .then((result) => {
          userAdd(result.user.uid, this.name, this.email, 'inmobiliaria', this.phone);
          this.registerOK = true;
          this.$router.push('/myprojects');
        })
        .catch(() => {
          // e.code = auth/weak-password
          this.error = 'El correo electrónico ya ha sido registrado';
        });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
  components: {
    PrivacyPolicy,
    ModalOk,
  },
};
</script>

<style lang="scss" scoped>
.parallax{
    width:55vw;
    height: 100vh;
}
.form{
    width:45vw
}
</style>
