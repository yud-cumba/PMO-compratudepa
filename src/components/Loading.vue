<template>
    <div class="loading d-flex flex-column justify-center align-center">
        <RiseLoader
      class="ring-loader"
      :color="color"
      :loading="loading"
      :size="size"
      sizeUnit="px"
    />
    </div>
</template>

<script>
import { RiseLoader } from '@saeris/vue-spinners';

export default {
  components: { RiseLoader },
  props: ['loading', 'size'],
  data: () => ({
    color: 'black',
  }),
  watch: {
    color() {
      setTimeout(() => {
        this.color = this.color === 'green' ? 'black' : 'green';
      }, 1000);
    },
  },
  created() {
    setTimeout(() => {
      this.color = 'green';
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.loading{
    width: 100%;
}
</style>
