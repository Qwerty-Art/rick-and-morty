<template>
  <footer>
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
  </footer>
</template>

<script>
import { links } from "@/_config";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const subIsActive = (path) => {
      return route.path === path;
    };
    
    return {
      links,
      subIsActive,
    };
  },
};
</script>

<style>
  footer {
    margin-top: auto;
  }
</style>