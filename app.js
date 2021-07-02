const express = require('express');
const bodyParser = require('body-parser');

// import from my own files
const placesRoutes = require('./routes/places-route')
const app = express();

app.use('/api/place', placesRoutes);

// middleware for error handling
app.use((err, req, res, next) => {
    console.log(err);
})
app.listen(3000);