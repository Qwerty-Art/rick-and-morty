<template>
  <Header />
  <router-view/>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: {
    Header,
  },
};
  
</script>

<style lang="css">
  #app {
    background-color: #fafafa;
    padding-bottom: 30px;
  }
</style>



