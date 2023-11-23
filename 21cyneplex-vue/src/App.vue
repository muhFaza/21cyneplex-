<script>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import MovieCard from "./components/MovieCard.vue";
import axios from "axios";
export default {
  components: {
    Navbar,
    MovieCard,
  },
  data() {
    return {
      movies: [],
    };
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>
