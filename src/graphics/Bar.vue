<script>
import { Bar } from 'vue-chartjs';

export default {
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  extends: Bar,
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
<style lang="scss" scoped>
.chart {
height: 450px !important;
width: 350px !important;
}
</style>
