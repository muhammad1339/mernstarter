const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// import from my own files
const userRoute = require("./routes/user-router");
const categoryRoute = require("./routes/category-router");
const storeRoute = require("./routes/store-router");
const productRoute = require("./routes/product-router");

const HttpError = require("./model/http-error-model");

const app = express();

app.use(bodyParser.json());
function logRequest(req, res, next) {
  logger.info(req.url)
  next()
}
app.use(logRequest)

function logError(err, req, res, next) {
  logger.error(err)
  next()
}
app.use(logError)
//middleware  to handle CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  logger.info("CORS error handled")
  next();
});

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/store", storeRoute);
app.use("/api/product", productRoute);

// add middleware for unsupported routes
app.use((req, res, next) => {
  logger.error("This routes is not found ${req.url}")

  throw new HttpError("This routes is not found", 404);
});
// middleware for error handling
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    code: error.code || 500,
    message: error.message || "SOMETHING went WRONG",
  });
  logger.error(error)
});
// app.listen(3000);
// mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});

// mongoose.connect('mongodb://localhost:27017/mernstarter', {useNewUrlParser: true})
const password = encodeURIComponent("BBC@29012019");
const username = "muhammad1339";
const dbname = "mern_starter_db";
const uri = `mongodb+srv://${username}:${password}@cluster-mernstarter.uezyt.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => {
    // connection established
    logger.info("Database connection established");
    app.listen(5321);
  })
  .catch((err) => {
    // connection failed handle error
    logger.error("Database connection failed");
    logger.error(err);
    console.log(err);
  });
  logger.info("Server is running on port 5321")
