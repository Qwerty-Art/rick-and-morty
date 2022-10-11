<template>
  <div class="card" :card-id="id">
    <img :src="img" class="card-img-top" :alt="title" />
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">
        <b>Status:</b> {{ status }}
      </p>
      <router-link :to="link" class="btn btn-primary" @click="saveCurrentPage"
        ><slot></slot
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    status: {
      type: String,
    },
    link: {
      type: String,
    },
    currentPage: {
      type: Number,
    },
  },
  emit: ["saveCurrentPage"],
  setup(props, { emit }) {
    const saveCurrentPage = () => {
      emit("saveCurrentPage", props.currentPage);
    };

    return {
      saveCurrentPage,
    };
  },
};
</script>

<style scoped>
  .card {
    height: 100%;
  }
  .card-body {
    display: flex;
    flex-direction: column;
  }
   .card .btn {
    margin-top: auto;
   }
</style>