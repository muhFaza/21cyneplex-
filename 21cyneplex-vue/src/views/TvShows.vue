<script>
import { RouterLink, RouterView } from 'vue-router'
import MovieCard from '../components/MovieCard.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useGlobalStore } from '../stores/global';
export default {
  components: {
   MovieCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['tvAny', 'tvState', 'tvText']),
    ...mapWritableState(useGlobalStore, ['tvPagination'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTvShows', 'fetchDetail'])
  },
  async created() {
    try {
      const type = this.$route.params.type
      const page = this.$route.query.page
      if (page > 3){
        this.tvPagination = [page - 2, page - 1, page, page + 1, page + 2]
      } else {
        this.tvPagination = [1, 2, 3, 4, 5]
      }
      console.log(type);
      await this.fetchTvShows(type, page)
    } catch (err) {
      console.log(err);
    }
  },
}
</script>

<template>
    <!-- Now Playing -->
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center my-4" style="color: #006563;">{{ tvText }}</h2>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="clearfix row " >
      <MovieCard v-for="mov in tvAny" :mov="mov" @fetchDetail="fetchDetail" />
    </div>
  </div>
  <div class="d-flex justify-content-center mb-4">
    <button @click="fetchTrending(tvState, 1)" class="btn btn-sm btn-outline-dark mx-1">start</button>
    <button @click="fetchTvShows(tvState, num)" class="btn btn-sm btn-outline-dark mx-1" v-for="num in tvPagination">{{ num }}</button>
    <button @click="fetchTrending(tvState, (tvPagination[4]+5))" class="btn btn-sm btn-outline-dark mx-1">{{ tvPagination[4]+5 }}</button>
  </div>
  <div style=""></div>
</template>