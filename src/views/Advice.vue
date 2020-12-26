<template>
  <div >
    <div v-if="!isLogin">
       <WithoutLogin/>
    </div>
    <div class="px-12 mx-12 pt-5" v-else>
      <!-- <h2 class="ma-6">Tips</h2> -->
      <v-tabs
      v-model="tab"
      background-color="green"
      color="black"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <TimeLine describe="Te presentamos la lista de documentos que
        te solicitarán para adquirir un departamento por medio
        del préstamo hipotecario. Estos documentos variarán según
        la categoría de preéstamo en la que te encuentres
        (joven, persona natural, trabajador independiente, etc)"
        img="advice1.png"
        :items="dataChecklist"/>
      </v-tab-item>
      <v-tab-item>
        <TimeLine describe="¿Qué debo preguntar? Te brindamos algunas preguntas
        que podrían ayudarte a tomar decisiones, y suelen ser muy
        importante al determinar cual depa elegir."
        img="advice2.png"
        :items="dataAskToAsesor"/>
      </v-tab-item>
      <v-tab-item>
        <Stepper/>
      </v-tab-item>
    </v-tabs-items>
    </div>
  </div>
</template>

<script>
import WithoutLogin from '../components/WithoutLogin.vue';

import { verifyIsLogin } from '../firebase/auth';
import Stepper from '../components/Stepper.vue';
import TimeLine from '../components/TimeLine.vue';

export default {
  components: {
    WithoutLogin,
    Stepper,
    TimeLine,
  },
  data: () => ({
    isLogin: false,
    tab: null,
    items: [
      '1 Checklist Documentario', '2 Pregúntale al asesor', '3 Buenas prácticas',
    ],
    dataChecklist: [
      {
        title: 'DNI',
        text:
          'Debes contar con un documento de identidad y tener 35 años como máximo al momento de solicitar el préstamo',
      },
      {
        title: 'Recibos de pago de servicios',
        text: 'Debes presentar tus últimos recibos de agua, luz o teléfono. Para poder validar la capacidad de pago mensual',
      },
      {
        title: 'Constancia de trabajo',
        text:
          'Debes contar con una antigüedad laboral comprobable, mínima de un año (12 meses)',
      },
      {
        title: 'Constancia de estudios',
        text:
          'Debes contar de preferencia con estudios universitarios concluidos, si cuentas con maestría le aportará mayor probabilidad',
      },
      {
        title: 'Autovalúo',
        text:
          'Documento de pago anual del impuesto al valor patrimonial',
      },
      {
        title: 'Título(s) de propiedad',
        text:
          'Puedes presentar si tienes título de propiedad del vehículo u otro inmueble.',
      },
      {
        title: 'RUC',
        text:
          'Copia del Registro Único del Contribuyente',
      },
      {
        title: 'Retenciones de quinta categoría ',
        text:
          'Certificado de retenciones de quinta categoría del último año',
      },
      {
        title: 'Impuesto a la Renta',
        text:
          'Declaración Jurada del Impuesto a la Renta de tercera Categoría de los dos últimos años',
      },
    ],
    dataAskToAsesor: [
      {
        title: 'Fecha de entrega del departamento',
        text:
          'Lo primero que debes saber es una estimación de cuándo te entregarán el depa. Los proyectos pasan por diferentes etapas, desde los planos construcción hasta la entrega.',
      },
      {
        title: 'Devolución de cuota de separación',
        text: 'Si por algún motivo desistes de firmar el contrato con la inmobiliaria, debes saber si te devolverán la cuota abonada para separar el depa.',
      },
      {
        title: 'Modificación del contrato',
        text:
          'Si en algo no está de acuerdo con el contrato, debe estar seguro si tiene opción a modificar las clausulas del contrato o no.',
      },
      {
        title: 'Copia de licencia de la obra',
        text:
          'Es bueno saber si le proporcionarán una copia de la licencia de la obra, dependiendo de la etapa en la que se encuentre el proyecto.',
      },
      {
        title: 'Contrato compra-venta',
        text:
          'Debe tener en cuenta que previo a la firma del documento privado de sepración se debe haber visto previamente el proyecto del contrato de compra y venta para la revisión de los términos de la entrega.',
      },
    ],
  }),
  methods: {
    verify() {
      verifyIsLogin(() => {
        this.isLogin = true;
      }, () => {
        this.isLogin = false;
      });
    },
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'public-layout');
    this.verify();
  },
};
</script>

<style lang="scss" scoped>

</style>
