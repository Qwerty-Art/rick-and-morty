<template>
  <MDBContainer>
    <MDBRow class="list-item">
      <MDBCol
          v-for="(item, index) in results[0]"
          :key="item.id"
          class="wrap-card col-12 col-lg-3 col-sm-6"
      >
        <Card
            :id="item.id"
            :name="item.name"
            :img="item.image"
            :status="item.status"
            :link="`/${item.id}`"
            :currentPage="currentPage"
            @saveCurrentPage="addCurrentPage"
        >
          Подробнее
        </Card>
      </MDBCol>
    </MDBRow>

    <MDBRow>
      <Pagination
          :totalPages="42"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
      />
    </MDBRow>
  </MDBContainer>
</template>

<script setup>
import {onMounted, ref, reactive, onBeforeMount} from "vue";
import {MDBCol, MDBRow, MDBContainer} from "mdb-vue-ui-kit";

import Card from "@/components/UI/Card.vue";
import Pagination from "@/components/UI/Pagination.vue";

import {axiosBase} from "@/_config";

const results = ref([]);
const currentPage = ref();

onBeforeMount(() => {
    storCurrentPage();
});

onMounted(() => {
    getCharacter();
});

const storCurrentPage = () => {
    if (sessionStorage.getItem("currentPage")) {
        return (currentPage.value = sessionStorage.getItem("currentPage"));
    } else {
        return (currentPage.value = 1);
    }
};

const getCharacter = () => {
    axiosBase
        .get(`/character?page=${currentPage.value}`)
        .then((res) => {
            const newResults = [];
            newResults.push(res.data.results);
            newResults.push(res.data.info.pages);
            return (results.value = newResults);
        })
        .catch((e) => console.log(e));
};

const onPageChange = (page) => {
    currentPage.value = page;
    getCharacter();
};

const addCurrentPage = (currentPage) =>
    sessionStorage.setItem("currentPage", currentPage);

</script>

<style scoped>
.list-item {
  margin: -20px 0;
}

.list-item .wrap-card {
  margin: 20px 0;
}
</style>