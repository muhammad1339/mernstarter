const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import from my own files
const userRoute = require("./routes/user-router");
const categoryRoute = require("./routes/category-router");
const storeRoute = require("./routes/store-router");
const productRoute = require("./routes/product-router");

const HttpError = require("./model/http-error-model");

const app = express();

app.use(bodyParser.json());

//middleware  to handle CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/store", storeRoute);
app.use("/api/product", productRoute);

// add middleware for unsupported routes
app.use((req, res, next) => {
  throw new HttpError("This routes is not found", 404);
});
// middleware for error handling
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({
    code: error.code || 500,
    message: error.message || "SOMETHING went WRONG",
  });
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
    app.listen(5321);
  })
  .catch((err) => {
    // connection failed handle error
    console.log(err);
  });
