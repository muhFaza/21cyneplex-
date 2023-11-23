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
    ...mapState(useGlobalStore, ['moviesTrending', 'moviesTrendingText', 'moveisTrendingState']),
    ...mapWritableState(useGlobalStore, ['trendingPagination'])
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTrending', 'fetchDetail'])
  },
  async created() {
    try {
      const type = this.$route.params.type
      const page = this.$route.query.page
      if (page > 3){
        this.trendingPagination = [page - 2, page - 1, page, page + 1, page + 2]
      } else {
        this.trendingPagination = [1, 2, 3, 4, 5]
      }

      console.log(type);
      await this.fetchTrending(type, page)
    } catch (err) {
      console.log(err);
    }
  },
}
</script>

<template>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center my-4" style="color: #006563;">{{ moviesTrendingText }}</h2>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="clearfix row " style="">
      <MovieCard v-for="mov in moviesTrending" :mov="mov" @fetchDetail="fetchDetail" />
    </div>
  </div>
  <div class="d-flex justify-content-center mb-4">
    <button @click="fetchTrending(moveisTrendingState, 1)" class="btn btn-sm btn-outline-dark mx-1">start</button>
    <button @click="fetchTrending(moveisTrendingState, num)" class="btn btn-sm btn-outline-dark mx-1" v-for="num in trendingPagination">{{ num }}</button>
    <button @click="fetchTrending(moveisTrendingState, (trendingPagination[4]+5))" class="btn btn-sm btn-outline-dark mx-1">{{ trendingPagination[4]+5 }}</button>
  </div>
  <div style=""></div>
</template>