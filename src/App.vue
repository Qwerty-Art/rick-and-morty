<template>
  <Header />
  <main>
    <router-view/>
  </main>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
    components: {
    Header,
    Footer
  },
};
  
</script>

<style lang="css">
  #app {
    background-color: #fafafa;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    padding: 30px 0;
  }
</style>



