<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue';
import MovieCard from '../components/MovieCard.vue';
import axios from 'axios';
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';
export default {
  components: {
    Navbar, MovieCard
  },
  data() {
    return {
      movies: []
    }
  },
  async created() {
    try {
      const {data} = await axios.get(this.baseUrl + '/movies/now_playing')
      console.log(data.results, 'ini now playing');
      this.movies = data.results
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchDetail'])
  },
  computed: {
    ...mapState(useGlobalStore, ['baseUrl'])
  }
}
</script>

<template>
    <!-- Now Playing -->
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center my-4" style="color: #006563;">Now Playing</h2>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="clearfix row " style="">
      <MovieCard v-for="mov in movies" :mov="mov" @fetchDetail="fetchDetail" />
    </div>
  </div>
  <div style=""></div>
</template>