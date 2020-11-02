<template>
<v-card class="d-flex">
  <v-form class="form py-8 px-12 mx-5">
    <h2 class="py-3">Déjanos tus datos para poder contactarte</h2>
    <h4>Nombre</h4>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="¿Cuál es tu nombre?"
      outlined  dense
      required
    ></v-text-field>
    <h4>E-mail</h4>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      required
      label="¿Cuál es tu correo electrónico?"
      outlined  dense
    ></v-text-field>
    <h4>Celular</h4>
    <v-text-field
      v-model="phone"
      label="¿Cuál es tu número de teléfono?"
      outlined  dense
      :rules="phoneRules"
      required
    ></v-text-field>
    <h4>Descripción</h4>
    <v-textarea outlined  dense>
    </v-textarea>
    <p class="d-flex">
    <v-checkbox
       class="px-1 my-0"
      v-model="checkbox"
      :rules="[v => !!v || 'Debes aceptar los términos y condiciones']"
      required
    ></v-checkbox>
    He leído y acepto los términos y condiciones
    </p>
    <v-btn
      class="mr-4 green"
      @click="submit"
    >
      Enviar
    </v-btn>
  </v-form>
  <v-parallax height="700" class="parallax" src="../assets/form-cafe.png">
  </v-parallax>
</v-card>
</template>

<script>
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
    select: null,
    phone: '',
    phoneRules: [
      (v) => !!v || 'Celular es requerido',
      (v) => (v && v.length < 10 && Number(v[0]) === 9) || 'Celular debe ser válido',
    ],
    checkbox: false,
  }),

  methods: {
    submit() {

    },
    clear() {
      this.$refs.form.reset();
    },
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
