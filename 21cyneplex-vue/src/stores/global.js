import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    moviesTrendingText: "",
    moveisTrendingState: "",
    moviesTrending: [],
    trendingPagination:[],
    moviesNowPlaying: [],
    moviesAny: [],
    movieText: "",
    movieState: "",
    moviesAnyPagination: [],
    tvAny: [],
    tvState: "",
    tvText: "",
    tvPagination: [],
    detailData: {},
    isLoggedin: false,
    loginState: 0,
    // baseUrl: 'http://localhost',
    // baseUrl: 'http://52.221.215.64:3001',
    baseUrl: 'https://server.chonkycat.shop',
    // baseUrl: 'http://localhost:3000',
    userRents: [],
  }),
  getters: {
    activeRents: (state) => {
      return state.userRents.filter(el => (el.expired == false && el.paid == true))
    },
    expiredRents: (state) => {
      return state.userRents.filter(el => (el.expired == true && el.paid == true))
    },
    failedRents: (state) => {
      return state.userRents.filter(el => (el.expired == false && el.paid == false))
    },
    two: (state) => {
      return state.userRents.length
    },
  },
  actions: {
    async deletePayment(rentId) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/user_rent/' + rentId,
          method: 'delete',
          headers: { access_token: localStorage.access_token },
        })
        console.log(data, 'delete payment');
        toast.success('Failed payment deleted!')
        this.fetchUserRents()
      } catch (err) {
        console.log(err);
      }
    },
    async generatePaymentToken(duration, MovieId) {
      try {
        if (!this.isLoggedin) toast.error('Please login first!')
        const token = await axios({
          url: this.baseUrl + '/payment/generate',
          method: 'post',
          headers: {
            access_token: localStorage.access_token
          },
          data: {duration, MovieId}
        })
        console.log(token.data.transactionToken.token, 'payment token');
        let rtr = this.router.push
        let mainUrl = this.baseUrl
        window.snap.pay(token.data.transactionToken.token, {
          onSuccess: async function(result){
            /* You may add your own implementation here */
            const patch = await axios({
              url: mainUrl + '/payment/success',
              method: 'patch',
              headers: { access_token: localStorage.access_token },
              data: result
            })
            // rtr('/MyRents')
            toast.success("payment success!"); 
            console.log(result);
          },
          onPending: function(result){
            /* You may add your own implementation here */
            toast("wating your payment!"); 
            console.log(result);
          },
          onError: function(result){
            /* You may add your own implementation here */
            toast.error("payment failed!"); 
            console.log(result);
          },
          onClose: function(){
            /* You may add your own implementation here */
            toast.info('you closed the popup without finishing the payment');
          }
        })
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUserRents() {
      try {
        if (!localStorage.access_token) return toast.error('Please login first!');
        const { data } = await axios({
          url: this.baseUrl + '/user_rent',
          method: 'get',
          headers: { access_token: localStorage.access_token }
        })
        console.log(data, 'user rents');
        this.userRents = data;
      } catch (err) {
        console.log(err);
      }
    },
    async registerForm(registerData) {
      try {
        const { username, email, password } = registerData;
        const { data } = await axios.post(this.baseUrl + "/register", {
          username,
          email,
          password,
        });
        console.log(data, "register");
        toast.success("Register Success");
        this.router.push("/login");
        this.loginState = 0;
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    },
    async loginForm(email, password) {
      try {
        const { data } = await axios.post(this.baseUrl + "/login", {
          email,
          password,
        });
        console.log(data, "login");
        localStorage.setItem("access_token", data.access_token);
        this.isLoggedin = true;
        toast.success("Login Success");
        this.router.push("/");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    },
    async googleLogin(res) {
      try {
        this.loading = true
        const resLogin = await axios({
          url: this.baseUrl + "/google_login",
          method: "post",
          headers: { google_token: res.credential}
        });

        localStorage.access_token = resLogin.data.access_token;

        this.isLoggedin = true;
        toast.success("Login Success");
        this.router.push("/");
      } catch (err) {
        console.log(err.response);
        toast.error(err.response.data.message)
      } finally {
        this.loading = false
      }
    },
    async fetchNowPlaying() {
      try {
        const { data } = await axios.get(
          this.baseUrl + "/movies/now_playing"
        );
        this.moviesNowPlaying = data.results;
        console.log(this.moviesNowPlaying, "movie now playing");
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTrending(type = "all", page = 1) {
      try {
        if (!["all", "movie", "tv"].includes(type)) {
          type = "all";
        }
        page = Number(page);
        if (page < 1) {
          page = 1;
        }
        if (page > 3){
          this.trendingPagination = [page - 2, page - 1, page, page + 1, page + 2]
        } else {
          this.trendingPagination = [1, 2, 3, 4, 5]
        }
        const { data } = await axios.get(
          this.baseUrl + `/movies/trending?type=${type}&page=${page}`
        );
        console.log(data.results, "movie trending");
        if (type == "all") {
          this.moviesTrendingText = "Trending Movies & TV Shows";
        } else if (type == "movie") {
          this.moviesTrendingText = "Trending Movies";
        } else {
          this.moviesTrendingText = "Trending TV Shows";
        }
        this.moveisTrendingState = type;
        this.moviesTrending = data.results;
        this.router.push(`/trending/${type}?page=${page}`);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchMovies(type = "popular", page = 1) {
      try {
        if (!["popular", "upcoming", "top_rated"].includes(type)) {
          type = "popular";
        }
        page = Number(page);
        if (page < 1) {
          page = 1;
        }
        if (page > 3){
          this.moviesAnyPagination = [page - 2, page - 1, page, page + 1, page + 2]
        } else {
          this.moviesAnyPagination = [1, 2, 3, 4, 5]
        }
        const { data } = await axios.get(
          this.baseUrl + `/movies/any?type=${type}&page=${page}`
        );
        console.log(data.results, "movie any");
        if (type == "popular") {
          this.movieText = "Popular Movies";
        } else if (type == "upcoming") {
          this.movieText = "Upcoming Movies";
        } else {
          this.movieText = "Top Rated Movies";
        }
        this.movieState = type;
        this.moviesAny = data.results;
        this.router.push(`/movie/${type}?page=${page}`);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTvShows(type = "airing_today", page = 1) {
      try {
        if (!["popular", "airing_today", "top_rated"].includes(type)) {
          type = "airing_today";
        }
        page = Number(page);
        if (page < 1) {
          page = 1;
        }
        if (page > 3){
          this.tvPagination = [page - 2, page - 1, page, page + 1, page + 2]
        } else {
          this.tvPagination = [1, 2, 3, 4, 5]
        }
        const { data } = await axios.get(
          this.baseUrl + `/tvshows/any?type=${type}&page=${page}`
        );
        console.log(data.results, "tv any");
        if (type == "popular") {
          this.tvText = "Popular TV Shows";
        } else if (type == "airing_today") {
          this.tvText = "TV Shows Airing Today";
        } else {
          this.tvText = "Top Rated TV Shows";
        }
        this.tvState = type;
        this.tvAny = data.results;
        this.router.push(`/tvshows/${type}?page=${page}`);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchDetail(id) {
      try {
        const { data } = await axios.get(
          this.baseUrl + `/movies/detail/${id}`
        );
        console.log(data, "detail");
        this.detailData = data;
        this.router.push(`/detail/${id}`);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
