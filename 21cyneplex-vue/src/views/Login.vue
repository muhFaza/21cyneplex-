<script>
import { useGlobalStore } from '../stores/global';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { GoogleLogin } from 'vue3-google-login'
export default {
  components: {
    GoogleLogin
  },
  data() {
    return {
      rnd: Math.floor(Math.random() * 20) + 1,
      email: '',
      password: '',
      register: {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      }
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchNowPlaying', 'loginForm', 'registerForm', 'googleLogin']),
    callback(response) {
      this.googleLogin(response)
    },
    flipState(num){
      this.loginState = num
    },
    registerFormLocal(){
      if (this.register.password == this.register.repeatPassword) {
        this.registerForm(this.register)
      } else {
        toast.error('Password does not match')
        this.register.password = ''
        this.register.repeatPassword = ''

      }
    },
    warn() {
      toast.warning('This feature is not implemented')
    }
  },
  computed: {
    ...mapState(useGlobalStore, ['moviesNowPlaying']),
    ...mapWritableState(useGlobalStore, ['loginState'])
  },
  created() {
    try {
      //check if detail data has been fetched
      if (this.moviesNowPlaying.length == 0) {
        this.fetchNowPlaying()
      }

    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style>
.divparent{
  object-fit: cover;
  background-size: cover;
  /* position:static; */
  min-height: calc(100vh - 72px);
}
.itemContainer{
  background-color: #343a4092;
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 10px;
}
</style>
<template>
  <div >
    <div class="divparent" :style="'background-image: url(https://image.tmdb.org/t/p/original' + moviesNowPlaying[rnd].backdrop_path + ');'">
      <div class="container w-25 py-3" style="background-color: rgba(0, 0, 0, 0.415); backdrop-filter: blur(10px); margin: auto; position:absolute; left: 0; right: 0; top: 20%;">
        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li class="nav-item" role="presentation">
          <a @click.prevent="flipState(0)" :class="'nav-link ' + (loginState == 0 ? 'active bg-dark' : 'text-white')" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
            aria-controls="pills-login" aria-selected="true">Login</a>
        </li>
        <li class="nav-item" role="presentation">
          <a @click.prevent="flipState(1)" :class="'nav-link ' + (loginState == 1 ? 'active bg-dark' : 'text-white')" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
            aria-controls="pills-register" aria-selected="false">Register</a>
        </li>
        </ul>
        <!-- Pills navs -->
    
        <!-- Pills content -->
        <div class="tab-content">
        <div :class="'tab-pane fade ' + (loginState == 0 ? 'show active' : '')" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
          <form @submit.prevent="loginForm(email, password)">
            <p class="text-center text-white">Sign in with:</p>
            <div class="mx-auto" style=" display: flex; justify-content: center;">
              <GoogleLogin :callback="callback" />
            </div>
            <p class="text-center text-white">or</p> 
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input v-model="email" type="email" id="loginName" class="form-control" />
              <label class="form-label text-white" for="loginName">Email</label>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input v-model="password" type="password" id="loginPassword" class="form-control" />
              <label class="form-label text-white" for="loginPassword">Password</label>
            </div>
            <!-- 2 column grid layout -->
            <div class="row mb-4">
              <div class="col-md-6 d-flex justify-content-center">
                <!-- Checkbox -->
                <div class="form-check mb-3 mb-md-0">
                  <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                  <label class="form-check-label text-white" for="loginCheck"> Remember me </label>
                </div>
              </div>
              <div class="col-md-6 d-flex justify-content-center">
                <!-- Simple link -->
                <a @click.prevent="warn()" href="#!">Forgot password?</a>
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4 bg-dark">Sign in</button>
            <!-- Register buttons -->
            <div class="text-center">
              <p class="text-white">Not a member? <a @click.prevent="flipState(1)" href="#!">Register</a></p>
            </div>
          </form>
        </div>
        <div :class="'tab-pane fade ' + (loginState == 1 ? 'show active' : '')" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
          <form @submit.prevent="registerFormLocal()">
            <!-- Username input -->
            <div class="form-outline mb-2">
              <input v-model="register.username" type="text" id="registerUsername" class="form-control" />
              <label class="form-label text-white" for="registerUsername">Username</label>
            </div>
            <!-- Email input -->
            <div class="form-outline mb-2">
              <input v-model="register.email" type="email" id="registerEmail" class="form-control" />
              <label class="form-label text-white" for="registerEmail">Email</label>
            </div>
            <!-- Password input -->
            <div class="form-outline mb-2">
              <input v-model="register.password" type="password" id="registerPassword" class="form-control" />
              <label class="form-label text-white" for="registerPassword">Password</label>
            </div>
            <!-- Repeat Password input -->
            <div class="form-outline mb-2">
              <input v-model="register.repeatPassword" type="password" id="registerRepeatPassword" class="form-control" />
              <label class="form-label text-white" for="registerRepeatPassword">Repeat password</label>
            </div>
            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-between mb-4">
              <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                aria-describedby="registerCheckHelpText" />
              <label class="form-check-label text-white" for="registerCheck">
                I have read and agree to the terms
              </label>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
          </form>
        </div>
        </div>
        <!-- Pills content -->
      </div>
    </div>
  </div>
</template>