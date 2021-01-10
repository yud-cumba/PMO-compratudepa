<template>
  <div>
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <p
          class="pt-1 blue--text text-decoration-underline"
          v-bind="attrs"
          v-on="on"
        >
          {{title}}
        </p>
      </template>

      <v-card class="pa-3 rounded-xl">
        <v-card-title class="headline mb-7 lighten-2" color="green">
          TÉRMINOS Y CONDICIONES
        </v-card-title>
        <v-card-subtitle color="green"> Términos de uso </v-card-subtitle>
        <v-card-text>
          Autorización para uso de Datos Personales “De conformidad con la Ley
          Nº 29733 y su Reglamento, el Decreto Supremo Nº 003-2013- JUS, el
          usuario autoriza y otorga expreso consentimiento para el tratamiento
          de sus datos personales proporcionados bajo el presente medio desde el
          momento de su ingreso al presente portal web evento. Asimismo,
          consiente que la Compra tu depa S.A.C , podrá manejar, transferir y
          utilizar la información brindada las cuales serán incorporadas a su
          banco de datos de usuarios para fines comerciales, estadísticos e
          históricos. Asimismo el usuario autoriza a Compra tu depa S.A.C , para
          transferir - bajo cualquier medio- dicha base de datos a los bancos:
          BANCO DE CREDITO DEL PERÚ, BBVA, SCOTIABANK, BANBIF, INTERBANK. Dicha
          autorización comprende el tratamiento de sus datos personales para
          efectos que las referidas entidades bancarias puedan efectuar
          evaluaciones crediticias y utilizar esta información para actualizar
          sus propias bases de dato s. Asimismo consiente en transferir sus
          datos personales a aquellas empresas inmobiliarias que ofertan sus
          servicios bajo el presente portal web las cuales son plenamente
          identificables por parte del titular de los datos personales las
          cuales serán utilizadas para fines comerciales, estadísticos e
          históricos. Los datos personales proporcionados son necesarios para
          acceder al servicio contenido en el presente portal web . El plazo de
          vigencia de uso de la base de datos materia de la presente
          autorización será por tiempo indefinido salvo lo señalado en el
          párrafo siguiente. El Usuario podrá ejercer los derechos de
          revocación, acceso, rectificación, oposición y cancelación de sus
          datos personales remitiendo una carta al siguiente correo electrónico:
          contacto@compratudepa.online
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="green" outlined text @click="noAcept">
            No acepto
          </v-btn>
          <v-btn class="green" text @click="closeModal"> Acepto </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['acceptConditions', 'title'],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    noAcept() {
      this.dialog = false;
      this.acceptConditions(false);
    },
    closeModal() {
      this.dialog = false;
      this.acceptConditions(true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
