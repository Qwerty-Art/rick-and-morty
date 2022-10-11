<template>
  <nav aria-label="Page navigation example">
    <MDBPagination class="justify-content-center">
      <MDBPageNav
        prev
        @click.prevent="onClickPreviousPage"
        :disabled="isInFirstPage"
      ></MDBPageNav>

      <MDBPageItem
        v-for="page in pages"
        :key="page.name"
        :disabled="page.isDisabled"
        href="#"
        @click.prevent="onClickPage(page.name)"
        >{{ page.name }}</MDBPageItem
      >

      <MDBPageNav
        next
        @click.prevent="onClickNextPage"
        :disabled="isInLastPage"
      ></MDBPageNav>
    </MDBPagination>
  </nav>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { MDBPagination, MDBPageNav, MDBPageItem } from "mdb-vue-ui-kit";

export default {
  components: {
    MDBPagination,
    MDBPageNav,
    MDBPageItem,
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  emit: ["pagechanged"],

  setup(props, { emit }) {
    const maxVisibleButtons = ref(props.maxVisibleButtons);
    const totalPages = ref(props.totalPages);
    const currentPage = ref(props.currentPage);

    const isInFirstPage = computed(() => currentPage.value === 1 );
    const isInLastPage = computed(() => currentPage.value === totalPages.value);

    const startPage = computed(() => {
      if (currentPage.value === 1) return 1;

      if (currentPage.value === totalPages.value)
        return totalPages.value - maxVisibleButtons.value;

      return currentPage.value - 1;
    });
    const endPage = computed(() => {
      return Math.min(
        startPage.value + maxVisibleButtons.value - 1,
        totalPages.value
      );
    });

    const pages = computed(() => {
      const range = [];

      for (
        let i = startPage.value;
        i <=
        Math.min(
          startPage.value + maxVisibleButtons.value - 1,
          totalPages.value
        );
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === currentPage.value,
        });
      }

      return range;
    });

    const onClickPreviousPage = () => {
      currentPage.value--;
      if (currentPage.value === 0) {
        currentPage.value = 1;
      }
      emit("pagechanged", currentPage.value - 1);
    };
    const onClickPage = (page) => {
      currentPage.value = page;
      emit("pagechanged", page);
    };
    const onClickNextPage = () => {
      currentPage.value++;
      emit("pagechanged", currentPage.value);
    };
    const isPageActive = (page) => {
      return currentPage.value === page;
    };

    return {
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      isPageActive,
      isInFirstPage,
      isInLastPage,
      endPage,
      currentPage,
      pages,
    };
  },
};
</script>

<style lang="css">
  .pagination {
    margin: 20px 0;
  }
</style>