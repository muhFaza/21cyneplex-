const fs = require("fs");
const axios = require("axios");


const trendingMovies = async (req, res, next) => {
  try {
    type = req.query.type;
    page = req.query.page;
    if (!page) page = 1;
    if (!type) type = "all";
    if (type && !["all", "movie", "tv"].includes(type)) {
      throw { name: "InvalidType" };
    }

    console.log(type, "type request");
    // movies_trending_type.json refreshes every 1 hour, whenever someone hit this endpoint
    // saves locally here for caching, 1-5 pages
    if (
      fs.existsSync(`./storage/trending/movies_trending_${type}_${page}.json`)
    ) {
      const moviesParsed = JSON.parse(
        fs.readFileSync(
          `./storage/trending/movies_trending_${type}_${page}.json`,
          "utf-8"
        )
      );
      const lastUpdate = new Date(moviesParsed.lastUpdate);
      const now = new Date();
      const diff = (now - lastUpdate) / 1000;
      if (diff < 3600) {
        console.log("data retrieved from cache");
        return res.status(200).json(moviesParsed);
      }
    }
    const movies = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    if (page >= 1 && page <= 5) {
      movies.data.lastUpdate = new Date();
      fs.writeFileSync(
        `./storage/trending/movies_trending_${type}_${page}.json`,
        JSON.stringify(movies.data)
      );
    }
    console.log("data retrieved from API");
    return res.status(200).json(movies.data);
  } catch (err) {
    next(err);
  }
};

const moviesAny = async (req, res, next) => {
  try {
    type = req.query.type;
    page = req.query.page;
    if (!page) page = 1;
    if (!type) type = "popular";
    if (type && !["popular", "top_rated", "upcoming"].includes(type)) {
      throw { name: "InvalidType" };
    }

    console.log(type, "type request");
    if (fs.existsSync(`./storage/movie/movies_${type}_${page}.json`)) {
      const moviesParsed = JSON.parse(
        fs.readFileSync(`./storage/movie/movies_${type}_${page}.json`, "utf-8")
      );
      const lastUpdate = new Date(moviesParsed.lastUpdate);
      const now = new Date();
      const diff = (now - lastUpdate) / 1000;
      if (diff < 3600) {
        console.log("data retrieved from cache");
        return res.status(200).json(moviesParsed);
      }
    }
    const movies = await axios.get(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    if (page >= 1 && page <= 5) {
      movies.data.lastUpdate = new Date();
      fs.writeFileSync(
        `./storage/movie/movies_${type}_${page}.json`,
        JSON.stringify(movies.data)
      );
    }
    console.log("data retrieved from API");
    return res.status(200).json(movies.data);
  } catch (err) {
    next(err);
  }
};

const tvshowsAny = async (req, res, next) => {
  try {
    type = req.query.type;
    page = req.query.page;
    if (!page) page = 1;
    if (!type) type = "airing_today";
    if (type && !["airing_today", "top_rated", "popular"].includes(type)) {
      throw { name: "InvalidType" };
    }

    console.log(type, "type request");
    if (fs.existsSync(`./storage/tvshows/tvshows_${type}_${page}.json`)) {
      const moviesParsed = JSON.parse(
        fs.readFileSync(
          `./storage/tvshows/tvshows_${type}_${page}.json`,
          "utf-8"
        )
      );
      const lastUpdate = new Date(moviesParsed.lastUpdate);
      const now = new Date();
      const diff = (now - lastUpdate) / 1000;
      if (diff < 3600) {
        console.log("data retrieved from cache");
        return res.status(200).json(moviesParsed);
      }
    }
    const movies = await axios.get(
      `https://api.themoviedb.org/3/tv/${type}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
    );
    if (page >= 1 && page <= 5) {
      movies.data.lastUpdate = new Date();
      fs.writeFileSync(
        `./storage/tvshows/tvshows_${type}_${page}.json`,
        JSON.stringify(movies.data)
      );
    }
    console.log("data retrieved from API");
    return res.status(200).json(movies.data);
  } catch (err) {
    next(err);
  }
};

const moviesNowplaying = async (req, res, next) => {
  try {
    const page = 1;
    // if (!page) page = 1;
    if (fs.existsSync(`./storage/nowplaying/movies_nowplaying_${page}.json`)) {
      const moviesParsed = JSON.parse(
        fs.readFileSync(
          `./storage/nowplaying/movies_nowplaying_${page}.json`,
          "utf-8"
        )
      );
      const lastUpdate = new Date(moviesParsed.lastUpdate);
      const now = new Date();
      const diff = (now - lastUpdate) / 1000;
      if (diff < 86400) {
        console.log("data retrieved from cache");
        return res.status(200).json(moviesParsed);
      }
    }
    const movies = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    );
    if (page >= 1 && page <= 5) {
      movies.data.lastUpdate = new Date();
      fs.writeFileSync(
        `./storage/nowplaying/movies_nowplaying_${page}.json`,
        JSON.stringify(movies.data)
      );
    }
    console.log("data retrieved from API");
    return res.status(200).json(movies.data);
  } catch (err) {
    next(err);
  }
};

const movieDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetail = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );

    res.status(200).json(movieDetail.data);
  } catch (err) {
    next(err);
  }
};

const getQRcode = async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) throw { name: "InvalidUrlforQR" };
    
    let body = {
      frame_name: "no-frame",
      qr_code_text: url,
      image_format: "SVG",
      qr_code_logo: "no-logo",   
    }

    const { data } = await axios({
      method: 'POST',
      url: 'https://api.qr-code-generator.com/v1/create?access-token=8HdvZ8mAfdrtNGQ9EBsxjT7ygW8VFvEf4ypPrBR_XlsAAl9sFwBiWeXa03Y_S50m',
      data: body,
    })
    res.status(200).json(data);
  } catch (err) {
    next(err)
  }
}

module.exports = { trendingMovies, moviesAny, tvshowsAny, moviesNowplaying, movieDetail, getQRcode };
