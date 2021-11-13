const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// import from my own files
const storesRoutes = require('./routes/stores-route')
const userRoutes = require('./routes/users-routes')
const categoryRoutes = require('./routes/categories-router')
const HttpError = require('./model/http-error-model');

const app = express();

app.use(bodyParser.json());

app.use('/api/category', categoryRoutes);
// app.use('/api/store', storesRoutes);

// app.use('/api/user', userRoutes);
// add middleware for unsupported routes
app.use((req, res, next) => {
    throw new HttpError("This routes is not found", 404);
});
// middleware for error handling
app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({code: error.code || 500, message: error.message || 'SOMETHING went WRONG'});
})
// app.listen(3000);
// mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});

// mongoose.connect('mongodb://localhost:27017/mernstarter', {useNewUrlParser: true})
const password = encodeURIComponent('BBC@29012019');
const username = 'muhammad1339';
const dbname = 'mern_starter_db';
const uri = `mongodb+srv://${username}:${password}@cluster-mernstarter.uezyt.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => {
        // connection established
        app.listen(3000);
    }).catch(err => {
// connection failed handle error
    console.log(err);

});