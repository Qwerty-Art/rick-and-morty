<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand navbar-light bg-white">
      <div class="container-fluid">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              v-for="link in links"
              :key="link.alias"
              class="nav-item"
              :class="{ active: subIsActive(link.url) }"
            >
              <router-link
                :to="link.url"
                class="nav-link"
                aria-current="page"
                >{{ link.title }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Navbar -->

    <!-- Background image -->
    <div
      class="p-5 text-center bg-image"
      :style="{
        backgroundImage: 'url(' + require('@/assets/image/bg.jpg') + ')',
        backgroundPosition: '50% 100%',
      }"
    >
      <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="text-white">
            <h1 class="mb-3">{{ getTitlePage().title ? getTitlePage().title : 'Rick and Morty' }}</h1>
            <h4 class="mb-3">{{getTitlePage().info}}</h4>
          </div>
        </div>
      </div>
    </div>
    <!-- Background image -->
  </header>
</template>

<script>
import { links } from "@/_config";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const subIsActive = (path) => {
      return route.path === path;
    };

    const getTitlePage = () => {
      return store.getters.getTitlePage;
    }

    onMounted(()=>{
      getTitlePage()
    })


    return {
      links,
      subIsActive,
      getTitlePage,
    };
  },
};
</script>

<style lang="css">
  .bg-image::before {
    content: '';
    display: block;
    padding-top: 24%;
  }
</style>