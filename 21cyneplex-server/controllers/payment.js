const { Rent } = require("../models");
const axios = require("axios");
const midtransClient = require("midtrans-client");

const generateToken = async (req, res, next) => {
  try {
    const UserId = req.user.id;
    const { MovieId, duration } = req.body;
    const allowedDurations = ["24 hours", "3 days", "5 days", "7 days"];
    if (!allowedDurations.includes(duration)) {
      throw { name: "InvalidDuration" };
    }
    if (!MovieId) {
      throw { name: "MovieIdRequired" };
    }
    const findRent = await Rent.findOne({
      where: { UserId, MovieId, paid: true },
    });
    if (findRent) {
      throw { name: "AlreadyRented" };
    }
    const movieDetail = await axios.get(
      `https://api.themoviedb.org/3/movie/${MovieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    const movie_name =
      movieDetail.data.original_title || movieDetail.data.original_name;
    const movie_poster = movieDetail.data.poster_path;
    const OrderId = `RENT-${UserId}-${MovieId}-${duration}-${Date.now().toString().slice(8)}`;
    const rentData = await Rent.create({ UserId, MovieId, duration, movie_poster, movie_name, OrderId });

    let price;
    if (duration === "24 hours") price = 35000;
    else if (duration === "3 days") price = 60000;
    else if (duration === "5 days") price = 90000;
    else if (duration === "7 days") price = 120000;

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: OrderId,
        gross_amount: price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        username: req.user.username,
        email: req.user.email,
      },
    };

    const transactionToken  = await snap.createTransaction(parameter)
    console.log(transactionToken);
    res.status(201).json({transactionToken})
  } catch (err) {
    next(err);
  }
};

const successPayment = async (req, res, next) => {
  try {
    const { fraud_status, order_id } = req.body
    if (fraud_status != 'accept') throw {name: 'FraudStatusFalse'}
    const findOrder = await Rent.findOne({where: {OrderId: order_id}})
    if (!findOrder) throw {name: 'PaymentOrderNotFound'}
    const updatePaid = await Rent.update({paid : true, updatedAt: new Date()}, {where: {id: findOrder.id}})
    res.status(200).json({message: 'Payment verified'})
  } catch (err) {
    next(err)
  }
}

module.exports = { generateToken, successPayment };