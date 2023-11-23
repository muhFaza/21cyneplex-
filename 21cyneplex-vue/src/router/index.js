import { createRouter, createWebHistory } from 'vue-router'
import NowPlaying from '../views/NowPlaying.vue'
import Trending from '../views/Trending.vue'
import Movie from '../views/Movie.vue'
import TvShows from '../views/TvShows.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import MyRents from '../views/MyRents.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'NowPlaying',
      component: NowPlaying
    },
    {
      path: '/trending/:type',
      name: 'Trending',
      component: Trending
    },
    {
      path: '/movie/:type',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/tvshows/:type',
      name: 'TvShows',
      component: TvShows
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/MyRents',
      name: 'MyRents',
      component: MyRents,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('access_token')
        if (token) {
          next()
        } else {
          next({ name: 'Login' })
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('access_token')
        if (token) {
          next({ name: 'NowPlaying' })
        } else {
          next()
        }
      }
    },
  ]
})

export default router
