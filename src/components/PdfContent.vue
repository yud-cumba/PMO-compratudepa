<template>
     <!-- <section slot="pdf-content"> -->
            <section class="pdf-item">
                <h1></h1>
                <img src="../assets/grafico1.png" width="900"/>
            </section>
     <!-- </section> -->
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.pdf-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pdf-item >h1{
    margin-bottom: 100px;
}
.pdf-item > img{
    margin-left: 60px;
}
</style>
