<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapWritableState } from 'pinia';
import { useGlobalStore } from '../stores/global';
export default {
  data() {
    return {
      valid: false
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchTrending', 'fetchMovies', 'fetchTvShows']),
    logout() {
      localStorage.clear()
      this.isLoggedin = false
    }
  },
  computed: {
    ...mapWritableState(useGlobalStore, ['isLoggedin'])
  },
  created() {
    if (localStorage.access_token) {
      this.isLoggedin = true
    }
  }
}
</script>

<template>
  <section class="ftco-section">
		<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div class="container-fluid">
	    
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="fa fa-bars"></span> Menu
	      </button>
	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav m-auto">
	        	<li class="nav-item active"><RouterLink to="/" href="#" class="nav-link">Now Playing</RouterLink></li>
	        	<li class="nav-item dropdown">
              <a click.prevent="" class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trending</a>
              <div class="dropdown-menu" aria-labelledby="dropdown04">
              	<RouterLink to="/trending/all" @click="fetchTrending('all')" class="dropdown-item" href="#">All</RouterLink>
                <RouterLink to="/trending/movie" @click="fetchTrending('movie')" class="dropdown-item" href="#">Movies</RouterLink>
                <RouterLink to="/trending/tv" @click="fetchTrending('tv')" class="dropdown-item" href="#">TV Shows</RouterLink>
              </div>
            </li>
	        	<li class="nav-item dropdown">
              <a click.prevent="" class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Movie</a>
              <div class="dropdown-menu" aria-labelledby="dropdown04">
              	<RouterLink to="/movie/popular" @click="fetchMovies('popular')" class="dropdown-item" href="#">Popular</RouterLink>
                <RouterLink to="/movie/top_rated" @click="fetchMovies('top_rated')" class="dropdown-item" href="#">Top Rated</RouterLink>
                <RouterLink to="/movie/upcoming" @click="fetchMovies('upcoming')" class="dropdown-item" href="#">Up Coming</RouterLink>
              </div>
            </li>
	        	<li class="nav-item dropdown">
              <a click.prevent="" class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">TV Shows</a>
              <div class="dropdown-menu" aria-labelledby="dropdown04">
              	<RouterLink to="/tvshows/airing_today" @click="fetchTvShows('airing_today')" class="dropdown-item" href="#">Airing Today</RouterLink>
                <RouterLink to="/tvshows/popular" @click="fetchTvShows('popular')" class="dropdown-item" href="#">Popular</RouterLink>
                <RouterLink to="/tvshows/top_rated" @click="fetchTvShows('top_rated')" class="dropdown-item" href="#">Top Rated</RouterLink>
              </div>
            </li>
            <li class="nav-item"><RouterLink class="nav-link" to="/MyRents">My Rents</RouterLink></li>
	          <li v-if="isLoggedin" class="nav-item"><a @click.prevent="logout()"  href="#" class="nav-link">Logout</a></li>
	          <li v-else class="nav-item"><RouterLink to="/login"  href="#" class="nav-link">Login</RouterLink></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
    <!-- END nav -->
	</section>
</template>