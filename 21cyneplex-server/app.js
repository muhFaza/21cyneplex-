if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const ErrorHandler = require("./middlewares/ErrorHandler");
const { register, login, googleLogin } = require("./controllers/register_login");
const { trendingMovies, moviesAny, tvshowsAny, moviesNowplaying, movieDetail, getQRcode } = require("./controllers/TMDB_Requests");
const { generateToken, successPayment } = require("./controllers/payment");
const Authentication = require("./middlewares/Authentication");
const express = require("express");
const cors = require("cors");
const { getUserRent, deleteRent } = require("./controllers/rent");
const Authorization = require("./middlewares/Authorization");
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/register", register);

app.post("/login", login);

app.post('/google_login', googleLogin)

app.get("/movies/trending", trendingMovies);

app.get("/movies/any", moviesAny);

app.get("/tvshows/any", tvshowsAny);

app.get("/movies/now_playing", moviesNowplaying);

app.get("/movies/detail/:id", movieDetail);

app.post('/qrcode', getQRcode)

app.use(Authentication)

app.post('/payment/generate', generateToken)

app.patch('/payment/success', successPayment)

app.delete('/user_rent/:id', Authorization, deleteRent)

app.get('/user_rent', getUserRent)

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
