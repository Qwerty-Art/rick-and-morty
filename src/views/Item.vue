<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-sm-4 mb-4">
        <div class="wrap-img"><img :src="results.image" alt="" /></div>
      </div>

      <div class="col-12 col-sm-8">
        <p>
          <b>Name:</b> <span>{{ results.name }}</span>
        </p>
        <p>
          <b>Gender:</b> <span>{{ results.gender }}</span>
        </p>
        <p>
          <b>Species:</b> <span>{{ results.species }}</span>
        </p>
        <p>
          <b>Type:</b> <span>{{ results.type }}</span>
        </p>
        <p>
          <b>Status:</b> <span>{{ results.status }}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-6 wrap-btn-nav -prev">
        <router-link
          :to="`/${linkPrev}`"
          class="btn btn-primary"
          v-if="isActivePrev"
          >Prev</router-link
        >
      </div>
      <div class="col-6 wrap-btn-nav -next">
        <router-link
          :to="`/${linkNext}`"
          class="btn btn-primary"
          v-if="isActiveNext"
          >Next</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { axiosBase } from "@/_config";
import { onBeforeMount, ref, onUnmounted } from "vue";

export default {
  setup() {
    const store = useStore();
    const itemId = ref(null);
    const results = ref([]);
    const route = useRoute();
    const numberCharacters = ref(1);
    const linkPrev = ref();
    const linkNext = ref();
    const isActivePrev = ref(true);
    const isActiveNext = ref(true);

    const itemRout = () => {
      return (itemId.value = route.params.id);
    };

    const getCharacter = () => {
      axiosBase
        .get(`/character/${itemId.value}`)
        .then((res) => {
          store.dispatch("setTitlePage", {
            title: res.data.name,
            info: res.data.status,
          });
          return (results.value = res.data);
        })
        .catch((e) => console.log(e));
    };

    const getNumberCharacter = () => {
      axiosBase
        .get(`/character`)
        .then((res) => {
          numberCharacters.value = res.data.info.count;
          getPrevPage();
          getNextPage();
          return false;
        })
        .catch((e) => console.log(e));
    };

    const getPrevPage = () => {
      if (itemId.value != 1) {
        isActivePrev.value = true;
        return (linkPrev.value = Number(itemId.value) - 1);
      } else {
        return (isActivePrev.value = false);
      }
    };
    const getNextPage = () => {
      if (itemId.value < numberCharacters.value) {
        isActiveNext.value = true;
        return (linkNext.value = Number(itemId.value) + 1);
      } else {
        return (isActiveNext.value = false);
      }
    };

    onBeforeMount(() => {
      itemRout();
      getCharacter();
      getNumberCharacter();
    });

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.id !== from.params.id) {
        itemId.value = to.params.id;
        getCharacter();
        getPrevPage();
        getNextPage();
      }
    });

    onUnmounted(() => {
      store.dispatch("setTitlePage", { title: "", info: "" });
    });

    return {
      results,
      linkPrev,
      linkNext,
      isActivePrev,
      isActiveNext,
      getCharacter,
    };
  },
};
</script>

<style>
img {
  width: 100%;
  height: auto;
}
.wrap-btn-nav {
  display: flex;
}
.wrap-btn-nav.-prev {
  justify-content: flex-end;
}
.wrap-img {
   box-shadow: 0 2px 15px -3px rgba(0,0,0,7), 0 10px 20px -2px rgba(0,0,0, .4);
}
</style>