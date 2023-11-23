<script>
import { RouterLink, RouterView } from 'vue-router'
import MyRentsCard from '../components/MyRentsCard.vue';
import { mapActions, mapState } from 'pinia';
import { useGlobalStore } from '../stores/global';
export default {
  components: {
    MyRentsCard
  },
  data() {
    return {
      movies: [],
      rentState: 1,
    }
  },
  async created() {
    try {
      await this.fetchUserRents()
      console.log(this.activeRents,this.expiredRents, this.failedRents, this.two, 'ini active rents');
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchDetail', 'fetchUserRents', 'deletePayment']),
    changeState(num){
      this.rentState = num
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['userRents','activeRents', 'expiredRents', 'failedRents', 'two'])
  }
}
</script>

<template>
    <!-- Now Playing -->
    <div class="container">
    <div class="row">
      <div class="col-6" style="left: 37%; margin-top: 15px;">
        <button @click.prevent="changeState(1)" class="btn mx-2 btn-outline-primary">Active</button>
        <button @click.prevent="changeState(2)" class="btn mx-2 btn-outline-primary">Expired</button>
        <button @click.prevent="changeState(3)" class="btn mx-2 btn-outline-primary">Failed Payments</button>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="clearfix row " style="">
      <MyRentsCard v-if="rentState == 1" v-for="mov in activeRents" :mov="mov" :rentState="rentState" @fetchDetail="fetchDetail" @deletePayment="deletePayment" />
      <MyRentsCard v-if="rentState == 2" v-for="mov in expiredRents" :mov="mov" :rentState="rentState" @fetchDetail="fetchDetail" @deletePayment="deletePayment" />
      <MyRentsCard v-if="rentState == 3" v-for="mov in failedRents" :mov="mov" :rentState="rentState" @fetchDetail="fetchDetail" @deletePayment="deletePayment" />
    </div>
  </div>
  <div style=""></div>
</template>