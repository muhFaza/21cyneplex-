
<template>
  <div @click="rentState != 3 ? $emit('fetchDetail', mov.MovieId) : ''" class="cardOwn card2 col-3">
    <img @click="rentState == 3 ? $emit('fetchDetail', mov.MovieId) : ''" class="card-img-top" :src="'https://image.tmdb.org/t/p/w500' + mov.movie_poster" :alt="mov.original_title">
    <div class="card-body">
      <h5 class="card-title">{{ mov.movie_name }}</h5>
    </div>
    <span v-if="rentState == 1" style="text-align: left">Time left: {{ timeLeft(mov.updatedAt, mov.duration) }} hours</span>
    <span v-else-if="rentState == 2" class="text-danger">Expired</span>
    <span v-else-if="rentState == 3" class="text-danger">Payment Failed <button @click.prevent="$emit('deletePayment', mov.id)" class="btn btn-sm btn-outline-danger">Delete</button></span>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');
.cardOwn{
  text-align: center;
  width: 290px;
  height: 530px;
  margin-bottom: 20px;
  padding: 0 10px;
}
img{
  padding-top: 15px;
}
.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #00838d;
  border-radius: 0 4px 0 32px;
}

.go-arrow {
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans;
}

.card2 {
  /* display: block;
  top: 0px;
  position: relative; */
  /* max-width: 262px; */
  /* background-color: #f2f8f9; */
  border-radius: 4px;
  /* padding: 32px 24px;
  margin: 12px; */
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  
  /* border: 1px solid #f2f8f9; */

  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #cccccc;
    background-color: white;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    /* background: #00838d; */
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-out;
  }

  &:hover:before {
    transform: scale(2.15);
  }
}
.card-body{
  margin-top: 10px;
  padding: 1rem;
}
.card-title{
  font-size: 20px;
  font-weight: bold;
  font-family: "Nunito";
}
</style>
<script>

export default {
  props: ['mov', 'rentState'],
  data() {
    return {
      
    }
  },
  methods: {
    timeLeft(time, duration) {
      let future
      if (duration == '24 hours') {
        future = new Date(new Date(time).getTime() + 24 * 60 * 60 * 1000); 
      } else if (duration == '3 days') {
        future = new Date(new Date(time).getTime() + 72 * 60 * 60 * 1000); 
      } else if (duration == '7 days') {
        future = new Date(new Date(time).getTime() + 168 * 60 * 60 * 1000); 
      } else if (duration == '5 days') {
        future = new Date(new Date(time).getTime() + 120 * 60 * 60 * 1000); 
      }
      const timeDiff = future.getTime() - new Date().getTime(); 
      const hoursDiff = Math.floor(timeDiff / 3600000); 

      // console.log(`There are ${hoursDiff} hours left in 24 hours`);
      return hoursDiff
    }
  }
}
</script>
