<template>
   <div>
       HTML
     <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="informe"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <PdfContent></PdfContent>
        </section>
    </VueHtml2pdf>
    <button @click="generateReport">
        download
    </button>
   </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import PdfContent from './PdfContent.vue';

export default {
  methods: {
    /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },

  components: {
    VueHtml2pdf,
    PdfContent,
  },
};
</script>

<style lang="scss" scoped>
</style>
