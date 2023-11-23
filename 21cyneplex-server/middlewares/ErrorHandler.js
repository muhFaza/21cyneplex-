function errorHandler(err, req, res, next) {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name == "NoTokenFound" || err.name == "UserNotFound" || err.name == 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid Token';
  } else if (err.name == 'TokenExpiredError') {
    status = 401;
    message = 'Token Expired';
  } else if (err.name == 'LoginUserNotFound' || err.name == 'LoginInvalidPassword') {
    status = 401;
    message = 'Invalid email or password';
  } else if (err.name == 'LoginInvalidInput'){
    status = 400;
    message = 'Email and password is required';
  } else if (err.name == 'InvalidDuration') {
    status = 400;
    message = 'Invalid duration';
  } else if (err.name == 'AlreadyRented') {
    status = 400;
    message = 'You already rented this movie';
  } else if (err.name == 'InvalidType') {
    status = 400;
    message = 'Invalid type';
  } else if (err.name == 'MovieIdRequired') {
    status = 400;
    message = 'MovieId is required';
  } else if (err.name == 'FraudStatusFalse' || err.name == 'PaymentOrderNotFound') {
    status = 400;
    message = 'Payment Failed'
  } else if (err.name == 'MidtransError'){
    status = 400;
    message = err.ApiResponse.error_messages[0]
  } else if (err.name == 'RentNotFound') {
    status = 404;
    message = 'Rent not found'
  } else if (err.name == 'Unauthorized') {
    status = 401;
    message = 'Unauthorized'
  } else if (err.name == 'NoGoogleToken'){
    status = 400;
    message = 'No Google Token Provided'
  } else if (err.name == 'InvalidUrlforQR') {
    status = 400;
    message = 'Invalid URL for QR code'
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;