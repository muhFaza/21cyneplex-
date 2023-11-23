<script>
import { useGlobalStore } from '../stores/global';
import { mapActions, mapState } from 'pinia';
import axios from 'axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  methods: {
    ...mapActions(useGlobalStore, ['fetchDetail', "generatePaymentToken"]),
    async copyLink() {
      await navigator.clipboard.writeText(this.linkshort);
      toast.success('Link copied to clipboard')
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['detailData', 'baseUrl'])
  },
  data() {
    return {
      qrCode: '',
      linkshort: ''
    }
  },
  async created() {
    try {
      const id = this.$route.params.id
      this.fetchDetail(id)
      console.log(window.location.href);

      const { data } = await axios({
          url: this.baseUrl + "/qrcode",
          method: "post",
          data: { url: window.location.href }
        });
      this.qrCode = data
      
      const link = await axios({
        url: 'https://url.api.stdlib.com/temporary@0.3.0/create/?url=' + window.location.href,
        method: 'get',
      })
      this.linkshort = link.data.link_url
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style>
.divparent {
  object-fit: cover;
  background-size: cover;
  min-height: calc(100vh - 72px);
}
.itemContainer {
  background-color: #343a4092;
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 10px;
}
</style>
<template>
  <div
    class="divparent"
    :style="
      'background-image: url(' +
      'https://image.tmdb.org/t/p/original' +
      detailData.backdrop_path +
      ');'
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center my-4">Detail</h2>
        </div>
      </div>
    </div>
    <div class="container itemContainer">
      <div class="row">
        <div class="col-12">
          <div class="" style="max-width: ">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  style="margin-bottom: 15px"
                  :src="
                    'https://image.tmdb.org/t/p/w500' + detailData.poster_path
                  "
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body" style="padding-top: 8px">
                  <h5
                    style="
                      font-size: 35px;
                      color: #0baba8;
                      font-family: 'Montserrat', sans-serif;
                    "
                    class="card-title"
                  >
                    {{ detailData?.title || "Title" }}
                  </h5>
                  <div class="d-flex" style="margin-bottom: 1rem;">
                    <div>
                      <span class="card-text"
                        >Rating:
                        <span style="font-weight: bold">{{
                          detailData?.vote_average
                            ? detailData.vote_average.toFixed(1)
                            : "Vote Average"
                        }}</span></span
                      >
                      <p class="card-text" style="margin-bottom: 0.2rem;">
                        <small class="" style="color: rgb(218, 218, 218)">{{
                          detailData?.release_date || "Release Date"
                        }}</small>
                      </p>
                      <input @click.prevent="copyLink()" type="submit" class="btn btn-sm btn-outline-dark" style="font-weight: lighter;" v-model="linkshort"/>
                    </div>
                    <div v-html="qrCode" style="width: 60px; margin-bottom: 10px; margin-left: 18px; margin-right: 15px;"></div>
                  </div>
                  <p style="font-weight: bold" class="card-text">
                    {{ detailData?.tagline || "Tagline" }}
                  </p>
                  <br />
                  <p class="card-text">
                    {{ detailData?.overview || "Overview" }}
                  </p>
                  <div>
                    <p>
                      Genres:
                      <span
                        style="font-weight: lighter; font-size: 14px"
                        v-for="(genre, idx) in detailData.genres"
                        >{{ genre.name
                        }}{{
                          idx < detailData.genres.length - 1 ? ", " : ""
                        }}</span
                      >
                    </p>
                    <!-- <ul class="">
                        <li v-for="genre in detailData.genres"  :key="genre.id">
                          <span>{{ genre.name }}</span>
                        </li>
                      </ul> -->
                  </div>
                  <br />
                  <div>
                    <div>Production Companies:</div>
                    <ul class="" style="margin-bottom: 10px">
                      <li
                        v-for="company in detailData.production_companies"
                        :key="company.id"
                      >
                        <span style="font-weight: lighter">{{
                          company.name
                        }}</span>
                      </li>
                    </ul>
                  </div>
                  <span style="font-weight: lighter">Rent movie:</span>
                  <form class="d-flex" style="margin-top: 8px">
                    <div>
                      <button
                        type="checkbox"
                        @click.prevent="
                          generatePaymentToken('24 hours', detailData.id)
                        "
                        class="btn btn-sm btn-primary mx-1"
                      >
                        24 hours
                      </button>
                      <button
                        type="checkbox"
                        @click.prevent="
                          generatePaymentToken('3 days', detailData.id)
                        "
                        class="btn btn-sm btn-primary mx-1"
                      >
                        3 days
                      </button>
                      <button
                        type="checkbox"
                        @click.prevent="
                          generatePaymentToken('5 days', detailData.id)
                        "
                        class="btn btn-sm btn-primary mx-1"
                      >
                        5 days
                      </button>
                      <button
                        type="checkbox"
                        @click.prevent="
                          generatePaymentToken('7 days', detailData.id)
                        "
                        class="btn btn-sm btn-primary mx-1"
                      >
                        7 days
                      </button>
                    </div>
                    <div></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
