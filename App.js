const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const users = require('./routes/auth/authRoute');
const cars = require('./routes/cars/carsRoute');


app.use(cors());
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     console.log('Time:', Date.now())
//     next()
// })

app.use('/auth',users);
app.use('/cars',cars);

mongoose.connect(config.dbUrlCars, {useNewUrlParser: true}, () => console.log('connected to DB'));

app.listen(5000)